import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Actuacion = ({ id, idArtista,disabled }) => {

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

    async function eliminarActuacion() {
        try {
            await axios.delete("http://localhost:8080/api/actuaciones/" + id)
            location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <tr className="actuacion-row">
            <td className="artista-nombre">
                {artista.nombre}
            </td>
            <td className="actions-column">
                <button className='btn-action btn-delete' disabled={disabled} onClick={eliminarActuacion}>Eliminar</button>
            </td>
        </tr>
    )

}

export default Actuacion