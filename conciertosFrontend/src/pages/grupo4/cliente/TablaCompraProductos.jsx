import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import AniadirProductoAlCarro from "../../../components/grupo4/cliente/AniadirProductoAlCarro";

const TablaCompraProductos = () => {
  let navigate = useNavigate();
  const { idConcierto } = useParams();
  const [productos, setProductos] = useState([]);
  const [hayCarrito, setHayCarrito] = useState(false);

  async function getProductos() {
    try {
      const data = await axios.get(
        "http://localhost:8080/api/productos/conciertos/" + idConcierto,
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
    getProductos();
    if(localStorage.getItem("carroProductos")){
        setHayCarrito(true);
    }
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
          <h1>Productos del concierto</h1>
          {hayCarrito && (
            <a href="/carroProductos">
              <button
                className="btn-action btn-tipos"
                style={{
                  position: "absolute",
                  right: "1em",
                }}
              >
                Carro
              </button>
            </a>
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio (€)</th>
              <th>Stock</th>
              <th>Añadir al carro</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 &&
              productos.map((producto) => (
                <AniadirProductoAlCarro
                  id={producto.id}
                  nombre={producto.nombre}
                  precio={producto.precio}
                  stock={producto.stock}
                  key={producto.id}
                  funcion={setHayCarrito}
                ></AniadirProductoAlCarro>
              ))}
            {productos.length == 0 && (
              <tr>
                <td colSpan={4}>El concierto no tiene productos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaCompraProductos;
