import { Navbar, Nav, Container } from 'react-bootstrap'

function MiNavbar({ pagina, irA }) {
  const secciones = [
    { id: 'inicio', etiqueta: 'Inicio' },
    { id: 'percusion', etiqueta: 'Percusión' },
    { id: 'viento', etiqueta: 'Viento' },
    { id: 'audio', etiqueta: 'Audio Profesional' },
    { id: 'iluminacion', etiqueta: 'Iluminación' },
    { id: 'cuerdas', etiqueta: 'Cuerdas' },
    { id: 'registro', etiqueta: 'Registrarse' }
  ]

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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MiNavbar