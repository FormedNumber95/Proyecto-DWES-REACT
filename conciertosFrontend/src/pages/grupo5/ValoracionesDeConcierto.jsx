import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Valoracion from "../../components/grupo5/Valoracion";

const ValoracionesDeConcierto = () => {
  let navigate = useNavigate();
  const [valoraciones, setValoraciones] = useState([]);
  const [usuario, setUsuario] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const { id } = useParams();

  async function getValoraciones() {
    try {
      const datos = await axios.get(
        "http://localhost:8080/api/conciertos/" + id + "/valoraciones",
      );
      setValoraciones(datos.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getClientes() {
    try {
      const data = await axios.get("http://localhost:8090/api/usuarios");
      let usuariosTodos = data.data;
      let usuariosClientes = usuariosTodos.filter(
        (usuario) => usuario.rol === "CLIENTE",
      );
      setUsuarios(usuariosClientes);
      if(usuariosClientes.length>0){
        setUsuario(usuariosClientes[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function verValoracionesDeUsuario(event) {
    event.preventDefault();
    navigate("/valoracionesUsuario/" + usuario);
  }

  useEffect(() => {
    if (
      localStorage.getItem("rol") != "ADMIN" &&
      localStorage.getItem("rol") != "CLIENTE"
    ) {
      navigate("/");
    }
    getValoraciones();
    getClientes();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="table-container">
        <h1>Conciertos pasados</h1>
        <div className="form-add-container">
          <h3>Ver valoraciones de usuario</h3>
          <form method="post" className="form-add">
            <select
              name="select"
              id="select"
              onChange={(e) => setUsuario(Number(e.target.value))}
            >
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre}
                </option>
              ))}
            </select>
            <div className="form-button">
              <button className="btn-action btn-delete" onClick={verValoracionesDeUsuario}>
                Ver valoraciones
              </button>
            </div>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>Comentario</th>
              <th>Fecha</th>
              <th>Puntuacion</th>
              {localStorage.getItem("rol") == "ADMIN" && <th>Censurar</th>}
            </tr>
          </thead>

          <tbody>
            {valoraciones.length > 0 &&
              valoraciones.map((valoracion) => (
                <Valoracion
                  key={valoracion.id}
                  comentario={valoracion.comentario}
                  fecha={valoracion.fecha}
                  puntuacion={valoracion.puntuacion}
                  id={valoracion.id}
                ></Valoracion>
              ))}
            {valoraciones.length == 0 && (
              <tr>
                <td colSpan={10}>No hay valoraciones</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ValoracionesDeConcierto;
