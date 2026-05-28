import axios from "axios";
import { useState } from "react";

const FormuAddProducto = ({ idConcierto }) => {
  const [producto, setProducto] = useState({ conciertoId: idConcierto });

  async function crearProducto(event) {
    event.preventDefault();
    await postProducto();
  }

  async function postProducto() {
    let error = "";
    if (
      producto.nombre == null ||
      producto.nombre.trim() == "" ||
      producto.stock == null ||
      producto.stock.trim() == "" ||
      producto.precio == null ||
      producto.precio.trim() == ""
    ) {
      alert("Debes completar todos los campos del formulario");
    } else {
      if (producto.stock < 0) {
        error += "El stock no puede ser negativo\n";
      }
      if (producto.precio < 0) {
        error += "El precio del producto no puede ser negativo\n";
      } else {
        if (!Number.isInteger(producto.precio * 100)) {
          error += "El precio puede contener hasta 2 decimales\n";
        }
      }
      if (error == "") {
        try {
          console.log(producto);
          await axios.post("http://localhost:8080/api/productos", producto);
          location.reload();
        } catch (error) {
          console.error(error);
        }
      } else {
        alert(error);
      }
    }
  }

  return (
    <div className="form-add-container">
      <h3>Añadir Nuevo Producto</h3>
      <form action="" method="post" className="form-add">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del producto"
            required
            onChange={(ev) =>
              setProducto({ ...producto, nombre: ev.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            min="0"
            placeholder="Stock del producto"
            required
            onChange={(ev) =>
              setProducto({ ...producto, stock: ev.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio (€)</label>
          <input
            id="precio"
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            onChange={(ev) =>
              setProducto({ ...producto, precio: ev.target.value })
            }
          />
        </div>

        <div className="form-button">
          <button onClick={crearProducto}>Añadir Concierto</button>
        </div>
      </form>
    </div>
  );
};

export default FormuAddProducto;
