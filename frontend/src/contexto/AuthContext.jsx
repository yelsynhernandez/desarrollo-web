import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext(null)

const estadoInicial = {
  isAuthenticated: false,
  usuario: null,
  fechaAcceso: null
}

function authReducer(estado, accion) {
  switch (accion.type) {
    case 'LOGIN':
      return {
        ...estado,
        isAuthenticated: true,
        usuario: accion.payload.usuario,
        fechaAcceso: accion.payload.fechaAcceso
      }
    case 'LOGOUT':
      return {
        ...estado,
        isAuthenticated: false,
        usuario: null,
        fechaAcceso: null
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
  const [estado, dispatch] = useReducer(authReducer, estadoInicial)

  const valor = {
    ...estado,
    iniciarSesion: (usuario) =>
      dispatch({
        type: 'LOGIN',
        payload: {
          usuario,
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