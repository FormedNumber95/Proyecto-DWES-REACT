import axios from "axios";

const EntradaTablaBilletes = ({ id, lugarSalida, fechaCompra, horaSalida, tipoTransporte }) => {
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

  async function cancelarBillete() {
    try {
      await axios.delete("http://localhost:8080/api/billetes/" + id);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <tr key={id}>
      <td>{lugarSalida}</td>
      <td>{tipoTransporte}</td>
      <td>{formatFecha(fechaCompra)}</td>
      <td>
        <button
          className="btn-action btn-delete"
          disabled={new Date() > new Date(horaSalida)}
          onClick={cancelarBillete}
        >
          CANCELAR
        </button>
      </td>
    </tr>
  );
};

export default EntradaTablaBilletes;
