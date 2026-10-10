// Cliente HTTP para consumir la API REST del backend (fetch nativo).
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function peticion(ruta, opciones = {}) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...opciones
  }

  const respuesta = await fetch(`${BASE_URL}${ruta}`, config)

  if (!respuesta.ok) {
    let mensaje = `Error ${respuesta.status}`
    try {
      const datos = await respuesta.json()
      mensaje = datos.mensaje || datos.error || mensaje
    } catch {
      // el cuerpo no era JSON; se conserva el mensaje genérico
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

  obtenerProducto: (id) => peticion(`/productos/${id}`),

  crearProducto: (datos) =>
    peticion('/productos', { method: 'POST', body: JSON.stringify(datos) }),

  actualizarProducto: (id, datos) =>
    peticion(`/productos/${id}`, { method: 'PUT', body: JSON.stringify(datos) }),

  eliminarProducto: (id) => peticion(`/productos/${id}`, { method: 'DELETE' })
}

export default cliente