import axios from "axios";
import React from "react";

const Valoracion = ({ comentario, fecha, puntuacion, id }) => {

    async function borrarValoracion(){
        try{
            await axios.delete("http://localhost:8080/api/valoraciones/"+id);
        }catch(error){
            console.error(error);
        }
    }

    async function censurarValoracion(event){
        event.preventDefault();
        borrarValoracion();
        location.reload();
    }

  return (
    <tr>
      <td>{comentario}</td>
      <td>{fecha}</td>
      <td>{puntuacion}</td>
      {localStorage.getItem("rol") == "ADMIN" && (
        <td>
          <button className="btn-action btn-delete" onClick={censurarValoracion}>CENSURAR</button>
        </td>
      )}
    </tr>
  );
};

export default Valoracion;
