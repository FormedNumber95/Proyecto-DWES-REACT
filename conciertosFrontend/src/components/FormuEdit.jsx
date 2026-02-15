import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FormuEdit = ({ id, fecha, nombre, recintoId, precio, estado }) => {

    const [recintos, setRecintos] = useState([])
    const [concierto, setConcierto] = useState({})
    let navigate = useNavigate()

    async function getRecintos() {
        try {
            const datos = await axios.get("http://localhost:8090/api/recintos")
            setRecintos(datos.data)
        } catch (error) {
            console.error(error)
        }
    }
    async function getConciertoPorId() {
        try {
            const datos = await axios.get("http://localhost:8080/api/conciertos/" + id)
            setConcierto(datos.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getRecintos()
        getConciertoPorId()
    }, [])

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
        <div className="form-edit-container">
            <h2>Modificar Concierto</h2>
            <form action="" method='post' className="form-edit">
                <div className="form-group">
                    <label htmlFor="fecha">Fecha y Hora</label>
                    <input id="fecha" type="datetime-local" defaultValue={fecha} required onChange={(ev) => setConcierto({ ...concierto, fecha: ev.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" type="text" placeholder='Nombre del concierto' defaultValue={nombre} required onChange={(ev) => setConcierto({ ...concierto, nombre: ev.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="recinto">Recinto</label>
                    <select name="recinto" id="recinto" onChange={(ev) => setConcierto({ ...concierto, recintoId: ev.target.value })}>
                        {recintos.map((recinto) => (
                            <option key={recinto.id} value={recinto.id} selected={recinto.id == recintoId}>{recinto.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="precio">Precio Base (€)</label>
                    <input id="precio" type="number" placeholder='0.00' step='0.01' min='0' defaultValue={precio} required onChange={(ev) => setConcierto({ ...concierto, precioBase: ev.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="estado">Estado</label>
                    <select name="estado" id="estado" onChange={(ev) => setConcierto({ ...concierto, estado: ev.target.value })}>
                        <option value="PROGRAMADO" selected={estado == "PROGRAMADO"}>PROGRAMADO</option>
                        <option value="CANCELADO" selected={estado == "CANCELADO"}>CANCELADO</option>
                        <option value="FINALIZADO" selected={estado == "FINALIZADO"}>FINALIZADO</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button className="btn-cancel" type="button" onClick={() => navigate("/home")}>Cancelar</button>
                    <button className="btn-save" onClick={editarConcierto}>Guardar Cambios</button>
                </div>
            </form >
        </div>
    )

}

export default FormuEdit