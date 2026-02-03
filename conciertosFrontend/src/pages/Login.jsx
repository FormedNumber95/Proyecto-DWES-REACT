import React from 'react'

const Login = () => {
  return (
    <div>
        <h1>Login</h1>
        <form action="" method='post'>
            <label htmlFor="usuario">Username: </label>
            <input type="text" name='usuario' />
            <br />
            <label htmlFor="contrasenia" >Password: </label>
            <input type="pass" name='contrasenia' />
            <br />
            <input type="submit" id='submit' value="Login" />
        </form>
    </div>
  )
}

export default Login