import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const Historial = () => {
  const [entradas, setEntradas] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("rol") != "CLIENTE") {
      navigate("/");
    }
  }, []);

  async function obtenerEntradasUsuario() {
    try {
      const data = await axios.get(
        "http://localhost:8080/api/entradas/usuario/" +
          localStorage.getItem("id"),
      );

      const entradasData = data.data;

      const entradasConTipo = await Promise.all(
        entradasData.map(async (entrada) => {
          const tipoResponse = await axios.get(
            "http://localhost:8080/api/tipos-entrada/" + entrada.tipo_entradaId,
          );

          return {
            ...entrada,
            nombreTipoEntrada: tipoResponse.data.nombre,
          };
        }),
      );

      setEntradas(entradasConTipo);
    } catch (error) {
      console.error(error);
    }
  }

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

  useEffect(() => {
    obtenerEntradasUsuario();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="table-container">
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
          }}
        >
          <h1>Historial de compras</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tipo de entrada</th>
              <th>Fecha</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {entradas.length > 0 &&
              entradas.map((entrada) => (
                <tr key={entrada.id}>
                  <td>{entrada.nombreTipoEntrada}</td>
                  <td>{formatFecha(entrada.fecha_compra)}</td>
                  <td>{entrada.cantidad}</td>
                </tr>
              ))}
              {entradas.length == 0 &&
              <tr>
                <td colSpan={3}>No has realizado ninguna compra</td>
              </tr>
              }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;
