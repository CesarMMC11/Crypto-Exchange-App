    // src/hooks/useTransactionH.jsx
    import { useState, useEffect } from 'react';

    function useTransactionHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("txHistory");
        if (stored) setHistory(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("txHistory", JSON.stringify(history));
    }, [history]);

    const addTransaction = (tx) => {
        setHistory(prev => [
        { ...tx, id: `tx_${Date.now()}` },
        ...prev,
        ]);
    };

    const clearHistory = () => setHistory([]);

    return { history, addTransaction, clearHistory };
    }

    export default useTransactionHistory;
