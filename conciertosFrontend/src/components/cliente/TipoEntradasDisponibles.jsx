const TipoEntradasDisponibles = ({ id, nombre, cantidad }) => {
  function aniadirAlCarro(id) {
    let items = localStorage.getItem("carro");
    //tener un array para el carrito
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

    console.log(items);
    if (!items.get(id)) {
      items.set(id, 0);
    }
    items.set(id,items.get(id)+1);
    console.log(items);
    let strGuardar = "";
    Array.from(items).map(
      ([id, cantidad]) => (strGuardar += id + ":" + cantidad + ","),
    );
    strGuardar = strGuardar.substring(0, strGuardar.length - 1);
    localStorage.setItem("carro", strGuardar);
  }

  return (
    <tr className="actuacion-row">
      <td className="artista-nombre">{nombre}</td>
      <td className="artista-nombre">{cantidad}</td>
      <td>
        <button
          className="btn-add-actuacion"
          style={{ padding: "1em" }}
          onClick={() => aniadirAlCarro(id)}
        >
          Añadir al carro
        </button>
      </td>
    </tr>
  );
};

export default TipoEntradasDisponibles;
