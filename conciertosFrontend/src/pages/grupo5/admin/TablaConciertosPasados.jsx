import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import ConciertoPasado from "../../../components/grupo5/admin/ConciertoPasado";

const TablaConciertosPasados = () => {
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

  useEffect(() => {
    if (localStorage.getItem("rol") != "ADMIN") {
      navigate("/");
    }
    getConciertos();
  }, []);
  return (
    <div className="table-container">
        <Navbar></Navbar>
      <h1>Nuestros conciertos</h1>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Recinto</th>
            <th>Valoraciones</th>
          </tr>
        </thead>

        <tbody>
          {conciertos.length > 0 &&
            conciertos.map((concierto) => (
              <ConciertoPasado
                key={concierto.id}
                id={concierto.id}
                nombre={concierto.nombre}
                fecha={concierto.fecha}
                recintoId={concierto.recintoId}
              ></ConciertoPasado>
            ))}
            {conciertos.length == 0 && <tr>
                <td colSpan={10}>No hay conciertos</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default TablaConciertosPasados;
