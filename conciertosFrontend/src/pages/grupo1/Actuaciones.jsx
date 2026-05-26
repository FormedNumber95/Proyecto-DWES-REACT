import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import TablaActuaciones from '../../components/grupo1/TablaActuaciones';

const Actuaciones = () => {

    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("rol") != "ADMIN" && localStorage.getItem("rol") != "PROMOTOR") {
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