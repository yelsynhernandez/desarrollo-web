import { Container, Row, Col, Button, Carousel, Card } from 'react-bootstrap'
import CardProducto from '../components/CardProducto'
import { productos } from '../data/productos'

function Inicio({ irA }) {
  const destacados = [
    {
      imagen: 'image/bateria-acustica.jpg',
      titulo: 'Batería Acústica Completa',
      texto: 'Ideal para comenzar en la percusión con todo el equipo incluido.'
    },
    {
      imagen: 'image/guitarra-electrica.jpg',
      titulo: 'Guitarra Eléctrica Stratocaster',
      texto: 'El sonido clásico del rock, blues y pop en tus manos.'
    },
    {
      imagen: 'image/saxofon.jpg',
      titulo: 'Saxofón Alto Eb',
      texto: 'Un instrumento de viento profesional para cualquier músico.'
    }
  ]

  const productosPrincipales = [
    productos.percusion[2],
    productos.viento[0],
    productos.audio[3],
    productos.iluminacion[1],
    productos.cuerdas[1],
    productos.percusion[3]
  ]

  const categorias = [
    {
      id: 'percusion',
      nombre: 'Percusión',
      imagen: 'image/bateria-acustica.jpg',
      descripcion: 'Baterías, bongós, timbales, congas y más.'
    },
    {
      id: 'viento',
      nombre: 'Viento',
      imagen: 'image/saxofon.jpg',
      descripcion: 'Trompetas, saxofones, flautas y clarinetes.'
    },
    {
      id: 'audio',
      nombre: 'Audio Profesional',
      imagen: 'image/mesa-mezcladora.png',
      descripcion: 'Micrófonos, mezcladoras, bafles y monitores.'
    },
    {
      id: 'iluminacion',
      nombre: 'Iluminación',
      imagen: 'image/cabeza-movil.jpg',
      descripcion: 'Pares LED, cabezas móviles, láser y máquinas de humo.'
    },
    {
      id: 'cuerdas',
      nombre: 'Cuerdas',
      imagen: 'image/guitarra-electrica.jpg',
      descripcion: 'Guitarras, bajos, violines y ukeleles.'
    }
  ]

  return (
    <main>
      <div className="py-5 mb-5 bg-light">
        <Container className="text-center">
          <h1 className="display-5 fw-bold">Bienvenido a Melodía Store</h1>
          <p className="lead">
            Tienda de instrumentos musicales, audio profesional e iluminación escénica.
            Encuentra todo lo que necesitas para tu pasión musical.
          </p>
          <Button variant="primary" size="lg" onClick={() => irA('percusion')}>
            Explorar productos
          </Button>
        </Container>
      </div>

      <Container className="mb-5">
        <h2 className="text-center mb-4">Productos destacados</h2>
        <Carousel>
          {destacados.map((d, i) => (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                src={d.imagen}
                alt={d.titulo}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>{d.titulo}</h3>
                <p>{d.texto}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <Container className="mb-5">
        <h2 className="text-center mb-4">Productos principales</h2>
        <Row>
          {productosPrincipales.map((p) => (
            <Col xs={12} sm={6} md={4} xl={4} className="mb-4" key={p.id}>
              <CardProducto producto={p} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mb-5">
        <h2 className="text-center mb-4">Nuestras categorías</h2>
        <Row>
          {categorias.map((c) => (
            <Col xs={12} sm={6} md={4} className="mb-4" key={c.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={c.imagen} alt={c.nombre} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{c.nombre}</Card.Title>
                  <Card.Text>{c.descripcion}</Card.Text>
                  <Button
                    variant="outline-primary"
                    className="mt-auto"
                    onClick={() => irA(c.id)}
                  >
                    Ver productos
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  )
}

export default Inicio