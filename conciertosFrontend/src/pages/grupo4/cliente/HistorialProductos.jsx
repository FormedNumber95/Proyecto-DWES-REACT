import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HistorialProductos = () => {
  const [productos, setProductos] = useState([]);
  let navigate = useNavigate();

  async function obtenerProductosUsuario() {
    try {
      const data = await axios.get(
        "http://localhost:8080/api/productos/usuario/" +
          localStorage.getItem("id"),
      );
      setProductos(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("rol") != "CLIENTE") {
      navigate("/");
    }
    obtenerProductosUsuario();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="table-container">
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
          }}
        >
          <h1>Entradas compradas</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 &&
              productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                </tr>
              ))}
            {productos.length == 0 && (
              <tr>
                <td colSpan={3}>No has realizado ninguna compra</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialProductos;
