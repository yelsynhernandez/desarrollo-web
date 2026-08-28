import { useState } from 'react'
import { Container, Form, Button, Alert, Card } from 'react-bootstrap'

function Registro() {
  const [registrado, setRegistrado] = useState(false)

  const departamentos = [
    'Guatemala', 'Sacatepéquez', 'Escuintla', 'Quetzaltenango', 'Sololá',
    'Totonicapán', 'Chimaltenango', 'Baja Verapaz', 'Alta Verapaz', 'Izabal',
    'Petén', 'Retalhuleu', 'San Marcos', 'Huehuetenango', 'Quiché', 'Jalapa', 'Jutiapa'
  ]

  const categorias = [
    'Percusión', 'Viento', 'Audio Profesional', 'Iluminación', 'Cuerdas'
  ]

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    setRegistrado(true)
    window.scrollTo(0, 0)
  }

  const limpiar = () => {
    setRegistrado(false)
  }

  return (
    <main>
      <Container className="my-4">
        <h1 className="text-center mb-1">Registro de Usuario</h1>
        <p className="text-center mb-4">
          Crea tu cuenta para acceder a ofertas exclusivas y realizar tus compras.
        </p>

        {registrado && (
          <Alert variant="success" onClose={() => setRegistrado(false)} dismissible>
            <h4>¡Registro exitoso!</h4>
            <p className="mb-0">
              Gracias por crear tu cuenta en Melodía Store. Pronto recibirás un
              correo de confirmación con las ofertas exclusivas.
            </p>
          </Alert>
        )}

        <Card className="shadow-sm">
          <Card.Body>
            <Form onSubmit={manejarEnvio} onReset={limpiar}>
              <h3>Datos personales</h3>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control type="text" placeholder="Escribe tu nombre completo" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="dpi">
                <Form.Label>DPI</Form.Label>
                <Form.Control type="text" maxLength={13} placeholder="Escribe tu DPI" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="correo">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@correo.com" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" maxLength={9} placeholder="Ej: 1234-5678" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="nacimiento">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" placeholder="Escribe tu dirección" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="departamento">
                <Form.Label>Departamento</Form.Label>
                <Form.Select defaultValue="">
                  <option value="" disabled>-- Seleccione --</option>
                  {departamentos.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <hr />

              <h3>Datos de cuenta</h3>
              <Form.Group className="mb-3" controlId="usuario">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control type="text" placeholder="Elige tu usuario" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contrasena">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Crea una contraseña" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmar">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Repite tu contraseña" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="pregunta">
                <Form.Label>Pregunta de Seguridad</Form.Label>
                <Form.Select defaultValue="">
                  <option value="" disabled>-- Seleccione --</option>
                  <option>¿Cuál es el nombre de tu primera mascota?</option>
                  <option>¿En qué escuela primaria estudiaste?</option>
                  <option>¿En qué ciudad naciste?</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="respuesta">
                <Form.Label>Respuesta</Form.Label>
                <Form.Control type="text" placeholder="Escribe tu respuesta" />
              </Form.Group>

              <hr />

              <h3>Preferencias</h3>
              <Form.Group className="mb-3">
                <Form.Label><strong>Categoría de Interés</strong></Form.Label>
                {categorias.map((c) => (
                  <Form.Check
                    key={c}
                    type="checkbox"
                    label={c}
                    name="categorias"
                    className="ms-3"
                  />
                ))}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><strong>Nivel Musical</strong></Form.Label>
                {['Principiante', 'Intermedio', 'Avanzado', 'Profesional'].map((n) => (
                  <Form.Check
                    key={n}
                    type="radio"
                    label={n}
                    name="nivel"
                    className="ms-3"
                  />
                ))}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><strong>¿Deseas recibir ofertas por correo?</strong></Form.Label>
                <Form.Check
                  type="radio"
                  label="Sí, deseo recibir ofertas"
                  name="ofertas"
                  className="ms-3"
                />
                <Form.Check
                  type="radio"
                  label="No, gracias"
                  name="ofertas"
                  className="ms-3"
                />
              </Form.Group>

              <hr />

              <h3>Términos y Condiciones</h3>
              <ol>
                <li>Al registrarte, aceptas los términos y condiciones de Melodía Store.</li>
                <li>No compartas tu contraseña con terceros.</li>
                <li>Melodía Store se reserva el derecho de modificar precios sin previo aviso.</li>
                <li>Las imágenes son ilustrativas y pueden diferir del producto real.</li>
              </ol>

              <Form.Check
                type="checkbox"
                label="Acepto los Términos y Condiciones"
                className="mb-2"
                required
              />
              <Form.Check
                type="checkbox"
                label="Acepto la Política de Privacidad"
                className="mb-4"
                required
              />

              <div className="text-center">
                <Button type="submit" variant="primary" className="me-3">
                  Registrarse
                </Button>
                <Button type="reset" variant="secondary">
                  Limpiar Formulario
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}

export default Registro