import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import AdminProductos from './pages/AdminProductos'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MiNavbar />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/percusion" element={<Percusion />} />
          <Route path="/viento" element={<Viento />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/iluminacion" element={<Iluminacion />} />
          <Route path="/cuerdas" element={<Cuerdas />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/admin" element={<AdminProductos />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
