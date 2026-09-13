import { useState } from 'react'
import { Container, Card, Badge, ListGroup, Button, Alert, Form } from 'react-bootstrap'
import { useAuth } from '../contexto/AuthContext'

function Perfil({ irA }) {
  const { isAuthenticated, usuario, fechaAcceso, cerrarSesion, actualizarPerfil } = useAuth()
  const [editando, setEditando] = useState(false)
  const [nombreNuevo, setNombreNuevo] = useState(usuario ? usuario.nombre : '')

  const guardarNombre = (evento) => {
    evento.preventDefault()
    if (nombreNuevo.trim()) {
      actualizarPerfil({ nombre: nombreNuevo.trim() })
    }
    setEditando(false)
  }

  const cerrarYVolver = () => {
    cerrarSesion()
    irA('inicio')
  }

  if (!isAuthenticated || !usuario) {
    return (
      <main>
        <Container className="my-5" style={{ maxWidth: '560px' }}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <h1 className="mb-3">Mi Perfil</h1>
              <Alert variant="warning" className="mb-4">
                Aún no has iniciado sesión. Ingresa para ver tu perfil y tus pedidos.
              </Alert>
              <Button variant="primary" onClick={() => irA('login')}>
                Iniciar Sesión
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </main>
    )
  }

  return (
    <main>
      <Container className="my-4">
        <h1 className="text-center mb-4">Mi Perfil</h1>

        <Card className="shadow-sm mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <strong>Bienvenido, {usuario.nombre}</strong>
            <Badge bg="success">{usuario.rol}</Badge>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <strong>Nombre:</strong> {usuario.nombre}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Correo:</strong> {usuario.correo}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Tipo de membresía:</strong> {usuario.rol}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Fecha de ingreso:</strong> {usuario.fechaIngreso}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Último acceso:</strong> {fechaAcceso}
              </ListGroup.Item>
            </ListGroup>

            <div className="mt-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditando(!editando)}
              >
                {editando ? 'Cancelar' : 'Editar nombre'}
              </Button>
            </div>

            {editando && (
              <Form onSubmit={guardarNombre} className="mt-3">
                <Form.Group className="mb-2" controlId="nombreNuevo">
                  <Form.Label>Nuevo nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={nombreNuevo}
                    onChange={(e) => setNombreNuevo(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" size="sm">
                  Guardar
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>

        <Card className="shadow-sm mb-4">
          <Card.Header>
            <strong>Historial de pedidos</strong>
          </Card.Header>
          <Card.Body>
            {usuario.pedidos.length === 0 ? (
              <p className="mb-0">Aún no tienes pedidos.</p>
            ) : (
              <ListGroup>
                {usuario.pedidos.map((pedido) => (
                  <ListGroup.Item
                    key={pedido.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div><strong>{pedido.producto}</strong></div>
                      <small className="text-muted">Compra {pedido.fecha}</small>
                    </div>
                    <div className="text-end">
                      <div>{pedido.total}</div>
                      <Badge bg={pedido.estado === 'Entregado' ? 'success' : 'warning'} pill>
                        {pedido.estado}
                      </Badge>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>

        <div className="text-center mb-4">
          <Button variant="danger" className="me-3" onClick={cerrarYVolver}>
            Cerrar Sesión
          </Button>
          <Button variant="outline-primary" onClick={() => irA('inicio')}>
            Seguir comprando
          </Button>
        </div>
      </Container>
    </main>
  )
}

export default Perfil