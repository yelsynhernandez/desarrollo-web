import PaginaCategoria from '../components/PaginaCategoria'
import { productos } from '../data/productos'

function Cuerdas() {
  return (
    <PaginaCategoria
      nombre="Cuerdas"
      lema="Guitarras, bajos, cuerdas orquestales y más para músicos de todos los géneros."
      descripcion="Instrumentos de cuerda pulsada, frotada y todo lo necesario para su mantenimiento."
      productos={productos.cuerdas}
    />
  )
}

export default Cuerdas