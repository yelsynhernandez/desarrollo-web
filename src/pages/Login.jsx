import { useState } from 'react'
import { Container, Form, Button, Alert, Card } from 'react-bootstrap'
import usuariosDemo from '../data/usuarios'
import { useAuth } from '../contexto/AuthContext'

function Login({ irA }) {
  const { iniciarSesion } = useAuth()
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')

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

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    setError('')
    if (!validarCampos()) return

    const usuario = usuariosDemo.find(
      (u) => u.correo === correo && u.contrasena === contrasena
    )

    if (usuario) {
      iniciarSesion(usuario)
      irA('perfil')
    } else {
      setError('Las credenciales no son correctas o el usuario no está registrado.')
    }
  }

  return (
    <main>
      <Container className="my-5" style={{ maxWidth: '520px' }}>
        <h1 className="text-center mb-1">Iniciar Sesión</h1>
        <p className="text-center mb-4">
          Accede a tu cuenta para ver tu perfil, tus pedidos y ofertas exclusivas.
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Alert variant="info">
          <strong>Cuentas de prueba:</strong> yelsyn@correo.com / 123456 o
          maria@correo.com / 123456
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
                <Button type="submit" variant="primary" className="px-4">
                  Iniciar Sesión
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