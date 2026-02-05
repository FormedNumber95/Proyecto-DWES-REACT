import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Concierto = ({nombre, fecha, recintoId, precio, estado}) => {

  const [recinto, setRecinto] = useState([])
    async function getRecintos() {
        try {
            const datos = await axios.get("http://localhost:8090/api/recintos/"+recintoId)
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
    </tr>
  )
}

export default Concierto