    import React from 'react';
    import useBinanceMarket from '../hooks/binanceMarket';

    const BinanceTable = () => {
    const { data, setFilter, setSortKey, setSortOrder } = useBinanceMarket();

    return (
        <div className='binance-table'>
        <h2>Precios en Binance</h2>

        <input
            type="text"
            placeholder="Buscar símbolo..."
            onChange={(e) => setFilter(e.target.value)}
            style={{ marginBottom: '12px', padding: '6px' }}
        />

        <div className='table-buttons'>
            <div style={{marginBottom: '12px' }}>
            <button onClick={() => { setSortKey('symbol'); setSortOrder('asc'); }}>Símbolo ↑</button>
            <button onClick={() => { setSortKey('symbol'); setSortOrder('desc'); }}>Símbolo ↓</button>
            <button onClick={() => { setSortKey('lastPrice'); setSortOrder('asc'); }}>Precio ↑</button>
            <button onClick={() => { setSortKey('lastPrice'); setSortOrder('desc'); }}>Precio ↓</button>
        </div>
        </div>

        <table>
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
    );
    };

    export default BinanceTable;
