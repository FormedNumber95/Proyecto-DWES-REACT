import axios from "axios";
import { useEffect, useState } from "react";

const FormuAddTransporte = ({ idConcierto }) => {
  const [transporte, setTransporte] = useState({ conciertoId: idConcierto });
  const [concierto, setConcierto] = useState({});

  async function obtenerinfoConcierto() {
    try {
      const datos = await axios.get(
        "http://localhost:8080/api/conciertos/" + idConcierto,
      );
      setConcierto(datos.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function postTransporte() {
    let error = "";
    if (
      transporte.horaSalida == null ||
      transporte.lugarSalida == null ||
      transporte.lugarSalida.trim() == "" ||
      transporte.tipo == null ||
      transporte.tipo.trim() == "" ||
      transporte.plazas == null ||
      transporte.plazas.trim() == "" ||
      transporte.precio == null ||
      transporte.precio.trim() == ""
    ) {
      alert("Debes completar todos los campos del formulario");
    } else {
      if (new Date(transporte.horaSalida) > new Date(concierto.fecha)) {
        error += "La hora de salida no puede ser posteriror a la del concierto";
      }
      if (transporte.plazas < 1) {
        error += "Las plazas del transporte no pueden ser menores a 1\n";
      }
      if (transporte.precio < 0) {
        error += "El precio del transporte no puede ser negativo\n";
      } else {
        if (!Number.isInteger(transporte.precio * 100)) {
          error += "El precio puede contener hasta 2 decimales\n";
        }
      }
      if (error == "") {
        try {
          console.log(transporte);
          await axios.post("http://localhost:8080/api/transportes", transporte);
          location.reload();
        } catch (error) {
          console.error(error);
        }
      } else {
        alert(error);
      }
    }
  }

  function fechaFormateada(fecha) {
    return fecha.replace("T", " ") + ":00";
  }

  async function crearTransporte(event) {
    event.preventDefault();
    await postTransporte();
  }

  useEffect(() => {
    obtenerinfoConcierto();
  }, []);

  return (
    <div className="form-add-container">
      <h3>Añadir Nuevo Transporte</h3>
      <form action="" method="post" className="form-add">
        <div className="form-group">
          <label htmlFor="fecha">Fecha y Hora</label>
          <input
            id="fecha"
            type="datetime-local"
            required
            onChange={(ev) =>
              setTransporte({
                ...transporte,
                horaSalida: fechaFormateada(ev.target.value),
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="lugarSalida">Lugar de salida</label>
          <input
            id="lugarSalida"
            type="text"
            placeholder="Lugar de salida"
            required
            onChange={(ev) =>
              setTransporte({ ...transporte, lugarSalida: ev.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo">Tipo</label>
          <input
            id="tipo"
            type="text"
            placeholder="Tipo del transporte"
            required
            onChange={(ev) =>
              setTransporte({ ...transporte, tipo: ev.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="plazas">Plazas</label>
          <input
            id="plazas"
            type="number"
            min="0"
            placeholder="Cantidad de plazas"
            required
            onChange={(ev) =>
              setTransporte({ ...transporte, plazas: ev.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio (€)</label>
          <input
            id="precio"
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            onChange={(ev) =>
              setTransporte({ ...transporte, precio: ev.target.value })
            }
          />
        </div>

        <div className="form-button">
          <button onClick={crearTransporte}>Añadir Concierto</button>
        </div>
      </form>
    </div>
  );
};

export default FormuAddTransporte;
