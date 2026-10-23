// Cliente HTTP para consumir la API REST del backend (fetch nativo).
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Clave de localStorage donde se guarda la sesión (token + usuario).
export const CLAVE_SESION = 'melodia_sesion'

// Función que se ejecuta cuando la API responde 401 a una petición protegida.
// La registra AuthContext para cerrar sesión y redirigir a /login.
let alExpirarSesion = () => {}

export function configurarSesionExpirada(manejador) {
  alExpirarSesion = manejador
}

function obtenerToken() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION))?.token || null
  } catch {
    return null
  }
}

async function peticion(ruta, opciones = {}) {
  const token = obtenerToken()
  const config = {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      // Inyección automática del token en todas las peticiones a la API.
      ...(token && { Authorization: `Bearer ${token}` }),
      ...opciones.headers
    }
  }

  const respuesta = await fetch(`${BASE_URL}${ruta}`, config)

  if (!respuesta.ok) {
    let mensaje = `Error ${respuesta.status}`
    try {
      const datos = await respuesta.json()
      mensaje = datos.mensaje || datos.message || datos.error || mensaje
    } catch {
      // el cuerpo no era JSON; se conserva el mensaje genérico
    }

    // Interceptor de respuestas: un 401 fuera de /auth significa token expirado o inválido.
    if (respuesta.status === 401 && !ruta.startsWith('/auth/')) {
      alExpirarSesion()
    }

    const error = new Error(mensaje)
    error.status = respuesta.status
    throw error
  }

  return respuesta.json()
}

const cliente = {
  // Autenticación
  login: (credenciales) =>
    peticion('/auth/login', { method: 'POST', body: JSON.stringify(credenciales) }),

  registrar: (datos) =>
    peticion('/auth/register', { method: 'POST', body: JSON.stringify(datos) }),

  // Entidad de negocio (productos)
  obtenerProductos: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return peticion(`/productos${query ? `?${query}` : ''}`)
  },

  // Consulta privada (requiere token) usada por el panel de administración.
  obtenerProductosAdmin: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return peticion(`/productos/admin/listado${query ? `?${query}` : ''}`)
  },

  obtenerProducto: (id) => peticion(`/productos/${id}`),

  crearProducto: (datos) =>
    peticion('/productos', { method: 'POST', body: JSON.stringify(datos) }),

  actualizarProducto: (id, datos) =>
    peticion(`/productos/${id}`, { method: 'PUT', body: JSON.stringify(datos) }),

  eliminarProducto: (id) => peticion(`/productos/${id}`, { method: 'DELETE' })
}

export default cliente
