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
        if (filtro.length!=0) {
            setActuacion({ ...actuacion, artistaId: filtro[0].id })
        }
        setDisponibles(filtro)
    }, [artistas, actuaciones])

    async function postActuacion() {
        try {
            const datos = await axios.post("http://localhost:8080/api/actuaciones/", actuacion)
            location.reload();
        } catch (error) {
            console.error(error)
        }
    }

    async function crearActuacion() {
        await postActuacion();
    }

    return (
        <div>
            <select name="artistas" id="artistas" onChange={(ev) => setActuacion({ ...actuacion, artistaId: ev.target.value })}>
                {disponibles.map((artista) => (
                    <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                ))}
            </select>
            <button onClick={() => crearActuacion()}>Crear</button>
        </div>
    )
}

export default FormuAddActuaciones