    import React, { useState } from 'react';
    import Navbar from '../components/navbar';
    import SwapModal from '../components/swapModal';
    import useTransactionHistory from '../hooks/useTransactionH';

    const SwapPage = () => {
    const [showModal, setShowModal] = useState(true);

    const [balances, setBalances] = useState({
        BTC: 1.2,
        ETH: 5.4,
        SOL: 120,
    });

    const { addTransaction } = useTransactionHistory(); // Importa el método para registrar

    const handleSwap = ({ fromSymbol, toSymbol, amountIn, amountOut }) => {
        // Actualiza balances
        setBalances(prev => ({
        ...prev,
        [fromSymbol]: prev[fromSymbol] - amountIn,
        [toSymbol]: (prev[toSymbol] ?? 0) + amountOut,
        }));

        // Registra en el historial
        addTransaction({
        fromSymbol,
        toSymbol,
        amountIn,
        amountOut,
        timestamp: new Date().toISOString(),
        });
    };

    return (
        <div className="home-container">

        <Navbar />
        <div className="title-principal">
            <h2>Intercambio de Criptomonedas</h2>
        </div>

        {showModal ? (
            <SwapModal
            balances={balances}
            onSimulateSwap={handleSwap}
            onClose={() => setShowModal(false)}
            />
        ) : (
            <div style={{ padding: '2rem' }}>
            <p>Intercambio realizado. Puedes volver a abrir el modal para otro swap.</p>
            <button onClick={() => setShowModal(true)}>Nuevo intercambio</button>
            </div>
        )}
        </div>
    );
    };

    export default SwapPage;
