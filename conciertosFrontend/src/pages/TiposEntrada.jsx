import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FormuAddTiposEntrada from '../components/FormuAddTiposEntrada'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TablaTiposEntrada from '../components/TablaTiposEntrada';

const TiposEntrada = () => {
  const { id } = useParams();
  const [concierto, setConcierto] = useState({})
  async function getConcierto() {
    try {
      const datos = await axios.get("http://localhost:8080/api/conciertos/" + id)
      setConcierto(datos.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getConcierto()
  }, [])

  return (
    <div>
      <Navbar></Navbar>
      <TablaTiposEntrada id={id}></TablaTiposEntrada>
    </div>
  )
}

export default TiposEntrada