    import React from 'react';
    import useCryptoData from '../hooks/useCryptoData';

    const getBaseSymbol = (symbol) => symbol.replace(/(USDT|BUSD|TUSD|FDUSD)$/, '');
    const getIconUrl = (symbol) => {
    const base = getBaseSymbol(symbol).toLowerCase();
    return `https://cdn.jsdelivr.net/gh/vadimmalykhin/binance-icons/crypto/${base}.svg`;
    };

    const CryptoData = () => {
    const { data, loading, error } = useCryptoData();

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error al cargar los datos: {error}</p>;

    return (
        <div className="crypto-data-container">
        <h2>Precios de Criptomonedas</h2>
        <ul className="crypto-list">
            {Array.isArray(data) && data.length > 0 ? (
            data.slice(0, 20).map((coin) => (
                <li key={coin.symbol} className="crypto-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <img
                    src={getIconUrl(coin.symbol)}
                    alt={coin.symbol}
                    style={{ width: '24px', height: '24px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="crypto-name" style={{ fontWeight: 'bold' }}>{coin.symbol}</span>
                <span className="crypto-price">${parseFloat(coin.price).toFixed(2)}</span>
                </li>
            ))
            ) : (
            <li>No hay datos disponibles.</li>
            )}
        </ul>
        </div>
    );
    };

    export default CryptoData;
