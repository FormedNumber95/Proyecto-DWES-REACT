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
        <div className="tipos-entrada-container">
            <div className="tipos-entrada-content">
                <h2>Gestión de Tipos de Entrada</h2>

                <FormuAddTiposEntrada conciertoId={id} precioBase={precioBase}></FormuAddTiposEntrada>

                <div className="table-wrapper">
                    <table className="tabla-tipos">
                        <thead>
                            <tr>
                                <th>Nombre del Tipo</th>
                                <th>Precio Final</th>
                                <th>Cupo Máximo</th>
                                <th className="actions-column">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipos.length > 0 ? (
                                tipos.map((tipo) => (
                                    <TipoEntrada key={tipo.id}
                                        id={tipo.id}
                                        nombre={tipo.nombre}
                                        precio={tipo.precio + "€"}
                                        cupoMaximo={tipo.cupoMaximo}
                                    >
                                    </TipoEntrada>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="no-data">
                                        No hay tipos de entrada definidos para este concierto
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="actuaciones-footer">
                    <button className="btn-back" onClick={() => window.history.back()}>
                        ← Volver a la página principal
                    </button>
                </div>
            </div>
        </div>
    )

}

export default TablaTiposEntrada