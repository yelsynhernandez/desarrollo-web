import PaginaCategoria from '../components/PaginaCategoria'
import { productos } from '../data/productos'

function Viento() {
  return (
    <PaginaCategoria
      nombre="Viento"
      lema="Instrumentos de viento madera y metal para orquestas, bandas y solistas."
      descripcion="Trompetas, saxofones, flautas y más, para músicos de todos los géneros."
      productos={productos.viento}
    />
  )
}

export default Viento