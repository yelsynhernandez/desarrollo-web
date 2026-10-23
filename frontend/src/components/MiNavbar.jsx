import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexto/AuthContext'

function MiNavbar() {
  const { isAuthenticated, usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const secciones = [
    { ruta: '/', etiqueta: 'Inicio' },
    { ruta: '/percusion', etiqueta: 'Percusión' },
    { ruta: '/viento', etiqueta: 'Viento' },
    { ruta: '/audio', etiqueta: 'Audio Profesional' },
    { ruta: '/iluminacion', etiqueta: 'Iluminación' },
    { ruta: '/cuerdas', etiqueta: 'Cuerdas' },
    { ruta: '/registro', etiqueta: 'Registrarse' }
  ]

  const cerrarYVolver = () => {
    cerrarSesion()
    navigate('/')
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}>
          Melodía Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            {secciones.map((s) => (
              <Nav.Link
                key={s.ruta}
                active={pathname === s.ruta}
                onClick={() => navigate(s.ruta)}
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
                <Nav.Link active={pathname === '/perfil'} onClick={() => navigate('/perfil')}>
                  Mi Perfil
                </Nav.Link>
                <Nav.Link active={pathname === '/admin'} onClick={() => navigate('/admin')}>
                  Administrar
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
              <Nav.Link active={pathname === '/login'} onClick={() => navigate('/login')}>
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
