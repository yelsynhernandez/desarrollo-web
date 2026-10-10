import mongoose from 'mongoose'

// Conexión persistente a MongoDB (Atlas o local) con control de errores.
const conectarDB = async () => {
  try {
    const conexion = await mongoose.connect(process.env.MONGODB_URI)
    console.log(
      `MongoDB conectado: ${conexion.connection.host}/${conexion.connection.name}`
    )
  } catch (error) {
    console.error(`Error al conectar con MongoDB: ${error.message}`)
    process.exit(1)
  }
}

mongoose.connection.on('error', (error) => {
  console.error(`Error en la conexión de MongoDB: ${error.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB se ha desconectado.')
})

export default conectarDB
