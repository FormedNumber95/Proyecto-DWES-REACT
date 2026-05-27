import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import EntradaTablaCompraBilletes from "../../../components/grupo3/cliente/EntradaTablaCompraBilletes";

const TablaCompraBillete = () => {
  let navigate = useNavigate();
  const [entradas, setEntradas] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("rol") != "CLIENTE") {
      navigate("/");
    }
    getEntradas();
  }, []);

  async function getEntradas() {
    try {
      const data = await axios.get(
        "http://localhost:8080/api/entradas/usuario/" +
          localStorage.getItem("id"),
      );

      let entradasData = data.data;
      entradasData = entradasData.filter(
        (entrada, index, self) =>
          index ===
          self.findIndex((e) => e.conciertoId === entrada.conciertoId),
      );

      let entradasConTipo = await Promise.all(
        entradasData.map(async (entrada) => {
          const tipoResponse = await axios.get(
            "http://localhost:8080/api/tipos-entrada/" + entrada.tipo_entradaId,
          );
          const conciertoResponse = await axios.get(
            "http://localhost:8080/api/conciertos/" +
              tipoResponse.data.conciertoId,
          );
          return {
            ...entrada,
            nombreConcierto: conciertoResponse.data.nombre,
            fechaConcierto: conciertoResponse.data.fecha,
            idConcierto: conciertoResponse.data.id,
          };
        }),
      );
      entradasConTipo = entradasConTipo.filter((entrada) => {
        return new Date() < new Date(entrada.fechaConcierto);
      });
      setEntradas(entradasConTipo);
    } catch (error) {
      console.error(error);
    }
  }

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
          <h1>Conciertos</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Concierto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {entradas.length > 0 &&
              entradas.map((entrada) => (
                <EntradaTablaCompraBilletes
                  id={entrada.idConcierto}
                  fechaConcierto={entrada.fechaConcierto}
                  key={entrada.id}
                  nombreConcierto={entrada.nombreConcierto}
                ></EntradaTablaCompraBilletes>
              ))}
            {entradas.length == 0 && (
              <tr>
                <td colSpan={3}>No tienes entradas para conciertos futuros</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaCompraBillete;
