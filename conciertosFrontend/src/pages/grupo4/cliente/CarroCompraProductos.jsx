import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import EntradaTablaCarroProducto from "../../../components/grupo4/cliente/EntradaTablaCarroProducto";

const CarroCompraProductos = () => {
  let navigate = useNavigate();
  const [productos, setProductos] = useState(new Map());
  const [actualizate, setActualizate] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);

  function obtenerProductosCarro() {
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
    setProductos(items);
  }

  async function pagar() {
    let items = localStorage.getItem("carroProductos");
    items = items.split(",");
    let arr = [];
    items.forEach((item) => {
      item = item.split(":");
      let obj = {
        productoId: parseInt(item[0]),
        cantidad: parseInt(item[1]),
        usuarioId: parseInt(localStorage.getItem("id")),
      };
      arr.push(obj);
    });
    // console.log(arr);
    let pedido=await axios.post("http://localhost:8080/api/pedidos",{usuarioId:localStorage.getItem("id")})
    // console.log(pedido);
    await axios.post("http://localhost:8080/api/compras/productos/"+pedido.data.id, arr);
    localStorage.removeItem("carroProductos");
    location.href = "http://localhost:5173/conciertosFuturos";
  }

  useEffect(() => {
    if (localStorage.getItem("rol") != "CLIENTE") {
      navigate("/");
    }
    obtenerProductosCarro();
  }, [actualizate]);
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
          <h1>Carro</h1>

          <a href="/conciertosFuturos">
            <button
              className="btn-action btn-tipos"
              style={{
                position: "absolute",
                left: "1em",
              }}
            >
              Atras
            </button>
          </a>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio por entrada</th>
              <th>Total</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {productos.size > 0 &&
              Array.from(productos).map(([id, cantidad]) => (
                <EntradaTablaCarroProducto
                  cantidad={cantidad}
                  id={id}
                  key={id}
                  funcion={setActualizate}
                  cambiarTotalCompra={setTotalCompra}
                ></EntradaTablaCarroProducto>
              ))}
            {productos.size > 0 && (
              <tr>
                <td colSpan={4}>TOTAL DE LA COMPRA</td>
                <td colSpan={2}>{totalCompra}</td>
              </tr>
            )}
            {productos.size == 0 && (
              <tr>
                <td colSpan={5}>No hay entradas en el carro</td>
              </tr>
            )}
          </tbody>
        </table>
        {productos.size > 0 && (
          <button className="btn-action btn-tipos" onClick={pagar}>
            Pagar
          </button>
        )}
      </div>
    </div>
  );
};

export default CarroCompraProductos;
