import axios from 'axios'
import React, { useEffect, useState } from 'react'


const FormuAdd = () => {

  const [recintos, setRecintos] = useState([])
  async function getRecintos() {
    try {
      const datos = await axios.get("http://localhost:8090/api/recintos")
      setRecintos(datos.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getRecintos()
  }, [])


  return (
    <form action="" method='post'>
      <input type="date" placeholder='Fecha' required/>
      <input type="text" placeholder='Nombre' required/>
      <select name="recinto" id="recinto">
        {recintos.map((recinto) => (
          <option key={recinto.id} value={recinto.id}>{recinto.nombre}</option>
        ))}
      </select>
      <input type="number" placeholder='Precio' step='0.01' min='0' required/>
      <input type="hidden" value='PROGRAMADO' />
      <button>Añadir</button>
    </form >
  )
}

export default FormuAdd