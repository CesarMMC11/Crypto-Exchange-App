    // src/components/TransactionHistory.jsx
    import React from 'react';

    const TransactionHistory = ({ history }) => {
    if (!history.length) return <p>No hay transacciones registradas aún.</p>;

    return (
        <ul className="transaction-list">
        {history.map(tx => (
            <li key={tx.id}>
            <strong>{tx.amountIn} {tx.fromSymbol}</strong> → {tx.amountOut} {tx.toSymbol}
            </li>
        ))}
        </ul>
    );
    };

    export default TransactionHistory;
