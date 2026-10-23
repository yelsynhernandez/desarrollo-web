import { createContext, useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { CLAVE_SESION, configurarSesionExpirada } from '../api/cliente'

const AuthContext = createContext(null)

const estadoInicial = {
  isAuthenticated: false,
  token: null,
  usuario: null,
  fechaAcceso: null,
  sesionExpirada: false
}

// Recupera la sesión guardada en localStorage para sobrevivir a una recarga.
function cargarEstado() {
  try {
    const sesion = JSON.parse(localStorage.getItem(CLAVE_SESION))
    if (sesion?.token) return { ...estadoInicial, ...sesion, isAuthenticated: true }
  } catch {
    // localStorage no disponible o con datos corruptos
  }
  return estadoInicial
}

function authReducer(estado, accion) {
  switch (accion.type) {
    case 'LOGIN':
      return {
        ...estado,
        isAuthenticated: true,
        token: accion.payload.token,
        usuario: accion.payload.usuario,
        fechaAcceso: accion.payload.fechaAcceso,
        sesionExpirada: false
      }
    case 'LOGOUT':
      return {
        ...estado,
        isAuthenticated: false,
        token: null,
        usuario: null,
        fechaAcceso: null,
        sesionExpirada: Boolean(accion.payload?.expirada)
      }
    case 'ACTUALIZAR_PERFIL':
      return {
        ...estado,
        usuario: { ...estado.usuario, ...accion.payload }
      }
    case 'RESTABLECER':
      return estadoInicial
    default:
      return estado
  }
}

function AuthProvider({ children }) {
  const [estado, dispatch] = useReducer(authReducer, undefined, cargarEstado)
  const navigate = useNavigate()

  // Mantiene localStorage sincronizado con el estado global.
  useEffect(() => {
    try {
      if (estado.isAuthenticated) {
        const { token, usuario, fechaAcceso } = estado
        localStorage.setItem(CLAVE_SESION, JSON.stringify({ token, usuario, fechaAcceso }))
      } else {
        localStorage.removeItem(CLAVE_SESION)
      }
    } catch {
      // localStorage no disponible
    }
  }, [estado])

  // Manejo global de sesión expirada: el cliente HTTP lo invoca ante un 401.
  useEffect(() => {
    configurarSesionExpirada(() => {
      try {
        localStorage.removeItem(CLAVE_SESION)
      } catch {
        // localStorage no disponible
      }
      dispatch({ type: 'LOGOUT', payload: { expirada: true } })
      navigate('/login')
    })
  }, [navigate])

  const valor = {
    ...estado,
    iniciarSesion: (usuario, token) =>
      dispatch({
        type: 'LOGIN',
        payload: {
          usuario,
          token,
          fechaAcceso: new Date().toLocaleString()
        }
      }),
    cerrarSesion: () => dispatch({ type: 'LOGOUT' }),
    actualizarPerfil: (cambios) =>
      dispatch({ type: 'ACTUALIZAR_PERFIL', payload: cambios })
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
