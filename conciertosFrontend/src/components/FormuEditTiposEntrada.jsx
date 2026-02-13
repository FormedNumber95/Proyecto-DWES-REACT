import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FormuEditTiposEntrada = ({ id, nombre, precio, cupoMaximo, conciertoId }) => {

    let navigate = useNavigate()
    const [tipo, setTipo] = useState({nombre:nombre, precio:precio, cupoMaximo:cupoMaximo, conciertoId: conciertoId})

    async function putTipoEntrada() {
        try {
            const datos = await axios.put("http://localhost:8080/api/tipos-entrada/" + id, tipo)
            navigate("/home")
        } catch (error) {
            alert("El cupo de entradas no puede superar la capacidad del recinto")
        }
    }

    useEffect(()=>{
        setTipo({nombre:nombre, precio:precio, cupoMaximo:cupoMaximo, conciertoId: conciertoId})
    }, [nombre, precio, cupoMaximo, conciertoId])

    async function editarTipoEntrada(ev) {
        ev.preventDefault();
        await putTipoEntrada();
    }
    return (
        <div>
            <form action="" method='post'>
                <input type="text" value={tipo.nombre} required onChange={(ev) => setTipo({...tipo, nombre: ev.target.value})}/>
                <input type="number" step='0.01' min='0' value={tipo.precio} required onChange={(ev) => setTipo({...tipo, precio: ev.target.value})}/>
                <input type="number" value={tipo.cupoMaximo} required onChange={(ev) => setTipo({...tipo, cupoMaximo: ev.target.value})}/>
                <button onClick={editarTipoEntrada}>Editar</button>
            </form >
        </div>
    )
}

export default FormuEditTiposEntrada