import { Router } from 'express'
import {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../controllers/producto.controller.js'
import verificarToken from '../middlewares/auth.middleware.js'

const router = Router()

// Catálogo público
router.get('/', obtenerProductos)

// Consulta privada: listado usado por el panel de administración.
// Se declara antes de "/:id" para que "admin" no se tome como un id.
router.get('/admin/listado', verificarToken, obtenerProductos)

router.get('/:id', obtenerProducto)

// Operaciones protegidas con JWT
router.post('/', verificarToken, crearProducto)
router.put('/:id', verificarToken, actualizarProducto)
router.patch('/:id', verificarToken, actualizarProducto)
router.delete('/:id', verificarToken, eliminarProducto)

export default router
