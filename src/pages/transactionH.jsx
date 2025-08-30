    // src/pages/TransactionHistoryPage.jsx
    import React from 'react';
    import Navbar from '../components/navbar';
    import TransactionHistory from '../components/transactionH';
    import useTransactionHistory from '../hooks/useTransactionH';

    const TransactionHistoryPage = () => {
    const { history } = useTransactionHistory();

    return (
        <div className="home-container">
            <div className='history-container'>
                <Navbar />
                <h2>Historial de Transacciones</h2>
                <TransactionHistory history={history} />
            </div>
        </div>
    );
    };

    export default TransactionHistoryPage;
