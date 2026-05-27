import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EntradaTablaCompraBilletes = ({
  id,
  nombreConcierto,
  fechaConcierto,
}) => {
  const { idConcierto } = useParams();
  let navigate = useNavigate();
  const [transportes, setTransportes] = useState([]);

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

  async function comprarBillete(idTransporte) {
    await axios.post("http://localhost:8080/api/billetes",{usuarioId:localStorage.getItem("id"),transporteId:idTransporte});
    navigate("/tablaBilletes");
  }

  async function obtenerTransportes() {
    const data = await axios.get(
      "http://localhost:8080/api/transportes/conciertos/" + id,
    );
    setTransportes(data.data);
  }

  useEffect(() => {
    obtenerTransportes();
  }, []);

  return (
    <>
      <tr
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/comprarBillete/" + id)}
      >
        <td>{nombreConcierto}</td>
        <td>{formatFecha(fechaConcierto)}</td>
      </tr>
      {id == idConcierto && (
        <tr>
          <td colSpan={2}>
            <table style={{ boxShadow: "none", borde: "0px" }}>
              <tbody>
                {transportes.map((transporte) => (
                  <tr key={transporte.id}>
                    <td>{transporte.lugarSalida}</td>
                    <td>{formatFecha(transporte.horaSalida)}</td>
                    <td>
                      <button
                        className="btn-action btn-tipos"
                        onClick={()=>comprarBillete(transporte.id)}
                      >
                        Comprar billete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

export default EntradaTablaCompraBilletes;
