import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    contrasena: { type: String, required: true, minlength: 6 },
    rol: { type: String, enum: ['admin', 'cliente'], default: 'cliente' }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.contrasena
        return ret
      }
    }
  }
)

// Encripta la contraseña antes de guardar.
userSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) return next()
  const salt = await bcrypt.genSalt(10)
  this.contrasena = await bcrypt.hash(this.contrasena, salt)
  next()
})

// Compara la contraseña enviada con la almacenada.
userSchema.methods.compararContrasena = function (contrasena) {
  return bcrypt.compare(contrasena, this.contrasena)
}

const User = mongoose.model('User', userSchema)

export default User
