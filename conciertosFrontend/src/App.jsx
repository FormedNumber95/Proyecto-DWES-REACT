import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Principal from './pages/grupo1/Principal'
import Err404 from './pages/Err404'
import Editor from './pages/grupo1/Editor'
import Actuaciones from './pages/grupo1/Actuaciones'
import TiposEntrada from './pages/grupo1/TiposEntrada'
import EditorTipoEntrada from './pages/grupo1/EditorTipoEntrada'
import HomeCliente from './pages/grupo2/HomeCliente'
import CarroCompra from './pages/grupo2/CarroCompra'
import Historial from './pages/grupo2/Historial'
import TablaBilletes from './pages/grupo3/cliente/TablaBilletes'
import TablaCompraBillete from './pages/grupo3/cliente/TablaCompraBillete'
import TablaTransportes from './pages/grupo3/admin/TablaTransportes'
import TablaProductos from './pages/grupo4/admin/TablaProductos'
import EditarProducto from './pages/grupo4/admin/EditarProducto'
import TablaConciertosPropios from './pages/grupo4/cliente/TablaConciertosPropios'
import TablaCompraProductos from './pages/grupo4/cliente/TablaCompraProductos'
import CarroCompraProductos from './pages/grupo4/cliente/CarroCompraProductos'
import HistorialProductos from './pages/grupo4/cliente/HistorialProductos'
import TablaConciertosPasados from './pages/grupo5/admin/TablaConciertosPasados'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* GENERAL */}
        <Route path='/' element={<Login />}></Route>
        {/* ADMIN Y PROMOTOR */}
        <Route path='/conciertos' element={<Principal />}></Route>
        <Route path='/conciertos/:idConcierto' element={<Principal />}></Route>
        <Route path='/editar/:id' element={<Editor />}></Route>
        <Route path='/actuaciones/:id' element={<Actuaciones />}></Route>
        <Route path='/tiposentrada/:id' element={<TiposEntrada />}></Route>
        <Route path='/editartipo/:id' element={<EditorTipoEntrada />}></Route>
        <Route path='/transportesConcierto/:id' element={<TablaTransportes />}></Route>
        {/* ADMIN */}
        <Route path='/productos/:id' element={<TablaProductos />}></Route>
        <Route path='/editarProducto/:id' element={<EditarProducto />}></Route>
        <Route path='/tablaConciertosPasados' element={<TablaConciertosPasados />}></Route>
        {/* CLIENTE */}
        <Route path='/conciertosCliente' element={<HomeCliente />}></Route>
        <Route path='/conciertosCliente/:idConcierto' element={<HomeCliente />}></Route>
        <Route path='/carro' element={<CarroCompra />}></Route>
        <Route path='/historialEntradas' element={<Historial />}></Route>
        <Route path='/tablaBilletes' element={<TablaBilletes />}></Route>
        <Route path='/comprarBillete' element={<TablaCompraBillete />}></Route>
        <Route path='/comprarBillete/:idConcierto' element={<TablaCompraBillete />}></Route>
        <Route path='/conciertosFuturos' element={<TablaConciertosPropios />}></Route>
        <Route path='/comprarProductos/:idConcierto' element={<TablaCompraProductos />}></Route>
        <Route path='/carroProductos' element={<CarroCompraProductos />}></Route>
        <Route path='/historialProductos' element={<HistorialProductos />}></Route>
        {/* ERROR 404 */}
        <Route path='/*' element={<Err404 />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
