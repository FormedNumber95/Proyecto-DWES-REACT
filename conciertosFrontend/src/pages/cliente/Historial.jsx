import axios from "axios";
import { useEffect, useState } from "react";

const Historial = () => {
  const [entradas, setEntradas] = useState([]);

  async function obtenerEntradasUsuario() {
    try {
      const data = await axios.get(
        "http://localhost:8080/api/entradas/usuario/" +
          localStorage.getItem("id"),
      );

      const entradasData = data.data;

      // Por cada entrada, obtener el tipo de entrada
      const entradasConTipo = await Promise.all(
        entradasData.map(async (entrada) => {
          const tipoResponse = await axios.get(
            "http://localhost:8080/api/tipos-entrada/" + entrada.tipo_entradaId,
          );

          return {
            ...entrada,
            nombreTipoEntrada: tipoResponse.data.nombre, // ajusta "nombre" según tu backend
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

          <a href="/conciertosCliente">
            <button
              className="btn-action btn-tipos"
              style={{
                position: "absolute",
                left: "1em",
              }}
            >
              Atras
            </button>
          </a>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;
