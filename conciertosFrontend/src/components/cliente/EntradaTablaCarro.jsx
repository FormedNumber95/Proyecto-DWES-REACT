import axios from "axios";
import { useEffect, useState } from "react";

const EntradaTablaCarro = ({ id, cantidad, funcion }) => {
  const [concierto, setConcierto] = useState({});
  const [tipoEntrada, setTipoEntrada] = useState({});

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
    funcion(Math.random());
    localStorage.setItem("carro", strGuardar);
  }

  useEffect(() => {
    obtenerInfo();
  }, []);

  return (
    <tr>
      <td>{concierto.nombre}</td>
      <td>{tipoEntrada.nombre}</td>
      <td>{cantidad}</td>
      <td>{tipoEntrada.precio}</td>
      <td>
        {isNaN(tipoEntrada.precio * cantidad)
          ? ""
          : tipoEntrada.precio * cantidad}
      </td>
      <td>
        <a>
          <button className="btn-action btn-editar">EDITAR</button>
        </a>
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
