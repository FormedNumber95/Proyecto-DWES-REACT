import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import FormuEditProducto from "../../../components/grupo4/admin/FormuEditProducto";

const EditarProducto = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [producto, setProducto] = useState({});

  async function getProducto() {
    try {
      const datos = await axios.get(
        "http://localhost:8080/api/productos/" + id,
      );
      setProducto(datos.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("rol") != "ADMIN") {
      navigate("/");
    }
    getProducto();
  }, []);

  return (
    <div className="editor-container">
      <Navbar></Navbar>
      <FormuEditProducto
        id={id}
        conciertoId={producto.conciertoId}
        nombre={producto.nombre}
        precio={producto.precio}
        stock={producto.stock}
      ></FormuEditProducto>
    </div>
  );
};

export default EditarProducto;
