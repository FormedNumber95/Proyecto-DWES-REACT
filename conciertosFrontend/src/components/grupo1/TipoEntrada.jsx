import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TipoEntrada = ({ id, nombre, precio, cupoMaximo }) => {
  let navigate = useNavigate()

  async function eliminarTipoEntrada() {
    try {
      await axios.delete("http://localhost:8080/api/tipos-entrada/" + id)
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
      <td className="actions-column">
        <div className="actions-group">
          <button className="btn-action btn-editar" onClick={() => navigate("/editartipo/" + id)}>Editar</button>
          <button className="btn-action btn-delete" onClick={eliminarTipoEntrada}>Eliminar</button>
        </div>
      </td>
    </tr>
  )
}

export default TipoEntrada