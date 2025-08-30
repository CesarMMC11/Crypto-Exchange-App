    import React, { createContext, useContext, useEffect, useState } from 'react';

    const TransactionHistoryContext = createContext();

    function TransactionHistoryProvider({ children }) {
    const [history, setHistory] = useState(() => {
        try {
        const stored = localStorage.getItem('txHistory');
        return stored ? JSON.parse(stored) : [];
        } catch {
        return [];
        }
    });

    useEffect(() => {
        try {
        localStorage.setItem('txHistory', JSON.stringify(history));
        } catch {
        // manejo opcional de errores
        }
    }, [history]);

    const addTransaction = (tx) => {
        setHistory(prev => [
        { ...tx, id: `tx_${Date.now()}` },
        ...prev,
        ]);
    };

    const clearHistory = () => setHistory([]);

    return (
        <TransactionHistoryContext.Provider value={{ history, addTransaction, clearHistory }}>
        {children}
        </TransactionHistoryContext.Provider>
    );
    }

    export function useTransactionHistory() {
    const context = useContext(TransactionHistoryContext);
    if (!context) {
        throw new Error('useTransactionHistory debe usarse dentro de TransactionHistoryProvider');
    }
    return context;
    }

    export default TransactionHistoryProvider;