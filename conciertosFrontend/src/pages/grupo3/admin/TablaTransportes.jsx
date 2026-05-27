import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FormuAddTransporte from "../../../components/grupo3/admin/FormuAddTransporte";

const TablaTransportes = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [transportes, setTransportes] = useState([]);

  async function getTransportes() {
    try {
      const datos = await axios.get(
        "http://localhost:8080/api/transportes/conciertos/" + id,
      );
      setTransportes(datos.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem("rol") != "ADMIN" &&
      localStorage.getItem("rol") != "PROMOTOR"
    ) {
      navigate("/");
    }
    getTransportes();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="table-container">
        <h1>Transportes</h1>
      <FormuAddTransporte idConcierto={id}></FormuAddTransporte>
        <table>
          <thead>
            <tr>
              <th>Fecha de Salida</th>
              <th>Lugar de salida</th>
              <th>Plazas</th>
              <th>Precio</th>
              <th>Tipo</th>
            </tr>
          </thead>

          <tbody>
            {transportes.length > 0 &&
              transportes.map((transporte) => (
                <tr key={transporte.id}>
                  <td>{transporte.horaSalida}</td>
                  <td>{transporte.lugarSalida}</td>
                  <td>{transporte.plazas}</td>
                  <td>{transporte.precio}</td>
                  <td>{transporte.tipo}</td>
                </tr>
              ))}
            {transportes.length == 0 && (
              <tr>
                <td colSpan={5}>No hay transportes</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaTransportes;
