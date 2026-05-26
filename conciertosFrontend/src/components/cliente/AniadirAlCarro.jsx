import React from "react";

const AniadirAlCarro = ({ id, cantidad, funcion, cancelado }) => {
  function aniadirAlCarro(id) {
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

    if (!items.get(id)) {
      items.set(id, 0);
    }
    if (items.get(id) == cantidad) {
      return;
    }
    items.set(id, items.get(id) + 1);
    let strGuardar = "";
    Array.from(items).map(
      ([id, cantidad]) => (strGuardar += id + ":" + cantidad + ","),
    );
    strGuardar = strGuardar.substring(0, strGuardar.length - 1);
    localStorage.setItem("carro", strGuardar);
    funcion(strGuardar.length > 0);
  }

  return (
    <button
      className="btn-add-actuacion"
      style={{ padding: "1em" }}
      onClick={() => aniadirAlCarro(id)
      }
      disabled={cancelado}
    >
      Añadir al carro
    </button>
  );
};

export default AniadirAlCarro;
