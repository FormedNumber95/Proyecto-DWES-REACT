import axios from "axios";
import { useNavigate } from "react-router-dom";

const EntradaTablaProducto = ({ nombre, precio, stock, id }) => {
  let navigate = useNavigate();

  async function eliminarProducto() {
    try {
      await axios.delete("http://localhost:8080/api/productos/" + id);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <tr>
      <td>{nombre}</td>
      <td>{precio}</td>
      <td>{stock}</td>
      <td>
        <button
          className="btn-action btn-editar"
          onClick={() => navigate("/editarProducto/" + id)}
        >
          Editar
        </button>
      </td>
      <td>
        <button className="btn-action btn-delete" onClick={eliminarProducto}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default EntradaTablaProducto;
