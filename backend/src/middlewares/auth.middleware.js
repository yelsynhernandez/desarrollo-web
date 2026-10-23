import jwt from 'jsonwebtoken'

// Middleware reutilizable: valida el JWT enviado en "Authorization: Bearer <token>".
const verificarToken = (req, res, next) => {
  const cabecera = req.headers.authorization || ''
  const [esquema, token] = cabecera.split(' ')

  if (esquema !== 'Bearer' || !token) {
    return res.status(401).json({
      error: 'token_missing',
      message: 'No se proporcionó un token de autenticación.'
    })
  }

  try {
    // Si la firma es válida, el payload (id, email, role) queda disponible en req.usuario.
    req.usuario = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'token_expired',
        message:
          'La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente.'
      })
    }
    res.status(401).json({
      error: 'token_invalid',
      message: 'La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente.'
    })
  }
}

export default verificarToken
