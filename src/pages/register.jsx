    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    const Register = () => {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const yaExiste = usuarios.some(
        (u) => u.usuario === usuario || u.email === email
        );

        if (yaExiste) {
        alert('El usuario o correo ya está registrado');
        return;
        }

        const nuevoUsuario = { usuario, email, clave };
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Registro exitoso. Ahora inicia sesión.');
        navigate('/login');
    };

    return (

        <div className='main-container'>
            <form onSubmit={handleSubmit} className="form-container">
            <h1>Bienvenido a Crypto Exchange App</h1>
        <h2>Registro</h2>

        <div className="input-group">
            <label>Usuario</label>
            <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            />
        </div>

        <div className="input-group">
            <label>Correo electrónico</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <button className='btn' type="submit">Registrarse</button> <br />
        <a href="/login">Si ya tienes cuenta, inicia sesion aqui!</a>
            </form>
        </div>
        
    );
    };

    export default Register;
