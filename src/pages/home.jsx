    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import Navbar from '../components/navbar';
    import CryptoData from '../components/cryptoData';
    import CryptoHoldingsTable from '../components/userHolding'
    import BinanceTable from '../components/binanceTable';
    // import CryptoCard from '../components/cryptoDetails';

    const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('sesion');
        navigate('/login');
    };

    return (
        <div className="home-container">

        <Navbar />

        <CryptoHoldingsTable />
        <CryptoData />


        </div>
    );
    };

    export default Home;
