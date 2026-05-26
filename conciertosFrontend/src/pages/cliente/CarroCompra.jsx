import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EntradaTablaCarro from "../../components/cliente/EntradaTablaCarro";

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

  useEffect(() => {
    if (localStorage.getItem("rol") != "CLIENTE") {
      navigate("/");
    }
    obtenerEntradasCarro();
  }, [actualizate]);
  return (
    <div>
      <div className="table-container">
        <h1>Carro</h1>
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
        {entradas.size > 0 && <button className="btn-action btn-tipos">Pagar</button>}
      </div>
    </div>
  );
};

export default CarroCompra;
