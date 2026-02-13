import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Concierto = ({ id, nombre, fecha, recintoId, precio, estado }) => {

  let navigate = useNavigate()

  let fechaActual = new Date()
  let fechaDate = new Date(fecha)
  const deshabilitar = fechaActual > fechaDate;


  const [recinto, setRecinto] = useState([])
  async function getRecintos() {
    try {
      const datos = await axios.get("http://localhost:8090/api/recintos/" + recintoId)
      setRecinto(datos.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getRecintos()
  }, [])

  return (
    <tr>
      <td>
        {fecha}
      </td>
      <td className='concierto'>
        {nombre}
      </td>
      <td>
        {recinto.nombre}
      </td>
      <td>
        {precio}
      </td>
      <td>
        {estado}
      </td>
      <td>
        <button disabled={deshabilitar} onClick={() => navigate("/editar/" + id)}>Editar</button>
      </td>
      <td>
        <button disabled={deshabilitar} onClick={() => navigate("/actuaciones/" + id)}>Actuaciones</button>
      </td>
      <td>
        <button disabled={deshabilitar} onClick={() => navigate("/tiposentrada/" + id)}>Tipos de entrada</button>
      </td>
    </tr>
  )
}

export default Concierto