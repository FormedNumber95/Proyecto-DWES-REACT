import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Actuacion from './Actuacion';


const Concierto = ({ id, nombre, fecha, recintoId, precio, estado }) => {

  const { idConcierto } = useParams();
  let navigate = useNavigate()

  let fechaActual = new Date()
  let fechaDate = new Date(fecha)
  const deshabilitar = fechaActual > fechaDate;


  const [recinto, setRecinto] = useState([])
  const [actuaciones, setActuaciones] = useState([])
  async function getRecintos() {
    try {
      const datos = await axios.get("http://localhost:8090/api/recintos/" + recintoId)
      setRecinto(datos.data)
    } catch (error) {
      console.error(error)
    }
  }
  async function getActuaciones() {
    try {
      const datos = await axios.get("http://localhost:8080/api/conciertos/" + idConcierto + "/actuaciones")
      setActuaciones(datos.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getRecintos()
    if (idConcierto != null) {
      getActuaciones()
    }
  }, [])

  const formatFecha = (fechaStr) => {
    const d = new Date(fechaStr);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d).replace(',', '');
  }

  return (
    <>
      <tr>
        <td className="fecha-concierto">
          {formatFecha(fecha)}
        </td>
        <td className='concierto-nombre'>
          <a href={"/conciertos/" + id}>{nombre}</a>
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
          <button className="btn-action btn-editar" disabled={deshabilitar} onClick={() => navigate("/editar/" + id)}>Editar</button>
        </td>
        <td>
          <button className="btn-action btn-actuaciones" disabled={deshabilitar} onClick={() => navigate("/actuaciones/" + id)}>Actuaciones</button>
        </td>
        <td>
          <button className="btn-action btn-tipos" disabled={deshabilitar} onClick={() => navigate("/tiposentrada/" + id)}>Tipos de entrada</button>
        </td>
      </tr>
      {idConcierto == id && (
        <tr>
          <td colSpan={8}>
            <h2>ACTUACIONES</h2>
            <table style={{ width: "100%" }}>
              <tbody>
                {actuaciones.length > 0 && actuaciones.map(
                  (actuacion) => (
                    <Actuacion
                      key={actuacion.id}
                      id={actuacion.id}
                      idArtista={actuacion.artistaId}
                      disabled={deshabilitar}
                    />
                  )
                )}
                {actuaciones.length === 0 && (
                  <tr>
                    <td>No tiene actuaciones</td>
                  </tr>
                )}
              </tbody>
            </table>
          </td>
        </tr>
      )}

    </>
  )

}

export default Concierto