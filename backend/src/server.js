import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import conectarDB from './config/db.js'
import sembrarDatos from './seed/index.js'
import authRoutes from './routes/auth.routes.js'
import productoRoutes from './routes/producto.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

// Ruta raíz: útil para el health check de Render.
app.get('/', (_req, res) => {
  res.json({
    nombre: 'API Melodía Store',
    estado: 'ok',
    conexionDB: mongoose.connection.readyState === 1 ? 'conectada' : 'desconectada'
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/productos', productoRoutes)
// Alias del enunciado: la entidad de negocio también responde en /api/recursos.
app.use('/api/recursos', productoRoutes)

app.use((_req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada.' })
})

const PORT = process.env.PORT || 5000

const iniciarServidor = async () => {
  await conectarDB()
  await sembrarDatos()
  app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`)
  })
}

iniciarServidor()