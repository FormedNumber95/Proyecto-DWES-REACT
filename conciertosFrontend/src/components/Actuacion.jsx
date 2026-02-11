import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Actuacion = ({ id, idArtista }) => {

    const [artista, setArtista] = useState([])
    async function getArtista() {
        try {
            const datos = await axios.get("http://localhost:8090/api/artistas/" + idArtista)
            setArtista(datos.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getArtista()
    }, [idArtista])

    async function eliminarActuacion(){
        try {
            const datos = await axios.delete("http://localhost:8080/api/actuaciones/"+id)
            location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <li>
            {artista.nombre}
            <button className='btnDel' onClick={eliminarActuacion}>X</button>
        </li>
    )
}

export default Actuacion