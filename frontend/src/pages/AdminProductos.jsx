import { useEffect, useState } from 'react'
import {
  Container,
  Card,
  Table,
  Badge,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  InputGroup
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import cliente from '../api/cliente'
import { useAuth } from '../contexto/AuthContext'

const categorias = [
  { id: 'percusion', etiqueta: 'Percusión' },
  { id: 'viento', etiqueta: 'Viento' },
  { id: 'audio', etiqueta: 'Audio Profesional' },
  { id: 'iluminacion', etiqueta: 'Iluminación' },
  { id: 'cuerdas', etiqueta: 'Cuerdas' }
]

const formularioVacio = () => ({
  nombre: '',
  categoria: 'percusion',
  precio: '',
  descripcion: '',
  imagen: ''
})

const etiquetaCategoria = (id) =>
  (categorias.find((c) => c.id === id) || {}).etiqueta || id

function AdminProductos() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState('')
  const [busqueda, setBusqueda] = useState('')

  const [mostrarModal, setMostrarModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [formulario, setFormulario] = useState(formularioVacio())
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const [eliminando, setEliminando] = useState(null)

  const cargar = async (termino = '') => {
    setCargando(true)
    setErrorCarga('')
    try {
      const datos = await cliente.obtenerProductosAdmin(
        termino ? { busqueda: termino } : {}
      )
      setProductos(datos)
    } catch (e) {
      setErrorCarga(e.message)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) cargar('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <main>
        <Container className="my-5" style={{ maxWidth: '560px' }}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <h1 className="mb-3">Administración de productos</h1>
              <Alert variant="warning" className="mb-4">
                Debes iniciar sesión para crear, actualizar o eliminar productos.
              </Alert>
              <Button variant="primary" onClick={() => navigate('/login')}>
                Iniciar Sesión
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </main>
    )
  }

  const buscar = (evento) => {
    evento.preventDefault()
    cargar(busqueda)
  }

  const abrirCrear = () => {
    setEditando(null)
    setFormulario(formularioVacio())
    setError('')
    setMostrarModal(true)
  }

  const abrirEditar = (producto) => {
    setEditando(producto)
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagen: producto.imagen
    })
    setError('')
    setMostrarModal(true)
  }

  const guardar = async (evento) => {
    evento.preventDefault()
    if (!formulario.nombre.trim() || !formulario.precio.trim()) {
      setError('El nombre y el precio son obligatorios.')
      return
    }

    setGuardando(true)
    setError('')
    setMensaje('')
    try {
      if (editando) {
        await cliente.actualizarProducto(editando.id, formulario)
        setMensaje('Producto actualizado correctamente.')
      } else {
        await cliente.crearProducto(formulario)
        setMensaje('Producto creado correctamente.')
      }
      setMostrarModal(false)
      cargar(busqueda)
    } catch (e) {
      setError(e.message)
    } finally {
      setGuardando(false)
    }
  }

  const confirmarEliminar = async () => {
    setGuardando(true)
    setError('')
    try {
      await cliente.eliminarProducto(eliminando.id)
      setMensaje('Producto eliminado correctamente.')
      setEliminando(null)
      cargar(busqueda)
    } catch (e) {
      setError(e.message)
      setEliminando(null)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <main>
      <Container className="my-4">
        <h1 className="text-center mb-4">Administración de productos</h1>

        <Card className="shadow-sm mb-4">
          <Card.Body>
            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-3">
              <Form onSubmit={buscar} className="flex-grow-1" style={{ maxWidth: '420px' }}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Buscar por nombre o descripción…"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  <Button type="submit" variant="outline-primary">
                    Buscar
                  </Button>
                </InputGroup>
              </Form>

              <div>
                <Button
                  variant="outline-secondary"
                  className="me-2"
                  onClick={() => {
                    setBusqueda('')
                    cargar('')
                  }}
                >
                  Limpiar
                </Button>
                <Button variant="primary" onClick={abrirCrear}>
                  Nuevo producto
                </Button>
              </div>
            </div>

            {mensaje && (
              <Alert variant="success" dismissible onClose={() => setMensaje('')}>
                {mensaje}
              </Alert>
            )}
            {error && !mostrarModal && <Alert variant="danger">{error}</Alert>}
            {errorCarga && (
              <Alert variant="danger">
                {errorCarga}{' '}
                <Button size="sm" variant="outline-danger" onClick={() => cargar(busqueda)}>
                  Reintentar
                </Button>
              </Alert>
            )}

            {cargando ? (
              <div className="text-center py-5">
                <Spinner animation="border" role="status" />
                <p className="mt-2 mb-0">Cargando productos…</p>
              </div>
            ) : productos.length === 0 ? (
              <p className="text-center mb-0">No hay productos que coincidan con la búsqueda.</p>
            ) : (
              <div className="table-responsive">
                <Table striped bordered hover align="middle">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <img
                            src={p.imagen}
                            alt={p.nombre}
                            style={{ width: 56, height: 56, objectFit: 'cover' }}
                          />
                        </td>
                        <td>
                          <div>
                            <strong>{p.nombre}</strong>
                          </div>
                          <small className="text-muted">{p.descripcion}</small>
                        </td>
                        <td>
                          <Badge bg="secondary">{etiquetaCategoria(p.categoria)}</Badge>
                        </td>
                        <td>{p.precio}</td>
                        <td className="text-end">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            className="me-2"
                            onClick={() => abrirEditar(p)}
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => {
                              setError('')
                              setEliminando(p)
                            }}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editando ? 'Editar producto' : 'Nuevo producto'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={guardar}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="producto-nombre">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                value={formulario.nombre}
                onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="producto-categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={formulario.categoria}
                onChange={(e) => setFormulario({ ...formulario, categoria: e.target.value })}
              >
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.etiqueta}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="producto-precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Q 1,200.00"
                value={formulario.precio}
                onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="producto-descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formulario.descripcion}
                onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="producto-imagen">
              <Form.Label>Ruta de la imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="image/guitarra-electrica.jpg"
                value={formulario.imagen}
                onChange={(e) => setFormulario({ ...formulario, imagen: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setMostrarModal(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={guardando}>
              {guardando ? 'Guardando…' : 'Guardar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={!!eliminando} onHide={() => setEliminando(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Seguro que deseas eliminar <strong>{eliminando?.nombre}</strong>? Esta
          acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEliminando(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarEliminar} disabled={guardando}>
            {guardando ? 'Eliminando…' : 'Eliminar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  )
}

export default AdminProductos