import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  let navigate = useNavigate()

  async function login(ev) {
    ev.preventDefault();
    await postLogin({ email: email, password: pass })
  }

  async function postLogin(usu) {
    try {
      const datos = await axios.post("http://localhost:8090/api/auth/login", usu)
      localStorage.setItem("usuario", datos.data.rol)
      if(datos.data.rol == "ADMIN" || datos.data.rol == "PROMOTOR"){
        navigate("/home")
      }
    } catch (error) {
      setErr(error)
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form method='post'>
        <label htmlFor="email">Email: </label>
        <input type="email" name='email' onChange={(ev) => setEmail(ev.target.value)} />
        <br />
        <label htmlFor="contrasenia" >Password: </label>
        <input type="password" name='contrasenia' onChange={(ev) => setPass(ev.target.value)} />
        <br />
        <button onClick={login}>Login</button>
      </form>
      { err!="" && <span className='error'>*Email o contraseña no válido</span>}
    </div>
  )
}

export default Login