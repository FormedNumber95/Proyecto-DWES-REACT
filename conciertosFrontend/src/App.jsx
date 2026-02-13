import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Principal from './pages/Principal'
import Err404 from './pages/Err404'
import Editor from './pages/Editor'
import Actuaciones from './pages/Actuaciones'
import TiposEntrada from './pages/TiposEntrada'
import EditorTipoEntrada from './pages/EditorTipoEntrada'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Principal />}></Route>
        <Route path='/editar/:id' element={<Editor />}></Route>
        <Route path='/actuaciones/:id' element={<Actuaciones />}></Route>
        <Route path='/tiposentrada/:id' element={<TiposEntrada />}></Route>
        <Route path='/editartipo/:id' element={<EditorTipoEntrada />}></Route>
        <Route path='/*' element={<Err404 />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
