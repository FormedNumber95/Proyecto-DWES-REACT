import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Principal from './pages/Principal'
import Err404 from './pages/Err404'
import Editor from './pages/Editor'
import Actuaciones from './pages/Actuaciones'
import TiposEntrada from './pages/TiposEntrada'
import EditorTipoEntrada from './pages/EditorTipoEntrada'
import HomeCliente from './pages/cliente/HomeCliente'
import CarroCompra from './pages/cliente/CarroCompra'

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
        {/* ERROR 404 */}
        <Route path='/*' element={<Err404 />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
