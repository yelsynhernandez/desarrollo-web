import { useState } from 'react'
import { AuthProvider } from './contexto/AuthContext'
import MiNavbar from './components/MiNavbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Percusion from './pages/Percusion'
import Viento from './pages/Viento'
import Audio from './pages/Audio'
import Iluminacion from './pages/Iluminacion'
import Cuerdas from './pages/Cuerdas'
import Registro from './pages/Registro'
import Login from './pages/Login'
import Perfil from './pages/Perfil'

function App() {
  const [pagina, setPagina] = useState('inicio')

  const irA = (seccion) => {
    setPagina(seccion)
  }

  return (
    <AuthProvider>
      <MiNavbar pagina={pagina} irA={irA} />

      {pagina === 'inicio' && <Inicio irA={irA} />}
      {pagina === 'percusion' && <Percusion />}
      {pagina === 'viento' && <Viento />}
      {pagina === 'audio' && <Audio />}
      {pagina === 'iluminacion' && <Iluminacion />}
      {pagina === 'cuerdas' && <Cuerdas />}
      {pagina === 'registro' && <Registro />}
      {pagina === 'login' && <Login irA={irA} />}
      {pagina === 'perfil' && <Perfil irA={irA} />}

      <Footer />
    </AuthProvider>
  )
}

export default App