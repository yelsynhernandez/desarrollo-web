import User from '../models/User.js'
import Producto from '../models/Producto.js'
import { productosSeed } from './data.js'

// Inserta datos iniciales únicamente si la base está vacía (idempotente).
const sembrarDatos = async () => {
  if ((await User.countDocuments()) === 0) {
    await User.create([
      {
        nombre: 'Yelsyn Adrid Hernández Crúz',
        correo: 'yelsyn@correo.com',
        contrasena: '123456',
        rol: 'admin'
      },
      {
        nombre: 'María José López',
        correo: 'maria@correo.com',
        contrasena: '123456',
        rol: 'cliente'
      }
    ])
    console.log('Seed: usuarios de demostración creados.')
  }

  if ((await Producto.countDocuments()) === 0) {
    await Producto.insertMany(productosSeed)
    console.log(`Seed: ${productosSeed.length} productos insertados.`)
  }
}

export default sembrarDatos