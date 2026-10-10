import Producto from '../models/Producto.js'

// GET /api/productos  (soporta filtrado por categoria y búsqueda por texto)
export const obtenerProductos = async (req, res) => {
  try {
    const { categoria, busqueda } = req.query
    const filtro = {}

    if (categoria) filtro.categoria = categoria
    if (busqueda) {
      const regex = new RegExp(busqueda, 'i')
      filtro.$or = [{ nombre: regex }, { descripcion: regex }]
    }

    const productos = await Producto.find(filtro)
    res.json(productos)
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al obtener los productos.', error: error.message })
  }
}

// GET /api/productos/:id
export const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' })
    }
    res.json(producto)
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al obtener el producto.', error: error.message })
  }
}

// POST /api/productos
export const crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body)
    res.status(201).json({ mensaje: 'Producto creado correctamente.', producto })
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: 'Error al crear el producto.', error: error.message })
  }
}

// PUT /api/productos/:id (y PATCH)
export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' })
    }
    res.json({ mensaje: 'Producto actualizado correctamente.', producto })
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: 'Error al actualizar el producto.', error: error.message })
  }
}

// DELETE /api/productos/:id
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id)
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' })
    }
    res.json({ mensaje: 'Producto eliminado correctamente.' })
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al eliminar el producto.', error: error.message })
  }
}