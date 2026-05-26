import AniadirAlCarro from "./AniadirAlCarro";

const TipoEntradasDisponibles = ({ id, nombre, cantidad, funcion, cancelado }) => {

  return (
    <tr className="actuacion-row">
      <td className="artista-nombre">{nombre}</td>
      <td className="artista-nombre">{cantidad}</td>
      <td>
        <AniadirAlCarro id={id} cantidad={cantidad} funcion={funcion} cancelado={cancelado}></AniadirAlCarro>
      </td>
    </tr>
  );
};

export default TipoEntradasDisponibles;
