import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EntradaTablaCarro from "../../components/grupo2/EntradaTablaCarro";
import axios from "axios";
import Navbar from "../../components/Navbar";

const CarroCompra = () => {
  let navigate = useNavigate();
  const [entradas, setEntradas] = useState(new Map());
  const [actualizate, setActualizate] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);

  function obtenerEntradasCarro() {
    let items = localStorage.getItem("carro");
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
    setEntradas(items);
  }

  async function pagar() {
    let items = localStorage.getItem("carro");
    items = items.split(",");
    let arr = [];
    items.forEach((item) => {
      item = item.split(":");
      let obj = {
        tipo_entradaId: parseInt(item[0]),
        cantidad: parseInt(item[1]),
        usuarioId: parseInt(localStorage.getItem("id")),
      };
      arr.push(obj);
    });
    console.log(arr);
    axios.post("http://localhost:8080/api/compras", arr);
    localStorage.removeItem("carro");
    location.href = "http://localhost:5173/conciertosCliente";
  }

  useEffect(() => {
    if (localStorage.getItem("rol") != "CLIENTE") {
      navigate("/");
    }
    obtenerEntradasCarro();
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

          <a href="/conciertosCliente">
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
              <th>Concierto</th>
              <th>Tipo de entrada</th>
              <th>Cantidad</th>
              <th>Precio por entrada</th>
              <th>Total</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {entradas.size > 0 &&
              Array.from(entradas).map(([id, cantidad]) => (
                <EntradaTablaCarro
                  cantidad={cantidad}
                  id={id}
                  key={id}
                  funcion={setActualizate}
                  cambiarTotalCompra={setTotalCompra}
                ></EntradaTablaCarro>
              ))}
            {entradas.size > 0 && (
              <tr>
                <td colSpan={4}>TOTAL DE LA COMPRA</td>
                <td colSpan={2}>{totalCompra}</td>
              </tr>
            )}
            {entradas.size == 0 && (
              <tr>
                <td colSpan={5}>No hay entradas en el carro</td>
              </tr>
            )}
          </tbody>
        </table>
        {entradas.size > 0 && (
          <button className="btn-action btn-tipos" onClick={pagar}>
            Pagar
          </button>
        )}
      </div>
    </div>
  );
};

export default CarroCompra;
