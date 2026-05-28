import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormuEditProducto = ({ stock, precio, nombre, conciertoId, id }) => {
  let navigate = useNavigate();
  const [producto, setProducto] = useState({});

  async function editarProducto(event) {
    event.preventDefault();
    await putProducto();
  }

  async function putProducto() {
    try {
      await axios.put("http://localhost:8080/api/productos/" + id, producto);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  }

  async function getProducto() {
    try {
      const datos = await axios.get(
        "http://localhost:8080/api/productos/" + id,
      );
      setProducto(datos.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("rol") != "ADMIN") {
      navigate("/");
    }
    getProducto();
  }, []);

  return (
    <div className="form-edit-container">
      <h2>Modificar Producto</h2>
      <form action="" method="post" className="form-edit">
        <div className="form-group">
          <label htmlFor="nombre">Nombre del producto</label>
          <input
            id="nombre"
            type="text"
            defaultValue={nombre}
            required
            onChange={(ev) =>
              setProducto({ ...producto, nombre: ev.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio Final (€)</label>
          <input
            id="precio"
            type="number"
            step="0.01"
            min="0"
            defaultValue={precio}
            required
            onChange={(ev) =>
              setProducto({ ...producto, precio: ev.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="cupo">Stock</label>
          <input
            id="cupo"
            type="number"
            defaultValue={stock}
            required
            onChange={(ev) =>
              setProducto({ ...producto, stock: ev.target.value })
            }
          />
        </div>

        <div className="form-actions">
          <button
            className="btn-cancel"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
          <button className="btn-save" onClick={editarProducto}>
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormuEditProducto;
