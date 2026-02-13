import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TipoEntrada = ({ id, nombre, precio, cupoMaximo }) => {
      let navigate = useNavigate()

      async function eliminarTipoEntrada(){
        try {
            const datos = await axios.delete("http://localhost:8080/api/tipos-entrada/"+id)
            location.reload()
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <tr>
      <td>
        {nombre}
      </td>
      <td>
        {precio}
      </td>
      <td>
        {cupoMaximo}
      </td>
      <td>
        <button onClick={() => navigate("/editartipo/" + id)}>Editar</button>
      </td>
      <td>
        <button className='btnDel' onClick={eliminarTipoEntrada}>X</button>
      </td>
    </tr>
  )
}

export default TipoEntrada