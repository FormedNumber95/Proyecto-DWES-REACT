import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import FormuAddProducto from "../../../components/grupo4/admin/FormuAddProducto";
import EntradaTablaProducto from "../../../components/grupo3/admin/EntradaTablaProducto";

const TablaProductos = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [productos, setproductos] = useState([]);

  async function getProductos() {
    try {
      const datos = await axios.get(
        "http://localhost:8080/api/productos/conciertos/" + id,
      );
      setproductos(datos.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("rol") != "ADMIN") {
      navigate("/");
    }
    getProductos();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="table-container">
        <h1>Productos</h1>
        <FormuAddProducto idConcierto={id}></FormuAddProducto>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 &&
              productos.map((producto) => (
                <EntradaTablaProducto key={producto.id} id={producto.id} nombre={producto.nombre} precio={producto.precio} stock={producto.stock}></EntradaTablaProducto>
              ))}
            {productos.length == 0 && (
              <tr>
                <td colSpan={3}>No hay productos para este concierto</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaProductos;
