import { useEffect,  } from "react";
import TablaCliente from "../../components/cliente/TablaCliente";
import { useNavigate } from 'react-router-dom'
import Navbar from "../../components/Navbar";

const HomeCliente = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("rol") != "CLIENTE"
    ) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <TablaCliente></TablaCliente>
    </div>
  );
};

export default HomeCliente;
