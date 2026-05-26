import axios from "axios";
import { useEffect, useState } from "react";

const EntradaTablaCarro = ({ id, cantidad, funcion, cambiarTotalCompra }) => {
  const [concierto, setConcierto] = useState({});
  const [tipoEntrada, setTipoEntrada] = useState({});
  const [maximoDeEntradas, setMaximoDeEntradas] = useState(
    100,
  );

  async function obtenerInfo() {
    try {
      const tipoEntrada = await axios.get(
        "http://localhost:8080/api/tipos-entrada/" + id,
      );
      setTipoEntrada(tipoEntrada.data);
      const concierto = await axios.get(
        "http://localhost:8080/api/conciertos/" + tipoEntrada.data.conciertoId,
      );
      setConcierto(concierto.data);
    } catch (error) {
      console.error(error);
    }
  }

  function eliminarEntradas() {
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
    items.delete(id);

    let strGuardar = "";
    Array.from(items).map(
      ([id, cantidad]) => (strGuardar += id + ":" + cantidad + ","),
    );
    strGuardar = strGuardar.substring(0, strGuardar.length - 1);
    cambiarTotalCompra((total) => total - tipoEntrada.precio * cantidad);
    funcion(Math.random());
    localStorage.setItem("carro", strGuardar);
  }

  function editarEntrada(value) {
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
    items.set(id, value);
    let strGuardar = "";
    Array.from(items).map(
      ([id, cantidad]) => (strGuardar += id + ":" + cantidad + ","),
    );
    strGuardar = strGuardar.substring(0, strGuardar.length - 1);
    cambiarTotalCompra((total) => total - tipoEntrada.precio * cantidad);
    funcion(Math.random());
    localStorage.setItem("carro", strGuardar);
  }

  async function obtenerMaximoDeEntradas() {
    const entradasDeTipo = await axios.get(
      "http://localhost:8080/api/entradas/tipoEntrada/" + id,
    );
    const tipoEntrada = await axios.get(
      "http://localhost:8080/api/tipos-entrada/" + id,
    );
    let tipoEntradaData = tipoEntrada.data;
    let entradas = entradasDeTipo.data;
    let cant = 0;
    if (entradas) {
      entradas.forEach((entrada) => {
        cant += entrada.cantidad;
      });
    }
    setMaximoDeEntradas(tipoEntradaData.cupoMaximo - cant);
    cambiarTotalCompra((total) =>
      isNaN(total + tipoEntradaData.precio * cantidad)
        ? 0
        : total + tipoEntradaData.precio * cantidad,
    );
  }

  useEffect(() => {
    obtenerInfo();
    obtenerMaximoDeEntradas();
  }, [cantidad]);

  return (
    <tr>
      <td>{concierto.nombre}</td>
      <td>{tipoEntrada.nombre}</td>
      <td>
        <select name="select" id="select" onChange={() => editarEntrada(event.target.value)} value={cantidad}>
          {Array.from({ length: maximoDeEntradas }, (_, i) =>  1+i).map(
            (numero) => (
              <option key={numero} value={numero} >
                {numero}
              </option>
            ),
          )}
        </select>
      </td>
      <td>{tipoEntrada.precio}</td>
      <td>
        {isNaN(tipoEntrada.precio * cantidad)
          ? ""
          : tipoEntrada.precio * cantidad}
      </td>
      <td>
        <button className="btn-action btn-delete" onClick={eliminarEntradas}>
          ELIMINAR
        </button>
      </td>
    </tr>
  );
};

export default EntradaTablaCarro;
