import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FormuEdit from '../components/FormuEdit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Editor = () => {
    const { id } = useParams();
    const [concierto, setConcierto] = useState(null)
    async function getConciertoPorId() {
        try {
            const datos = await axios.get("http://localhost:5173/editar/" + id)
            setConcierto(datos.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getConciertoPorId()
    }, [])
    return (
        <div>
            <Navbar />
            <FormuEdit />
        </div>
    )
}

export default Editor