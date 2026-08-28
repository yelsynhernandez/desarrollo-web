import PaginaCategoria from '../components/PaginaCategoria'
import { productos } from '../data/productos'

function Percusion() {
  return (
    <PaginaCategoria
      nombre="Percusión"
      lema="Explora nuestra selección de instrumentos de percusión para todos los niveles."
      descripcion="Desde baterías acústicas hasta panderos, contamos con el equipo perfecto para ritmos de todo el mundo."
      productos={productos.percusion}
    />
  )
}

export default Percusion