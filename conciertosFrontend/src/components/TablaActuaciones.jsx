import React, { useState } from 'react'
import { useEffect } from 'react'
import Actuacion from './Actuacion'
import axios from 'axios'
import FormuAddActuaciones from './FormuAddActuaciones'

const TablaActuaciones = ({id}) => {

    const [actuaciones, setActuaciones] = useState([])
    async function getActuaciones() {
        try {
            const datos = await axios.get("http://localhost:8080/api/conciertos/"+id+"/actuaciones")
            setActuaciones(datos.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getActuaciones()
    }, [])

    return (
    <div>
        <h2>ACTUACIONES</h2>
        <FormuAddActuaciones conciertoId={id}></FormuAddActuaciones>
        <ul>
            {actuaciones.length>0 && actuaciones.map(
                (actuacion) => (
                        <Actuacion key={actuacion.id}
                            id={actuacion.id}
                            idArtista={actuacion.artistaId}>
                        </Actuacion>  
                    )
            )}
            {actuaciones.length==0 && <span>No hay actuaciones</span>}
        </ul>
    </div>
  )
}

export default TablaActuaciones