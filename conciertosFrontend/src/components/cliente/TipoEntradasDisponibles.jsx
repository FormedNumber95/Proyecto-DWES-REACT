
const TipoEntradasDisponibles = ({nombre,cantidad}) => {


  return (
    <tr className="actuacion-row">
      <td className="artista-nombre">{nombre}</td>
      <td className="artista-nombre">{cantidad}</td>
    </tr>
  );
};

export default TipoEntradasDisponibles;
