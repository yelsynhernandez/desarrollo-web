import { useState } from 'react'
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import cliente from '../api/cliente'
import { useAuth } from '../contexto/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { iniciarSesion, sesionExpirada } = useAuth()
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const validarCampos = () => {
    if (!correo || !contrasena) {
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
    return true
  }

  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    setError('')
    if (!validarCampos()) return

    setCargando(true)
    try {
      const datos = await cliente.login({ correo, contrasena })
      // La respuesta exitosa dispara la acción global LOGIN y guarda el JWT.
      iniciarSesion(datos.usuario, datos.token)
      navigate('/perfil')
    } catch (e) {
      // 401: credenciales inválidas que devuelve la API.
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <main>
      <Container className="my-5" style={{ maxWidth: '520px' }}>
        <h1 className="text-center mb-1">Iniciar Sesión</h1>
        <p className="text-center mb-4">
          Accede a tu cuenta para ver tu perfil, tus pedidos y ofertas exclusivas.
        </p>

        {sesionExpirada && (
          <Alert variant="warning">
            Su sesión ya no es válida o ha caducado. Por favor, inicie sesión nuevamente.
          </Alert>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        <Alert variant="info">
          <strong>Cuentas de prueba:</strong> yelsyn@correo.com / 123456 o
          maria@correo.com / 123456 (se crean automáticamente en MongoDB la
          primera vez que el backend arranca).
        </Alert>

        <Card className="shadow-sm">
          <Card.Body>
            <Form onSubmit={manejarEnvio}>
              <Form.Group className="mb-3" controlId="correo">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="contrasena">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Tu contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-4"
                  disabled={cargando}
                >
                  {cargando ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Verificando…
                    </>
                  ) : (
                    'Iniciar Sesión'
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

export default Login