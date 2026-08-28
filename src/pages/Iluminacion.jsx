import PaginaCategoria from '../components/PaginaCategoria'
import { productos } from '../data/productos'

function Iluminacion() {
  return (
    <PaginaCategoria
      nombre="Iluminación"
      lema="Equipo de iluminación escénica para eventos, conciertos y producciones artísticas."
      descripcion="Pares LED, cabezas móviles, láser y máquinas de humo para darle vida a tu escenario."
      productos={productos.iluminacion}
    />
  )
}

export default Iluminacion