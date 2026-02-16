import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Concierto from './Concierto'
import FormuAdd from './FormuAdd'

const Tabla = () => {
    const [conciertos, setConciertos] = useState([])
    async function getConciertos() {
        try {
            const datos = await axios.get("http://localhost:8080/api/conciertos")
            setConciertos(datos.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getConciertos()
    }, [])
    return (
        <div className="table-container">
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
                        <th>Editar</th>
                        <th>Actuaciones</th>
                        <th>Tipos de Entrada</th>
                    </tr>
                </thead>

                <tbody>
                    {conciertos.length > 0 &&
                        conciertos.map((concierto) => (
                            <Concierto key={concierto.id}
                                id={concierto.id}
                                nombre={concierto.nombre}
                                fecha={concierto.fecha}
                                recintoId={concierto.recintoId}
                                precio={concierto.precioBase + "€"}
                                estado={concierto.estado}>
                            </Concierto>
                        ))
                    }
                </tbody>
            </table>
            {conciertos.length == 0 && <span>No hay conciertos</span>}
        </div>
    )
}

export default Tabla