import axios from 'axios'
import React, { useEffect, useState } from 'react'


const FormuEdit = ({ id, fecha, nombre, recintoId, precio, estado }) => {

    const [recintos, setRecintos] = useState([])
    async function getRecintos() {
        try {
            const datos = await axios.get("http://localhost:8090/api/recintos")
            setRecintos(datos.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getRecintos()
    }, [])


    return (
        <form action="" method='post'>
            <input type="date" placeholder='Fecha' value={fecha} required />
            <input type="text" placeholder='Nombre' value={nombre} required />
            <select name="recinto" id="recinto">
                {recintos.map((recinto) => (
                    <option value={recinto.id}>{recinto.nombre}</option>
                ))}
            </select>
            <input type="number" placeholder='Precio' step='0.01' min='0' value={precio} required />
            <select name="estado" id="estado">
                <option value="PROGRAMADO">PROGRAMADO</option>
                <option value="CANCELADO">CANCELADO</option>
                <option value="FINALIZADO">FINALIZADO</option>
            </select>
            <button>Editar</button>
        </form >
    )
}

export default FormuEdit