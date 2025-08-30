    import React from 'react';

    const userHoldings = [
    { symbol: 'BTC', amount: 0.25 },
    { symbol: 'ETH', amount: 1.5 },
    { symbol: 'SOL', amount: 10 },
    ];

    const prices = {
    BTC: 115000,
    ETH: 3200,
    SOL: 110,
    };

    const CryptoHoldingsTable = () => {
    return (
        <div className="holdings-container">
        <h2>Saldo de Criptomonedas</h2>
        <table className="holdings-table">
            <thead>
            <tr>
                <th>Criptomoneda</th>
                <th>Precio (USD)</th>
                <th>Saldo</th>
                <th>Valor Total</th>
            </tr>
            </thead>
            <tbody>
            {userHoldings.map(({ symbol, amount }) => {
                const price = prices[symbol];
                const total = price * amount;
                return (
                <tr key={symbol}>
                    <td>{symbol}</td>
                    <td>${price.toLocaleString()}</td>
                    <td>{amount}</td>
                    <td>${total.toLocaleString()}</td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
    );
    };

    export default CryptoHoldingsTable;
