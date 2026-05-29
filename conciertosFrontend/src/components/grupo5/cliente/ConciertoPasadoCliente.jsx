import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConciertoPasadoCliente = ({ fecha, recintoId, id, nombre }) => {
  let navigate = useNavigate();

  const [recinto, setRecinto] = useState([]);
  async function getRecintos() {
    try {
      const datos = await axios.get(
        "http://localhost:8090/api/recintos/" + recintoId,
      );
      setRecinto(datos.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRecintos();
  }, []);

  const formatFecha = (fechaStr) => {
    const d = new Date(fechaStr);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
      .format(d)
      .replace(",", "");
  };

  return (
    <>
      <tr>
        <td className="fecha-concierto">{formatFecha(fecha)}</td>
        <td className="concierto-nombre">{nombre}</td>
        <td>{recinto.nombre}</td>
        <td>
          <button
            className="btn-action btn-editar"
            onClick={() => navigate("/valorarConcierto/" + id)}
          >
            Valorar
          </button>
        </td>
        <td>
          <button
            className="btn-action btn-tipos"
            onClick={() => navigate("/valoracionesConcierto/" + id)}
          >
            Ver valoraciones
          </button>
        </td>
      </tr>
    </>
  );
};

export default ConciertoPasadoCliente;
