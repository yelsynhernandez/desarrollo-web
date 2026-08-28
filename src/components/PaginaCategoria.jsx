import { Container, Row, Col, Badge, Table, ListGroup, Accordion } from 'react-bootstrap'
import CardProducto from './CardProducto'

function PaginaCategoria({ nombre, lema, descripcion, productos }) {
  const preguntas = [
    {
      pregunta: '¿Los productos cuentan con garantía?',
      respuesta:
        `Sí, todos los artículos de ${nombre} incluyen garantía de fábrica contra defectos ` +
        'de fabricación. La garantía cubre un año y aplica desde la fecha de compra.'
    },
    {
      pregunta: '¿Realizan envíos a todo el país?',
      respuesta:
        `Sí, enviamos los productos de ${nombre} a todos los departamentos de Guatemala. ` +
        'El tiempo de entrega en la ciudad capital es de 1 a 3 días hábiles.'
    },
    {
      pregunta: '¿Puedo probar el instrumento antes de comprar?',
      respuesta:
        'Claro. Visita nuestra tienda en la Zona 10 de la Ciudad de Guatemala, ' +
        'donde podrás probar el instrumento con total confianza.'
    }
  ]

  return (
    <main>
      <Container className="my-4">
        <div className="text-center mb-4">
          <h1>{nombre}</h1>
          <Badge bg="primary" className="fs-5 mb-2">Categoría</Badge>
          <p className="lead mb-1">{lema}</p>
          <p>{descripcion}</p>
        </div>

        <h2 className="mb-3">Productos disponibles</h2>
        <Row>
          {productos.map((p) => (
            <Col xs={12} sm={6} md={4} xl={4} className="mb-4" key={p.id}>
              <CardProducto producto={p} />
            </Col>
          ))}
        </Row>

        <h2 className="mt-5 mb-3">Tabla comparativa</h2>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Característica principal</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.especificaciones[0].etiqueta}: {p.especificaciones[0].valor}</td>
                  <td>{p.precio}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <h2 className="mt-5 mb-3">Lista de precios</h2>
        <ListGroup>
          {productos.map((p) => (
            <ListGroup.Item
              key={p.id}
              className="d-flex justify-content-between align-items-center"
            >
              {p.nombre}
              <Badge bg="success" pill>{p.precio}</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <h2 className="mt-5 mb-3">Preguntas frecuentes</h2>
        <Accordion defaultActiveKey="0">
          {preguntas.map((q, i) => (
            <Accordion.Item eventKey={String(i)} key={i}>
              <Accordion.Header>{q.pregunta}</Accordion.Header>
              <Accordion.Body>{q.respuesta}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </main>
  )
}

export default PaginaCategoria