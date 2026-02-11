import axios from 'axios'
import React, { useEffect, useState } from 'react'

const FormuAdd = () => {

  const [recintos, setRecintos] = useState([])
  const [concierto, setConcierto] = useState({estado:"PROGRAMADO"})


  async function getRecintos() {
    try {
      const datos = await axios.get("http://localhost:8090/api/recintos")
      setRecintos(datos.data)
      setConcierto({ ...concierto, recintoId: datos.data[0].id })
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getRecintos()
  }, [])

  async function postConcierto() {
    try {
      const datos = await axios.post("http://localhost:8080/api/conciertos", concierto)
      location.reload();
    } catch (error) {
      console.error(error)
    }
  }

  async function crearConcierto(ev) {
    ev.preventDefault();
    await postConcierto();
    
  }


  return (
    <form action="" method='post'>
      <input type="datetime-local" placeholder='Fecha' required onChange={(ev) => setConcierto({ ...concierto, fecha: ev.target.value })} />
      <input type="text" placeholder='Nombre' required onChange={(ev) => setConcierto({ ...concierto, nombre: ev.target.value })} />
      <select name="recinto" id="recinto" onChange={(ev) => setConcierto({ ...concierto, recintoId: ev.target.value })}>
        {recintos.map((recinto) => (
          <option key={recinto.id} value={recinto.id}>{recinto.nombre}</option>
        ))}
      </select>
      <input type="number" placeholder='Precio' step='0.01' min='0' required onChange={(ev) => setConcierto({ ...concierto, precioBase: ev.target.value })} />
      <button onClick={crearConcierto}>Añadir</button>
    </form >
  )
}

export default FormuAdd