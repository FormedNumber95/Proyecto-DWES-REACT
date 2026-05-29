import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Valoracion from "../../components/grupo5/Valoracion";

const ValoracionesDeConcierto = () => {
  let navigate = useNavigate();
  const [valoraciones, setValoraciones] = useState([]);
  const { id } = useParams();

  async function getValoraciones() {
    try {
      const datos = await axios.get(
        "http://localhost:8080/api/conciertos/" + id + "/valoraciones",
      );
      setValoraciones(datos.data);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    if (
      localStorage.getItem("rol") != "ADMIN" &&
      localStorage.getItem("rol") != "CLIENTE"
    ) {
      navigate("/");
    }
    getValoraciones();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="table-container">
        <h1>Valoraciones del concierto</h1>
        <table>
          <thead>
            <tr>
              <th>Comentario</th>
              <th>Fecha</th>
              <th>Puntuacion</th>
              {localStorage.getItem("rol") == "ADMIN" && <th>Censurar</th>}
            </tr>
          </thead>

          <tbody>
            {valoraciones.length > 0 &&
              valoraciones.map((valoracion) => (
                <Valoracion
                  key={valoracion.id}
                  comentario={valoracion.comentario}
                  fecha={valoracion.fecha}
                  puntuacion={valoracion.puntuacion}
                  id={valoracion.id}
                ></Valoracion>
              ))}
            {valoraciones.length == 0 && (
              <tr>
                <td colSpan={10}>No hay valoraciones</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ValoracionesDeConcierto;
