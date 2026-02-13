import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FormuEdit from '../components/FormuEdit'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import FormuEditTiposEntrada from '../components/FormuEditTiposEntrada';


const EditorTipoEntrada = ({conciertoId}) => {
    let navigate = useNavigate();

    const { id } = useParams();



    async function getTiposEntrada() {
        try {
            const datos = await axios.get("http://localhost:8080/api/conciertos/"+conciertoId+"/tipos-entrada")
            setTipos(datos.data)
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
        <div>
            <Navbar />
            <FormuEditTiposEntrada
                id={tipo.id}
                conciertoId={id}
                cupoMaximo={tipo.cupoMaximo} 
                nombre={tipo.nombre} 
                precio={tipo.precio} 
            />
        </div>
    )
}

export default EditorTipoEntrada