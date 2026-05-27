import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import EntradaTablaBilletes from "../../../components/grupo3/cliente/EntradaTablaBilletes";

const TablaBilletes = () => {
  let navigate = useNavigate();
  const [billetes, setBilletes] = useState([]);

  async function getBilletes() {
    try {
      const data = await axios.get(
        "http://localhost:8080/api/billetes/usuario/" +
          localStorage.getItem("id"),
      );

      const billetesData = data.data;

      const billetesConLugar = await Promise.all(
        billetesData.map(async (billete) => {
          const transporte = await axios.get(
            "http://localhost:8080/api/transportes/" + billete.transporteId,
          );
          return {
            ...billete,
            lugarSalida: transporte.data.lugarSalida,
            horaSalida: transporte.data.horaSalida,
          };
        }),
      );

      setBilletes(billetesConLugar);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("rol") != "CLIENTE") {
      navigate("/");
    }
    getBilletes();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
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
          <h1>Billetes</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Transporte</th>
              <th>Fecha</th>
              <th>Cancelar</th>
            </tr>
          </thead>
          <tbody>
            {billetes.length > 0 &&
              billetes.map((billete) => (
                <EntradaTablaBilletes
                  key={billete.id}
                  fechaCompra={billete.fechaCompra}
                  horaSalida={billete.horaSalida}
                  id={billete.id}
                  lugarSalida={billete.lugarSalida}
                ></EntradaTablaBilletes>
              ))}
            {billetes.length == 0 && (
              <tr>
                <td colSpan={3}>No has comprado ningun billete</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaBilletes;
