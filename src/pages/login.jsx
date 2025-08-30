    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuarios.find(
        (u) => (u.usuario === usuario || u.email === usuario) && u.clave === clave
        );

        if (!usuarioEncontrado) {
        alert('Usuario o clave incorrectos');
        return;
        }

        const token = Math.random().toString(36).substring(2);
        localStorage.setItem('sesion', JSON.stringify({
        usuario: usuarioEncontrado.usuario,
        token,
        timestamp: Date.now()
        }));

        navigate('/home');
    };

    return (
        
        <div className='main-container'>
            <form onSubmit={handleSubmit} className="form-container">
            <h1>Bienvenido a Crypto Exchange App</h1>
        <h2>Iniciar Sesión</h2>

        <div className="input-group">
            <label>Usuario o Correo</label>
            <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            />
        </div>

        <div className="input-group">
            <label>Contraseña</label>
            <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
            />
        </div>

        <button className='btn' type="submit">Iniciar</button> <br />
        <a href="/register">No tienes cuenta? Registrate aqui</a>
            </form>
        </div>
        
    );
    };

    export default Login;
