import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import FormuAddProducto from "../../../components/grupo4/admin/FormuAddProducto";

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
                <tr>
                  <td>{producto.nombre}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.stock}</td>
                  <td><button className="btn-action btn-delete">Eliminar</button></td>
                </tr>
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
