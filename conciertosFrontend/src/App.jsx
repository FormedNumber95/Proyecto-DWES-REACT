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

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* ADMIN Y PROMOTOR */}
        <Route path='/' element={<Login />}></Route>
        <Route path='/conciertos' element={<Principal />}></Route>
        <Route path='/conciertos/:idConcierto' element={<Principal />}></Route>
        <Route path='/editar/:id' element={<Editor />}></Route>
        <Route path='/actuaciones/:id' element={<Actuaciones />}></Route>
        <Route path='/tiposentrada/:id' element={<TiposEntrada />}></Route>
        <Route path='/editartipo/:id' element={<EditorTipoEntrada />}></Route>
        {/* CLIENTE */}
        <Route path='/conciertosCliente' element={<HomeCliente />}></Route>
        <Route path='/conciertosCliente/:idConcierto' element={<HomeCliente />}></Route>
        <Route path='/carro' element={<CarroCompra />}></Route>
        <Route path='/historial' element={<Historial />}></Route>
        <Route path='/tablaBilletes' element={<TablaBilletes />}></Route>
        <Route path='/comprarBillete' element={<TablaCompraBillete />}></Route>
        <Route path='/comprarBillete/:idConcierto' element={<TablaCompraBillete />}></Route>
        {/* ERROR 404 */}
        <Route path='/*' element={<Err404 />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
