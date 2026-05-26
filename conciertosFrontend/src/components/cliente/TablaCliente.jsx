import axios from "axios";
import { useEffect, useState } from "react";
import ConciertoTablaCliente from "./ConciertoTablaCliente";

const TablaCliente = () => {
  const [conciertos, setConciertos] = useState([]);
  const [hayCarrito, setHayCarrito] = useState(false);

  async function getConciertos() {
    try {
      const datos = await axios.get("http://localhost:8080/api/conciertos");
      let conciertosFuturos = [];
      datos.data.forEach((concierto) => {
        if (new Date() < new Date(concierto.fecha)) {
          conciertosFuturos.push(concierto);
        }
      });
      setConciertos(conciertosFuturos);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getConciertos();
    if (localStorage.getItem("carro")) {
      setHayCarrito(true);
    }
  }, []);

  return (
    <div>
      <div className="table-container">
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
          }}
        >
          <h1>Nuestros conciertos</h1>

          {hayCarrito && (
            <a href="/carro">
              <button
                className="btn-action btn-tipos"
                style={{
                  position: "absolute",
                  right: "1em",
                }}
              >
                Carro
              </button>
            </a>
          )}
          <a href="/historial">
              <button
                className="btn-action btn-tipos"
                style={{
                  position: "absolute",
                  left: "1em",
                }}
              >
                Historial de compras
              </button>
            </a>
        </div>

        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Recinto</th>
              <th>Precio Base</th>
              <th>Entradas Libres</th>
            </tr>
          </thead>

          <tbody>
            {conciertos.length > 0 &&
              conciertos.map((concierto) => (
                <ConciertoTablaCliente
                  key={concierto.id}
                  id={concierto.id}
                  nombre={concierto.nombre}
                  fecha={concierto.fecha}
                  recintoId={concierto.recintoId}
                  precio={concierto.precioBase + "€"}
                  funcion={setHayCarrito}
                ></ConciertoTablaCliente>
              ))}
          </tbody>
        </table>
        {conciertos.length == 0 && <span>No hay conciertos</span>}
      </div>
    </div>
  );
};

export default TablaCliente;
