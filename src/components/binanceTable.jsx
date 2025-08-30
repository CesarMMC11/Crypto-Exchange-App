    import React from 'react';
    import useBinanceMarket from '../hooks/binanceMarket';

    const BinanceTable = () => {
    const { data, setFilter, setSortKey, setSortOrder } = useBinanceMarket();

    return (
        <div className="binance-table-container">
        <h2 className="binance-title">Precios en Binance</h2>

        <input
            type="text"
            placeholder="Buscar símbolo..."
            onChange={(e) => setFilter(e.target.value)}
            className="binance-search"
        />

        <div className="binance-controls">
            <button onClick={() => { setSortKey('symbol'); setSortOrder('asc'); }}>Símbolo ↑</button>
            <button onClick={() => { setSortKey('symbol'); setSortOrder('desc'); }}>Símbolo ↓</button>
            <button onClick={() => { setSortKey('lastPrice'); setSortOrder('asc'); }}>Precio ↑</button>
            <button onClick={() => { setSortKey('lastPrice'); setSortOrder('desc'); }}>Precio ↓</button>
        </div>

        <div className="binance-table-wrapper">
            <table className="binance-table">
            <thead>
                <tr>
                <th>Símbolo</th>
                <th>Precio</th>
                <th>Variación 24h</th>
                <th>Volumen</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                <tr key={item.symbol}>
                    <td>{item.symbol}</td>
                    <td>${parseFloat(item.lastPrice).toLocaleString()}</td>
                    <td>{parseFloat(item.priceChangePercent).toFixed(2)}%</td>
                    <td>{parseFloat(item.volume).toLocaleString()}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    };

    export default BinanceTable;
