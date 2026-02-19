import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FormuEdit from '../components/FormuEdit'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import FormuEditTiposEntrada from '../components/FormuEditTiposEntrada';


const EditorTipoEntrada = () => {
    let navigate = useNavigate();

    const { id } = useParams();
    const [tipo, setTipo] = useState({id:0,cupoMaximo:0,nombre:"",precio:0,conciertoId:1})

    async function getTiposEntrada() {
        try {
            const datos = await axios.get("http://localhost:8080/api/tipos-entrada/" + id)
            setTipo(datos.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTiposEntrada()
        if (localStorage.getItem("usuario") != "ADMIN" && localStorage.getItem("usuario") != "PROMOTOR") {
            navigate("/");
        }
    }, [])

    return (
        <div className="editor-container">
            <Navbar />
            <FormuEditTiposEntrada
                id={tipo.id}
                cupoMaximo={tipo.cupoMaximo}
                nombre={tipo.nombre}
                precio={tipo.precio}
                conciertoId={tipo.conciertoId}
            />
        </div>
    )

}

export default EditorTipoEntrada