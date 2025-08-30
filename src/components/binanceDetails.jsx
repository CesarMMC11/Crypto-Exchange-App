    import React, { useState } from "react";
    import useCoinGeckoMarkets from "../hooks/useCryptoDetails";
    import CoinModal from "./coinModal"

    const BinanceDetails = () => {
    const { data, loading, error } = useCoinGeckoMarkets(['bitcoin', 'ethereum', 'solana']);
    const [selectedCoin, setSelectedCoin] = useState(null);

    if (loading) return <p>Cargando datos del mercado...</p>;
    if (error) return <p>Error al cargar datos: {error.message}</p>;

    return (
        <div className="CryptoDetail">
        {data.map(coin => (
            <div key={coin.id} style={{ marginBottom: '1rem' }}>
            <img src={coin.image} alt={coin.name} width={32} />
            <h3>{coin.name} ({coin.symbol.toUpperCase()})</h3>
            <p>💰 Precio: ${coin.current_price.toLocaleString()}</p>
            <p>📉 Cambio 24h: {coin.price_change_percentage_24h.toFixed(2)}%</p>
            <p>📊 Market Cap: ${coin.market_cap.toLocaleString()}</p>
            <button onClick={() => setSelectedCoin(coin.id)}>Ver más</button>
            </div>
        ))}

        {selectedCoin && (
            <CoinModal coinId={selectedCoin} onClose={() => setSelectedCoin(null)} />
        )}
        </div>
    );
    };

    export default BinanceDetails;
