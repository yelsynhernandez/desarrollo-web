import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// POST /api/auth/register
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body

    if (!nombre || !correo || !contrasena) {
      return res
        .status(400)
        .json({ mensaje: 'El nombre, el correo y la contraseña son obligatorios.' })
    }

    if (contrasena.length < 6) {
      return res
        .status(400)
        .json({ mensaje: 'La contraseña debe tener al menos 6 caracteres.' })
    }

    const existeUsuario = await User.findOne({ correo })
    if (existeUsuario) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado.' })
    }

    const usuario = await User.create({
      nombre,
      correo,
      contrasena,
      rol: rol === 'admin' ? 'admin' : 'cliente'
    })

    res.status(201).json({ mensaje: 'Usuario registrado correctamente.', usuario })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el usuario.', error: error.message })
  }
}

// POST /api/auth/login
export const iniciarSesion = async (req, res) => {
  try {
    const { correo, contrasena } = req.body

    if (!correo || !contrasena) {
      return res
        .status(400)
        .json({ mensaje: 'El correo y la contraseña son obligatorios.' })
    }

    const usuario = await User.findOne({ correo })

    if (!usuario || !(await usuario.compararContrasena(contrasena))) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas.' })
    }

    // Firma el JWT con la identidad del usuario; expira según JWT_EXPIRES_IN (5m).
    const token = jwt.sign(
      { id: usuario._id, email: usuario.correo, role: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '5m' }
    )

    res.json({ mensaje: 'Inicio de sesión exitoso.', token, usuario })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión.', error: error.message })
  }
}