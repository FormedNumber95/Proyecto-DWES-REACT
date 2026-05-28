

const AniadirProductoAlCarro = ({ nombre, precio, stock, id, funcion }) => {
  function aniadirAlCarro(id) {
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

    if (!items.get(id)) {
      items.set(id, 0);
    }
    if (items.get(id) == stock) {
      return;
    }
    items.set(id, items.get(id) + 1);
    let strGuardar = "";
    Array.from(items).map(
      ([id, cantidad]) => (strGuardar += id + ":" + cantidad + ","),
    );
    strGuardar = strGuardar.substring(0, strGuardar.length - 1);
    localStorage.setItem("carroProductos", strGuardar);
    funcion(strGuardar.length > 0);
  }

  return (
    <tr>
      <td>{nombre}</td>
      <td>{precio}</td>
      <td>{stock}</td>
      <td>
        <button
          className="btn-action btn-save"
          onClick={() => aniadirAlCarro(id)}
        >
          Añadir al carro
        </button>
      </td>
    </tr>
  );
};

export default AniadirProductoAlCarro;
