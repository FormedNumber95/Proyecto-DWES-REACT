import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import ConciertoPasado from "../../../components/grupo5/admin/ConciertoPasado";

const TablaConciertosPasados = () => {
  let navigate = useNavigate();
  const [conciertos, setConciertos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(0);

  async function getConciertos() {
    try {
      const datos = await axios.get("http://localhost:8080/api/conciertos");

      const ahora = new Date();

      const conciertosFiltrados = datos.data.filter((concierto) => {
        return new Date(concierto.fecha) < ahora;
      });

      setConciertos(conciertosFiltrados);
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
      if (usuariosClientes.length > 0) {
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
    if (localStorage.getItem("rol") != "ADMIN") {
      navigate("/");
    }
    getConciertos();
    getClientes();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="table-container">
        <h1>Nuestros conciertos</h1>
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
              <button
                className="btn-action btn-delete"
                onClick={verValoracionesDeUsuario}
              >
                Ver valoraciones
              </button>
            </div>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Recinto</th>
              <th>Valoraciones</th>
            </tr>
          </thead>

          <tbody>
            {conciertos.length > 0 &&
              conciertos.map((concierto) => (
                <ConciertoPasado
                  key={concierto.id}
                  id={concierto.id}
                  nombre={concierto.nombre}
                  fecha={concierto.fecha}
                  recintoId={concierto.recintoId}
                ></ConciertoPasado>
              ))}
            {conciertos.length == 0 && (
              <tr>
                <td colSpan={10}>No hay conciertos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaConciertosPasados;
