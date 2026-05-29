import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import ConciertoPasadoCliente from "../../../components/grupo5/cliente/ConciertoPasadoCliente";

const TablaConciertosPasadosCliente = () => {
  let navigate = useNavigate();
  const [conciertos, setConciertos] = useState([]);

  async function getConciertos() {
    try {
      const datos = await axios.get("http://localhost:8080/api/conciertos");

      const ahora = new Date();

      const conciertosFiltrados = datos.data.filter((concierto) => {
        return new Date(concierto.fecha) < ahora;
      });

      setConciertos(conciertosFiltrados);
    } catch (error) {
      console.error(error);
    }
  }

//   function verValoracionesDeUsuario(event) {
//     event.preventDefault();
//     navigate("/valoracionesUsuario/" + usuario);
//   }

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
        <h1>Coniertos a los que has asistido</h1>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Recinto</th>
              <th>Valorar</th>
              <th>Ver valoraciones</th>
            </tr>
          </thead>

          <tbody>
            {conciertos.length > 0 &&
              conciertos.map((concierto) => (
                <ConciertoPasadoCliente
                  key={concierto.id}
                  id={concierto.id}
                  nombre={concierto.nombre}
                  fecha={concierto.fecha}
                  recintoId={concierto.recintoId}
                ></ConciertoPasadoCliente>
              ))}
            {conciertos.length == 0 && (
              <tr>
                <td colSpan={10}>No hay conciertos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaConciertosPasadosCliente;
