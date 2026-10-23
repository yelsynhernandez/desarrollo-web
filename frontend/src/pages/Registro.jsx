import { useState } from 'react'
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import cliente from '../api/cliente'

function Registro() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [error, setError] = useState('')
  const [exitoso, setExitoso] = useState(false)
  const [cargando, setCargando] = useState(false)

  const validarCampos = () => {
    if (!nombre || !correo || !contrasena || !confirmar) {
      setError('Debes completar todos los campos.')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setError('El correo electrónico no tiene un formato válido.')
      return false
    }
    if (contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return false
    }
    if (contrasena !== confirmar) {
      setError('Las contraseñas no coinciden.')
      return false
    }
    return true
  }

  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    setError('')
    if (!validarCampos()) return

    setCargando(true)
    try {
      await cliente.registrar({ nombre, correo, contrasena })
      setExitoso(true)
      window.scrollTo(0, 0)
    } catch (e) {
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <main>
      <Container className="my-4" style={{ maxWidth: '640px' }}>
        <h1 className="text-center mb-1">Registro de Usuario</h1>
        <p className="text-center mb-4">
          Crea tu cuenta para acceder a ofertas exclusivas y realizar tus compras.
        </p>

        {exitoso && (
          <Alert variant="success" className="text-center">
            <h4>¡Registro exitoso!</h4>
            <p className="mb-2">
              Tu usuario fue guardado en MongoDB. Ya puedes iniciar sesión.
            </p>
            <Button variant="success" onClick={() => navigate('/login')}>
              Ir a Iniciar Sesión
            </Button>
          </Alert>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        <Card className="shadow-sm">
          <Card.Body>
            <Form onSubmit={manejarEnvio}>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escribe tu nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="correo">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contrasena">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Crea una contraseña (mínimo 6 caracteres)"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="confirmar">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repite tu contraseña"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary" disabled={cargando}>
                  {cargando ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Registrando…
                    </>
                  ) : (
                    'Registrarse'
                  )}
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