import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Concierto from './Concierto'
import FormuAdd from './FormuAdd'

const Tabla = () => {
    const [conciertos, setConciertos] = useState([])
    async function getConciertos() {
        try {
            const datos = await axios.get("http://localhost:8090/api/conciertos")
            setConciertos(datos.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getConciertos()
    }, [])
    return (
        <div>
            <h1>Nuestros conciertos</h1>
            <FormuAdd />
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Recinto</th>
                        <th>Precio Base</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {conciertos.map((concierto) => (
                        <Concierto key={concierto.id}
                            nombre={concierto.nombre}
                            fecha={concierto.fecha}
                            recintoId={concierto.recintoId}
                            precio={concierto.precioBase+"€"}
                            estado={concierto.estado}>
                        </Concierto>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Tabla