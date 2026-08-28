import { useState } from 'react'
import { Card, Button, Modal, ListGroup, Badge } from 'react-bootstrap'

function CardProducto({ producto }) {
  const [mostrar, setMostrar] = useState(false)

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>{producto.descripcion}</Card.Text>
          <Badge bg="success" className="fs-6 mb-3 align-self-start">
            {producto.precio}
          </Badge>
          <Button
            variant="primary"
            className="mt-auto"
            onClick={() => setMostrar(true)}
          >
            Ver ficha técnica
          </Button>
        </Card.Body>
      </Card>

      <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{producto.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid mb-3"
          />
          <p>{producto.descripcion}</p>
          <h6>Especificaciones</h6>
          <ListGroup>
            {producto.especificaciones.map((espec, i) => (
              <ListGroup.Item key={i}>
                <strong>{espec.etiqueta}:</strong> {espec.valor}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <strong className="me-auto fs-5">{producto.precio}</strong>
          <Button variant="success" onClick={() => setMostrar(false)}>
            Agregar al carrito
          </Button>
          <Button variant="secondary" onClick={() => setMostrar(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CardProducto