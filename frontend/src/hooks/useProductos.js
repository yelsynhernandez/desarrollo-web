import { useEffect, useState } from 'react'
import cliente from '../api/cliente'

// Hook para consumir el listado de productos de la API con estados de carga y error.
function useProductos(params = {}) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargar = async (filtros = params) => {
    setCargando(true)
    setError('')
    try {
      const datos = await cliente.obtenerProductos(filtros)
      setProductos(datos)
    } catch (e) {
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)])

  return { productos, cargando, error, recargar: cargar }
}

export default useProductos