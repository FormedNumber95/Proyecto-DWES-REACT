import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import FormuAdd from '../components/FormuAdd'
import Tabla from '../components/Tabla'
import { useNavigate } from 'react-router-dom'

const Principal = () => {
  let navigate = useNavigate();

  useEffect(() => {
      if (localStorage.getItem("usuario") != "ADMIN" && localStorage.getItem("usuario") != "PROMOTOR"){
        navigate("/");
      }
    }, [])

  return (
    <div>
        <Navbar></Navbar>
        <Tabla></Tabla>
    </div>
  )
}

export default Principal