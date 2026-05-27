import axios from 'axios'
import React, { useEffect, useState } from 'react'

const FormuAdd = () => {

  const [recintos, setRecintos] = useState([])
  const [concierto, setConcierto] = useState({ estado: "PROGRAMADO" })


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
    if (concierto.fecha == null || concierto.nombre == null || concierto.nombre.trim() == "" || concierto.precioBase == null||concierto.precioBase.trim() == "") {
      alert("Debes completar todos los campos del formulario")
    } else {
      if (concierto.precioBase < 0) {
        alert("El precio de las entradas no puede ser negativo")
      } else {
        if (!Number.isInteger(concierto.precioBase * 100)) {
          alert("El precio puede contener hasta 2 decimales")
        } else {
          try {
            await axios.post("http://localhost:8080/api/conciertos", concierto)
            location.reload();
          } catch (error) {
            console.error(error)
          }
        }

      }
    }
  }

  async function crearConcierto(ev) {
    ev.preventDefault();
    await postConcierto();

  }


  return (
    <div className="form-add-container">
      <h3>Añadir Nuevo Concierto</h3>
      <form action="" method='post' className="form-add">
        <div className="form-group">
          <label htmlFor="fecha">Fecha y Hora</label>
          <input id="fecha" type="datetime-local" required onChange={(ev) => setConcierto({ ...concierto, fecha: ev.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" type="text" placeholder='Nombre del concierto' required onChange={(ev) => setConcierto({ ...concierto, nombre: ev.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="recinto">Recinto</label>
          <select name="recinto" id="recinto" onChange={(ev) => setConcierto({ ...concierto, recintoId: ev.target.value })}>
            {recintos.map((recinto) => (
              <option key={recinto.id} value={recinto.id}>{recinto.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio Base (€)</label>
          <input id="precio" type="number" placeholder='0.00' step='0.01' min='0' required onChange={(ev) => setConcierto({ ...concierto, precioBase: ev.target.value })} />
        </div>
        <div className="form-button">
          <button onClick={crearConcierto}>Añadir Concierto</button>
        </div>
      </form >
    </div>
  )

}

export default FormuAdd