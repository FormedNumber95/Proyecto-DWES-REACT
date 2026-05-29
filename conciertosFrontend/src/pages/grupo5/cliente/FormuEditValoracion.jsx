import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";

const FormuEditValoracion = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [valoracion, setValoracion] = useState({});

  async function obtenerValoracion() {
    try{
        const data=await axios.get("http://localhost:8080/api/valoraciones/"+id);
        setValoracion(data.data);
    }catch(error){
        console.error(error);
    }
  }

  async function putValoracion() {
    let error = "";
    console.log(valoracion);
    if (
      valoracion.comentario == null ||
      valoracion.comentario.trim() == "" ||
      valoracion.puntuacion == null
    ) {
      alert("Debes completar todos los campos del formulario");
    } else {
      if (valoracion.puntuacion < 0 || valoracion.puntuacion > 10) {
        error += "La valoracion debe estar entre el 0 y el 10\n";
      }
      if (error == "") {
        try {
          await axios.put(
            "http://localhost:8080/api/valoraciones/"+id,
            valoracion,
          );
          navigate(-1);
        } catch (error) {
          console.error(error);
        }
      } else {
        alert(error);
      }
    }
  }

  async function editarValoracion(event){
    event.preventDefault();
    putValoracion();
  }

  useEffect(() => {
    if (localStorage.getItem("rol") != "CLIENTE") {
      navigate("/");
    }
    obtenerValoracion();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="table-container">
        <div className="form-add-container">
          <h3>Editar valoracion</h3>
          <form action="" method="post" className="form-add">
            <div className="form-group">
              <label htmlFor="comentario">Comentario</label>
              <input
                id="comentario"
                type="text"
                required
                defaultValue={valoracion.comentario}
                onChange={(ev) =>
                  setValoracion({ ...valoracion, comentario: ev.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="puntuacion">Puntuacion</label>
              <input
                id="puntuacion"
                type="number"
                min="0"
                max="10"
                required
                defaultValue={valoracion.puntuacion}
                onChange={(ev) =>
                  setValoracion({ ...valoracion, puntuacion: ev.target.value })
                }
              />
            </div>
            <div className="form-button">
              <button onClick={editarValoracion}>EDITAR VALORACION</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormuEditValoracion;
