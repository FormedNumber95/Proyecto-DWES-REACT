import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormuAddValoracion = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [valoracion, setValoracion] = useState({
    usuarioId: Number(localStorage.getItem("id")),
    conciertoId: id,
  });

  async function postValoracion() {
    let error = "";
    if (
      valoracion.comentario == null ||
      valoracion.comentario.trim() == "" ||
      valoracion.puntuacion == null ||
      valoracion.puntuacion.trim() == ""
    ) {
      alert("Debes completar todos los campos del formulario");
    } else {
      if (valoracion.puntuacion < 0 || valoracion.puntuacion > 10) {
        error += "La valoracion debe estar entre el 0 y el 10\n";
      }
      if (error == "") {
        try {
          await axios.post(
            "http://localhost:8080/api/valoraciones",
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

  async function crearValoracion(event) {
    event.preventDefault();
    await postValoracion();
  }

  useEffect(() => {
    if (localStorage.getItem("rol") != "CLIENTE") {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="table-container">
        <div className="form-add-container">
          <h3>Añadir nueva valoracion</h3>
          <form action="" method="post" className="form-add">
            <div className="form-group">
              <label htmlFor="comentario">Comentario</label>
              <input
                id="comentario"
                type="text"
                required
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
                onChange={(ev) =>
                  setValoracion({ ...valoracion, puntuacion: ev.target.value })
                }
              />
            </div>
            <div className="form-button">
              <button onClick={crearValoracion}>AÑADIR VALORACION</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormuAddValoracion;
