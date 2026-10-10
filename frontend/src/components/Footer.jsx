import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="mt-5 bg-dark text-white py-5">
      <Container>
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <h5>Melodía Store</h5>
            <p className="mb-1">Dirección: Zona 10, Ciudad de Guatemala</p>
            <p className="mb-1">Teléfono: +502 2345-6789</p>
            <p className="mb-1">Correo: info@melodiastore.com</p>
            <p className="mb-0">Horario: Lunes a Sábado, 9:00 AM - 6:00 PM</p>
          </Col>
          <Col md={6}>
            <h5>Desarrollado por</h5>
            <p className="mb-1">
              <strong>Yelsyn Adrid Hernández Crúz</strong> | Carnet: 9490-17-969
            </p>
            <h6 className="mt-3">Componentes aportados</h6>
            <p className="mb-0">
              Autenticación real contra la API REST (login y registro), panel de
              administración con CRUD de productos, perfil con datos de MongoDB,
              catálogo dinámico por categorías, barra de navegación, tarjetas de
              productos, tablas, listas, acordeón y modales de React-Bootstrap.
            </p>
          </Col>
        </Row>
        <Row className="mt-4 pt-3 border-top border-secondary">
          <Col className="text-center">
            <small>Melodía Store © 2026 - Todos los derechos reservados</small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer