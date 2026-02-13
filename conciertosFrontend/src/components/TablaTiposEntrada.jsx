import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FormuAddTiposEntrada from './FormuAddTiposEntrada'
import TipoEntrada from './TipoEntrada'

const TablaTiposEntrada = ({ id, precioBase }) => {
    const [tipos, setTipos] = useState([])
    async function getTiposEntrada() {
        try {
            const datos = await axios.get("http://localhost:8080/api/conciertos/" + id + "/tipos-entrada")
            setTipos(datos.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getTiposEntrada()
    }, [])
    return (
        <div>
            <FormuAddTiposEntrada conciertoId={id} precioBase={precioBase}></FormuAddTiposEntrada>
            <h2>Tipos de Entrada</h2>

            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cupo Máximo</th>
                </tr>
                {tipos.length > 0 &&
                    tipos.map((tipo) => (
                        <TipoEntrada key={tipo.id}
                            id={tipo.id}
                            nombre={tipo.nombre}
                            precio={tipo.precio + "€"}
                            cupoMaximo={tipo.cupoMaximo}>
                        </TipoEntrada>
                    ))
                }
            </table>
            {tipos.length == 0 && <span>No hay conciertos</span>}

        </div>
    )
}

export default TablaTiposEntrada