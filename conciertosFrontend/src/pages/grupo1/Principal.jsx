import  { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Tabla from '../../components/grupo1/Tabla'
import { useNavigate } from 'react-router-dom'

const Principal = () => {
  let navigate = useNavigate();

  useEffect(() => {
      if (localStorage.getItem("rol") != "ADMIN" && localStorage.getItem("rol") != "PROMOTOR"){
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