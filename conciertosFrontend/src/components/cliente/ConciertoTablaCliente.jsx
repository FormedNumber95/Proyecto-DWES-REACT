import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ActuacionCliente from "./ActuacionCliente";
import TipoEntradasDisponibles from "./TipoEntradasDisponibles";

const ConciertoTablaCliente = ({
  id,
  nombre,
  fecha,
  recintoId,
  precio,
  estado,
}) => {
  const { idConcierto } = useParams();
  let navigate = useNavigate();

  const [recinto, setRecinto] = useState([]);
  const [tiposDisponibles, setTiposDisponibles] = useState(new Map());
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
      if (tiposEntradaData) {
        tiposEntradaData.forEach((tipoentrada) => {
          entradasTotales += tipoentrada.cupoMaximo;
        });
        entradasDeConciertoData.forEach((entrada) => {
          entradasCompradas += entrada.cantidad;
        });
        setEntradasDisponibles(entradasTotales - entradasCompradas);

        tiposEntradaData.forEach((tipo) => {
          let cant = tipo.cupoMaximo;
          entradasDeConciertoData.forEach((entrada) => {
            if (tipo.id == entrada.tipo_entradaId) {
              cant = cant - entrada.cantidad;
            }
            if (cant > 0) {
              setTiposDisponibles((tiposDisponibles) =>
                tiposDisponibles.set(tipo.id, {"cant":cant,"nombre":tipo.nombre}),
              );
            }
          });
        });
      }
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
      <tr style={{cursor: "pointer"}} onClick={() => navigate("/conciertosCliente/" + id)}>
        <td className="fecha-concierto">{formatFecha(fecha)}</td>
        <td className="concierto-nombre">{nombre}</td>
        <td>{recinto.nombre}</td>
        <td>{precio}</td>
        <td>{entradasDisponibles}</td>
      </tr>
      {idConcierto == id && (
        <tr>
          <td colSpan={2}>
            <h3>ACTUACIONES</h3>
            <table style={{ width: "100%" }}>
              <tbody>
                {actuaciones.length > 0 &&
                  actuaciones.map((actuacion) => (
                    <ActuacionCliente
                      key={actuacion.id}
                      idArtista={actuacion.artistaId}
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
          <td></td>
          <td colSpan={2}>
            <h3>TIPOS DE ENTRADA DISPONIBLES</h3>
            <table style={{ width: "100%" }}>
              <tbody>
                {entradasDisponibles > 0 &&
                  Array.from(tiposDisponibles).map(([id, objeto]) => (
                    <TipoEntradasDisponibles
                      key={id}
                      nombre={objeto.nombre}
                      id={id}
                      cantidad={objeto.cant}
                    />
                  ))}
                {entradasDisponibles === 0 && (
                  <tr>
                    <td>No tiene actuaciones</td>
                  </tr>
                )}
              </tbody>
            </table>
          </td>
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
