import { useNavigate } from "react-router-dom";


const EntradaTablaConciertosPropios = ({ nombre, fecha, estado, id }) => {
  let navigate = useNavigate();


  const formatFecha = (fechaStr) => {
    const d = new Date(fechaStr);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
      .format(d)
      .replace(",", "");
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>{formatFecha(fecha)}</td>
      <td>{estado}</td>
      <td><button className="btn-action btn-save" onClick={()=>navigate("/comprarProductos/"+id)}>Comprar productos</button></td>
    </tr>
  );
};

export default EntradaTablaConciertosPropios;
