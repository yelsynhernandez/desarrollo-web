import PaginaCategoria from '../components/PaginaCategoria'
import { productos } from '../data/productos'

function Audio() {
  return (
    <PaginaCategoria
      nombre="Audio Profesional"
      lema="Equipo de sonido profesional para eventos, estudios y presentaciones en vivo."
      descripcion="Micrófonos, mesas de mezclas, bafles y monitores para que tu sonido se escuche perfecto."
      productos={productos.audio}
    />
  )
}

export default Audio