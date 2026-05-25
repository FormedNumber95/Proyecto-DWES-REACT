import axios from "axios";
import { useEffect, useState } from "react";

const ActuacionCliente = ({idArtista}) => {
  const [artista, setArtista] = useState([]);
  async function getArtista() {
    try {
      const datos = await axios.get(
        "http://localhost:8090/api/artistas/" + idArtista,
      );
      setArtista(datos.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getArtista();
  }, [idArtista]);


  return (
    <tr className="actuacion-row">
      <td className="artista-nombre">{artista.nombre}</td>
    </tr>
  );
};

export default ActuacionCliente;
