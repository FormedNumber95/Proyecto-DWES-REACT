import axios from "axios";
import { useEffect, useState } from "react";

const EntradaTablaCarroProducto = ({
  cantidad,
  id,
  funcion,
  cambiarTotalCompra,
}) => {
  const [producto, setProducto] = useState({});
  const [maximoProductos, setMaximoProductos] = useState(100);

  function eliminarProducto() {
    let items = localStorage.getItem("carroProductos");
    if (items) {
      items = items.split(",");
      let mapa = new Map();
      items.forEach((item) => {
        item = item.split(":");
        mapa.set(parseInt(item[0]), parseInt(item[1]));
      });
      items = mapa;
    } else {
      items = new Map();
    }
    items.delete(id);

    let strGuardar = "";
    Array.from(items).map(
      ([id, cantidad]) => (strGuardar += id + ":" + cantidad + ","),
    );
    strGuardar = strGuardar.substring(0, strGuardar.length - 1);
    cambiarTotalCompra((total) => total - producto.precio * cantidad);
    funcion(Math.random());
    localStorage.setItem("carroProductos", strGuardar);
  }

  function editrarProducto(value) {
    let items = localStorage.getItem("carroProductos");
    if (items) {
      items = items.split(",");
      let mapa = new Map();
      items.forEach((item) => {
        item = item.split(":");
        mapa.set(parseInt(item[0]), parseInt(item[1]));
      });
      items = mapa;
    } else {
      items = new Map();
    }
    items.set(id, value);
    let strGuardar = "";
    Array.from(items).map(
      ([id, cantidad]) => (strGuardar += id + ":" + cantidad + ","),
    );
    strGuardar = strGuardar.substring(0, strGuardar.length - 1);
    cambiarTotalCompra((total) => total - producto.precio * cantidad);
    funcion(Math.random());
    localStorage.setItem("carroProductos", strGuardar);
  }

  async function obtenerInfo() {
    try {
      const prod = await axios.get("http://localhost:8080/api/productos/" + id);
      setProducto(prod.data);
      setMaximoProductos(prod.data.stock);
      cambiarTotalCompra((total) =>
        isNaN(total + prod.data.precio * cantidad)
          ? 0
          : total + prod.data.precio * cantidad,
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    obtenerInfo();
  }, [cantidad]);

  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>
        <select
          name="select"
          id="select"
          onChange={() => editrarProducto(event.target.value)}
          value={cantidad}
        >
          {Array.from({ length: maximoProductos }, (_, i) => 1 + i).map(
            (numero) => (
              <option key={numero} value={numero}>
                {numero}
              </option>
            ),
          )}
        </select>
      </td>
      <td>{producto.precio}</td>
      <td>
        {isNaN(producto.precio * cantidad) ? "" : producto.precio * cantidad}
      </td>
      <td>
        <button className="btn-action btn-delete" onClick={eliminarProducto}>
          ELIMINAR
        </button>
      </td>
    </tr>
  );
};

export default EntradaTablaCarroProducto;
