import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ConciertoTablaCliente = ({
  id,
  nombre,
  fecha,
  recintoId,
  precio,
  estado,
}) => {
  const { idConcierto } = useParams();

  const [recinto, setRecinto] = useState([]);
  const [entradasDisponibles, setEntradasDisponibles] = useState(0);
  const [actuaciones, setActuaciones] = useState([]);
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
  async function getActuaciones() {
    try {
      const datos = await axios.get(
        "http://localhost:8080/api/conciertos/" + idConcierto + "/actuaciones",
      );
      setActuaciones(datos.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getEntradasDisponibles() {
    try {
      const tiposEntrada = await axios.get(
        "http://localhost:8080/api/conciertos/" + id + "/tipos-entrada",
      );
      let tiposEntradaData = tiposEntrada.data;
      const entradasDeConcierto = await axios.get(
        "http://localhost:8080/api/entradas/concierto/" + id,
      );
      let entradasDeConciertoData = entradasDeConcierto.data;
      let entradasTotales = 0;
      let entradasCompradas = 0;
      tiposEntradaData.forEach((tipoentrada) => {
        entradasTotales += tipoentrada.cupoMaximo;
      });
      entradasDeConciertoData.forEach((entrada) => {
        entradasCompradas = entrada.cantidad;
      });
      setEntradasDisponibles(entradasTotales - entradasCompradas);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRecintos();
    getEntradasDisponibles();
    if (idConcierto != null) {
      getActuaciones();
    }
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
        <td className="concierto-nombre">
          <a href={"/conciertosCliente/" + id}>{nombre}</a>
        </td>
        <td>{recinto.nombre}</td>
        <td>{precio}</td>
        <td>{entradasDisponibles}</td>
      </tr>
      {idConcierto == id && (
        <tr>
          <td colSpan={2}>HOLA</td>
          <td></td>
          <td colSpan={2}>PAKO</td>
        </tr>
      )}
      {/* {idConcierto == id && (
        <tr>
          <td colSpan={8}>
            <h2>ACTUACIONES</h2>
            <table style={{ width: "100%" }}>
              <tbody>
                {actuaciones.length > 0 &&
                  actuaciones.map((actuacion) => (
                    <Actuacion
                      key={actuacion.id}
                      id={actuacion.id}
                      idArtista={actuacion.artistaId}
                      disabled={deshabilitar}
                    />
                  ))}
                {actuaciones.length === 0 && (
                  <tr>
                    <td>No tiene actuaciones</td>
                  </tr>
                )}
              </tbody>
            </table>
          </td>
        </tr>
      )} */}
    </>
  );
};

export default ConciertoTablaCliente;
