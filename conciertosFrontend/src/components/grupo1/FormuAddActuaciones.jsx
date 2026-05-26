import axios from 'axios'
import React, { useEffect, useState } from 'react'

const FormuAddActuaciones = ({ conciertoId }) => {

    const [actuaciones, setActuaciones] = useState([])
    const [actuacion, setActuacion] = useState({ conciertoId: conciertoId })
    const [artistas, setArtistas] = useState([])
    const [disponibles, setDisponibles] = useState([])

    async function getActuacionesPorConcierto() {
        try {
            const datos = await axios.get("http://localhost:8080/api/conciertos/" + conciertoId + "/actuaciones")
            setActuaciones(datos.data || [])
        } catch (error) {
            console.error(error)
        }
    }

    async function getArtistas() {
        try {
            const datos = await axios.get("http://localhost:8090/api/artistas")
            setArtistas(datos.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getArtistas()
        getActuacionesPorConcierto()
    }, [])

    useEffect(() => {
        let filtro = artistas.filter(artista =>
            actuaciones.filter(actuacion => actuacion.artistaId === artista.id).length === 0
        )
        if (filtro.length != 0) {
            setActuacion({ ...actuacion, artistaId: filtro[0].id })
        }
        setDisponibles(filtro)
    }, [artistas, actuaciones])

    async function postActuacion() {
        try {
            //Por errores de CORS hemos modificado vite.config.js
            const datos = await axios.post("/api/actuaciones", actuacion)
            location.reload();
        } catch (error) {
            alert("Un artista no puede estar en 2 conciertos el mismo día")
        }
    }

    async function crearActuacion() {
        await postActuacion();
    }

    return (
        <div className="form-add-actuacion-container">
            <div className="form-add-actuacion">
                <div className="form-group">
                    <label htmlFor="artistas">Añadir Artista / Grupo</label>
                    <div className="form-inline">
                        <select
                            name="artistas"
                            id="artistas"
                            className="select-artista"
                            onChange={(ev) => setActuacion({ ...actuacion, artistaId: ev.target.value })}
                        >
                            {disponibles.length > 0 ? (
                                disponibles.map((artista) => (
                                    <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                                ))
                            ) : (
                                <option disabled>No hay más artistas disponibles</option>
                            )}
                        </select>
                        <button
                            className="btn-add-actuacion"
                            disabled={disponibles.length === 0}
                            onClick={() => crearActuacion()}
                        >
                            Añadir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default FormuAddActuaciones