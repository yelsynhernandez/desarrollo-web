import { Container, Card, Badge, ListGroup, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexto/AuthContext'

function Perfil({ irA }) {
  const { isAuthenticated, usuario, fechaAcceso, cerrarSesion } = useAuth()

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
                Aún no has iniciado sesión. Ingresa para ver tu perfil.
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

  const fechaIngreso = usuario.createdAt
    ? new Date(usuario.createdAt).toLocaleDateString('es-GT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '—'

  return (
    <main>
      <Container className="my-4">
        <h1 className="text-center mb-4">Mi Perfil</h1>

        <Card className="shadow-sm mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <strong>Bienvenido, {usuario.nombre}</strong>
            <Badge bg={usuario.rol === 'admin' ? 'danger' : 'success'} pill>
              {usuario.rol}
            </Badge>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <strong>Nombre completo:</strong> {usuario.nombre}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Correo:</strong> {usuario.correo}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Rol:</strong> {usuario.rol}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Fecha de ingreso (registro en MongoDB):</strong> {fechaIngreso}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Último acceso:</strong> {fechaAcceso}
              </ListGroup.Item>
            </ListGroup>

            <Alert variant="info" className="mt-3 mb-0">
              Estos datos se recuperan directamente del usuario autenticado almacenado
              en MongoDB a través del backend.
            </Alert>
          </Card.Body>
        </Card>

        <div className="text-center mb-4">
          <Button variant="primary" className="me-3" onClick={() => irA('admin')}>
            Administrar productos
          </Button>
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