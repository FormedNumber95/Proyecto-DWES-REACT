import axios from "axios";
import { useNavigate } from "react-router-dom";

const Valoracion = ({ comentario, fecha, puntuacion, id, usuarioId = -1 }) => {
  let navigate = useNavigate();

  async function borrarValoracion() {
    try {
      await axios.delete("http://localhost:8080/api/valoraciones/" + id);
    } catch (error) {
      console.error(error);
    }
  }

  async function censurarValoracion(event) {
    event.preventDefault();
    borrarValoracion();
    location.reload();
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

  return (
    <tr>
      <td>{comentario}</td>
      <td className="fecha-concierto">{formatFecha(fecha)}</td>
      <td>{puntuacion}</td>
      {localStorage.getItem("rol") == "ADMIN" && (
        <td>
          <button
            className="btn-action btn-delete"
            onClick={censurarValoracion}
          >
            CENSURAR
          </button>
        </td>
      )}
      {localStorage.getItem("rol") == "CLIENTE" && (
        <td>
          <button
            className="btn-action btn-editar"
            onClick={() => navigate("/editarValoracion/" + id)}
            disabled={
              Number(localStorage.getItem("id")) !== usuarioId ||
              new Date() - new Date(fecha) > 2 * 60 * 60 * 1000
            }
          >
            EDITAR
          </button>
        </td>
      )}
      {localStorage.getItem("rol") == "CLIENTE" && (
        <td>
          <button
            className="btn-action btn-delete"
            onClick={censurarValoracion}
            disabled={
              Number(localStorage.getItem("id")) !== usuarioId
            }
          >
            ELIMINAR
          </button>
        </td>
      )}
    </tr>
  );
};

export default Valoracion;
