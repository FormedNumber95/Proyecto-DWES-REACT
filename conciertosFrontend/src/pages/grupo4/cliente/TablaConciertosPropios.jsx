import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import EntradaTablaConciertosPropios from "../../../components/grupo4/cliente/EntradaTablaConciertosPropios";

const TablaConciertosPropios = () => {
  let navigate = useNavigate();

  const [conciertos, setConciertos] = useState([]);

  async function getConciertos() {
    try {
      // 1. Obtener entradas del usuario
      const entradasResponse = await axios.get(
        "http://localhost:8080/api/entradas/usuario/" +
          localStorage.getItem("id"),
      );

      const entradas = entradasResponse.data;

      // 2. Obtener los tipos de entrada de cada entrada
      const tiposEntrada = await Promise.all(
        entradas.map(async (entrada) => {
          // Esta ruta devuelve un tipo de entrada concreto
          const tipoResponse = await axios.get(
            "http://localhost:8080/api/tipos-entrada/" + entrada.tipo_entradaId,
          );

          return tipoResponse.data;
        }),
      );

      // 3. Obtener los conciertos asociados a cada tipo de entrada
      const conciertos = await Promise.all(
        tiposEntrada.map(async (tipo) => {
          // Esta ruta devuelve un concierto concreto
          const conciertoResponse = await axios.get(
            "http://localhost:8080/api/conciertos/" + tipo.conciertoId,
          );

          return conciertoResponse.data;
        }),
      );

      // 4. Evitar conciertos duplicados
      const conciertosUnicosFuturos = conciertos
        .filter((concierto) => new Date(concierto.fecha) > new Date())
        .filter(
          (concierto, index, self) =>
            index === self.findIndex((c) => c.id === concierto.id),
        );

      setConciertos(conciertosUnicosFuturos);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("rol") != "CLIENTE") {
      navigate("/");
    }
    getConciertos();
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
          <h1>Conciertos futuros</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Productos</th>
            </tr>
          </thead>
          <tbody>
            {conciertos.length > 0 &&
              conciertos.map((concierto) => (
                <EntradaTablaConciertosPropios
                  key={concierto.id}
                  estado={concierto.estado}
                  fecha={concierto.fecha}
                  nombre={concierto.nombre}
                  id={concierto.id}
                ></EntradaTablaConciertosPropios>
              ))}
            {conciertos.length == 0 && (
              <tr>
                <td colSpan={4}>No tienes conciertos futuros</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaConciertosPropios;
