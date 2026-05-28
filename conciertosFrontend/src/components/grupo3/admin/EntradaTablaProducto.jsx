import axios from "axios";
import React from "react";

const EntradaTablaProducto = ({ nombre, precio, stock, id }) => {
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
        <button className="btn-action btn-delete" onClick={eliminarProducto}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default EntradaTablaProducto;
