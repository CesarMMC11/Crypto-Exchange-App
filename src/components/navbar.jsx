import react, { useState }from 'react'
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen)
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('sesion');
        navigate('/login');
    }
    return (
        <>
        <div className='navbar'>
            <div className='title-principal-1'>
                <h1>Cripto Exchange App</h1>
            </div>
                <div className="hamburger" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>

            <nav className={`buttons-nav ${menuOpen ? "open" : ""}`}>
                <div>
                <button className="button-nav">
                    <a href="/home">Home</a>
                </button>
                </div>
                <div>
                <button className="button-nav">
                    <a href="/binanceList">Lista de Criptomonedas</a>
                </button>
                </div>
                <div>
                <button className="button-nav">
                    <a href="/cryptoDetails">Informacion de Criptos</a>
                </button>
                </div>
                <div>
                <button className="button-nav">
                    <a href="/swapPage">Intercambio de Criptos</a>
                </button>
                </div>
                <div>
                <button className="button-nav">
                    <a href="/transactionH">Historial</a>
                </button>
                </div>

                <div className="logout-btn">
                    <button onClick={handleLogout}>
                    Cerrar sesión
                </button>
                </div>
            </nav>
        </div>

        

    
        </>
    )
}

export default Navbar