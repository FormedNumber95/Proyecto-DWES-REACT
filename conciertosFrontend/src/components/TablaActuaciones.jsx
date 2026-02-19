import React, { useState } from 'react'
import { useEffect } from 'react'
import Actuacion from './Actuacion'
import axios from 'axios'
import FormuAddActuaciones from './FormuAddActuaciones'
import { useNavigate } from 'react-router-dom'

const TablaActuaciones = ({ id }) => {

    let navigate = useNavigate()
    const [actuaciones, setActuaciones] = useState([])
    async function getActuaciones() {
        try {
            const datos = await axios.get("http://localhost:8080/api/conciertos/" + id + "/actuaciones")
            setActuaciones(datos.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getActuaciones()
    }, [])

    return (
        <div className="actuaciones-container">
            <div className="actuaciones-content">
                <h2>Actuaciones del Concierto</h2>
                <FormuAddActuaciones conciertoId={id}></FormuAddActuaciones>

                <div className="table-wrapper">
                    <table className="tabla-actuaciones">
                        <thead>
                            <tr>
                                <th>Artista / Grupo</th>
                                <th className="actions-column">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actuaciones.length > 0 && actuaciones.map(
                                (actuacion) => (
                                    <Actuacion key={actuacion.id}
                                        id={actuacion.id}
                                        idArtista={actuacion.artistaId}>
                                    </Actuacion>
                                )
                            )}
                        </tbody>
                    </table>
                    {actuaciones.length == 0 && (
                        <div className="no-data">
                            <span>No hay actuaciones programadas para este concierto</span>
                        </div>
                    )}
                </div>

                <div className="actuaciones-footer">
                    <button className="btn-back" onClick={() => navigate("/conciertos")}>
                        ← Volver a la página principal
                    </button>
                </div>
            </div>
        </div>
    )

}

export default TablaActuaciones