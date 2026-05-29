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

  return (
    <tr>
      <td>{comentario}</td>
      <td>{fecha}</td>
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
            disabled={Number(localStorage.getItem("id")) !== usuarioId}
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
          >
            ELIMINAR
          </button>
        </td>
      )}
    </tr>
  );
};

export default Valoracion;
