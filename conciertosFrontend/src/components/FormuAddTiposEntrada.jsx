import axios from 'axios';
import React, { useState } from 'react'

const FormuAddTiposEntrada = ({ conciertoId, precioBase }) => {

  const [tipo, setTipo] = useState({ conciertoId:conciertoId, nombre:"General", precio:precioBase, cupoMaximo:1 })


  async function postTipoEntrada() {
    try {
      //Por errores de CORS hemos modificado vite.config.js
      const datos = await axios.post("/api/conciertos/"+conciertoId+"/tipos-entrada", tipo)
      location.reload();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <input type="text" placeholder="Nombre" onChange={(ev) => setTipo({ ...tipo, nombre: ev.target.value })} />
      <input type="number" placeholder="Precio" step="0.01" min="0" onChange={(ev) => setTipo({ ...tipo, precio: ev.target.value })} />
      <input type="number" placeholder="Cupo máximo" min="1" onChange={(ev) => setTipo({ ...tipo, cupoMaximo: ev.target.value })} />
      <button onClick={postTipoEntrada}>Añadir</button>
    </div>
  )
}

export default FormuAddTiposEntrada