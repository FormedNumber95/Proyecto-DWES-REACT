import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TablaActuaciones from '../components/TablaActuaciones';

const Actuaciones = () => {

    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("usuario") != "ADMIN" && localStorage.getItem("usuario") != "PROMOTOR") {
            navigate("/");
        }
    }, [])
    return (
        <div>
            <Navbar></Navbar>
            <TablaActuaciones id={id}></TablaActuaciones>
        </div>
    )
}

export default Actuaciones