import axios from 'axios';
import React, { useState } from 'react'

const FormuAddTiposEntrada = ({ conciertoId, precioBase }) => {

  const [tipo, setTipo] = useState({ conciertoId: conciertoId, nombre: "General", precio: precioBase, cupoMaximo: 1 })


  async function postTipoEntrada() {
    if (tipo.precio < precioBase) {
      alert("El precio no puede ser inferior al precio base del concierto")
    } else {
      try {
        //Por errores de CORS hemos modificado vite.config.js
        const datos = await axios.post("/api/conciertos/" + conciertoId + "/tipos-entrada", tipo)
        location.reload();
      } catch (error) {
        alert("El cupo de entradas no puede superar la capacidad del recinto")
      }
    }

  }

  return (
    <div className="form-add-tipo-container">
      <h3>Crear Nuevo Tipo de Entrada</h3>
      <div className="form-add-tipo">
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Tipo</label>
          <input id="nombre" type="text" placeholder="Ej: VIP, Golden, General" onChange={(ev) => setTipo({ ...tipo, nombre: ev.target.value })} />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio (€)</label>
          <input id="precio" type="number" placeholder="Precio final" step="0.01" min="0" defaultValue={precioBase} onChange={(ev) => setTipo({ ...tipo, precio: ev.target.value })} />
        </div>

        <div className="form-group">
          <label htmlFor="cupo">Cupo Máximo</label>
          <input id="cupo" type="number" placeholder="Cantidad de entradas" min="1" onChange={(ev) => setTipo({ ...tipo, cupoMaximo: ev.target.value })} />
        </div>

        <div className="form-button-tipo">
          <button className="btn-add-tipo" onClick={postTipoEntrada}>Crear Tipo</button>
        </div>
      </div>
    </div>
  )

}

export default FormuAddTiposEntrada