import mongoose from 'mongoose'

const CATEGORIAS = ['percusion', 'viento', 'audio', 'iluminacion', 'cuerdas']

const especificacionSchema = new mongoose.Schema(
  { etiqueta: String, valor: String },
  { _id: false }
)

// Entidad de negocio del proyecto: el catálogo de productos de Melodía Store.
const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    categoria: { type: String, required: true, enum: CATEGORIAS },
    precio: { type: String, required: true, trim: true },
    descripcion: { type: String, default: '' },
    especificaciones: { type: [especificacionSchema], default: [] },
    imagen: { type: String, default: '' }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
      }
    }
  }
)

const Producto = mongoose.model('Producto', productoSchema)

export { CATEGORIAS }
export default Producto
