import axios from "axios";
import { useEffect, useState } from "react";
import TablaCliente from "../../components/cliente/TablaCliente";
import { useNavigate } from 'react-router-dom'

const HomeCliente = () => {
  let navigate = useNavigate();
  const [conciertos, setConciertos] = useState([]);
  async function getConciertos() {
    try {
      const datos = await axios.get("http://localhost:8080/api/conciertos");
      setConciertos(datos.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (
      localStorage.getItem("rol") != "CLIENTE"
    ) {
      navigate("/");
    }
    getConciertos();
  }, []);

  return (
    <div>
      <TablaCliente></TablaCliente>
    </div>
  );
};

export default HomeCliente;
