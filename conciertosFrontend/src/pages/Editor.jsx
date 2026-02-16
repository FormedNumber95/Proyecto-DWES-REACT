import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FormuEdit from '../components/FormuEdit'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const Editor = () => {
    let navigate = useNavigate();

    const { id } = useParams();
    const [concierto, setConcierto] = useState({});
    async function getConciertoPorId() {
        try {
            const datos = await axios.get("http://localhost:8080/api/conciertos/" + id)
            setConcierto(datos.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getConciertoPorId()
        if (localStorage.getItem("usuario") != "ADMIN" && localStorage.getItem("usuario") != "PROMOTOR") {
            navigate("/");
        }
    }, [])

    return (
        <div className="editor-container">
            <Navbar />
            <FormuEdit
                id={id}
                estado={concierto.estado}
                fecha={concierto.fecha}
                nombre={concierto.nombre}
                precio={concierto.precioBase}
                recintoId={concierto.recintoId}
            />
        </div>
    )

}

export default Editor