import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useAuth } from '../contexto/AuthContext'

function MiNavbar({ pagina, irA }) {
  const { isAuthenticated, usuario, cerrarSesion } = useAuth()

  const secciones = [
    { id: 'inicio', etiqueta: 'Inicio' },
    { id: 'percusion', etiqueta: 'Percusión' },
    { id: 'viento', etiqueta: 'Viento' },
    { id: 'audio', etiqueta: 'Audio Profesional' },
    { id: 'iluminacion', etiqueta: 'Iluminación' },
    { id: 'cuerdas', etiqueta: 'Cuerdas' },
    { id: 'registro', etiqueta: 'Registrarse' }
  ]

  const cerrarYVolver = () => {
    cerrarSesion()
    irA('inicio')
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand onClick={() => irA('inicio')}>
          Melodía Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            {secciones.map((s) => (
              <Nav.Link
                key={s.id}
                active={pagina === s.id}
                onClick={() => irA(s.id)}
              >
                {s.etiqueta}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {isAuthenticated && usuario ? (
              <>
                <Navbar.Text className="text-white">
                  Hola, {usuario.nombre.split(' ')[0]}
                </Navbar.Text>
                <Nav.Link active={pagina === 'perfil'} onClick={() => irA('perfil')}>
                  Mi Perfil
                </Nav.Link>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="my-1"
                  onClick={cerrarYVolver}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Nav.Link active={pagina === 'login'} onClick={() => irA('login')}>
                Iniciar Sesión
              </Nav.Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MiNavbar