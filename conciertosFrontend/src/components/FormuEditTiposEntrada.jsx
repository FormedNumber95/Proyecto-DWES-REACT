import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FormuEditTiposEntrada = ({ conciertoId, id, nombre, precio, cupoMaximo }) => {

    let navigate = useNavigate()

    const [tipo, setTipo] = useState({})
    const [tipos, setTipos] = useState({})


    useEffect(() => {
        let filtro = tipos.filter(t => t.id === id).length === 1
        if (filtro.length != 0) {
            setTipo({ ...tipo })
        }
    })

    async function putConcierto() {
        try {
            const datos = await axios.put("http://localhost:8080/api/conciertos/" + id, concierto)
            navigate("/home")
        } catch (error) {
            console.error(error)
        }
    }

    async function editarConcierto(ev) {
        ev.preventDefault();
        await putConcierto();

    }
    return (
        <div>
            <form action="" method='post'>
                <input type="text" placeholder='Nombre' defaultValue={nombre} required />
                <input type="number" placeholder='Precio' step='0.01' min='0' defaultValue={precio} required />
                <input type="number" placeholder='Cupo Máximo' defaultValue={cupoMaximo} required />
                <button>Editar</button>
            </form >
        </div>
    )
}

export default FormuEditTiposEntrada