    import { useEffect, useState } from 'react';

    const useBinanceMarket = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('symbol');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetch('https://api.binance.com/api/v3/ticker/24hr')
        .then((res) => res.json())
        .then((tickers) => setData(tickers))
        .catch((err) => console.error('Error al cargar datos:', err));
    }, []);

    const filteredSorted = data
        .filter((item) => item.symbol.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (typeof valA === 'string') {
            return sortOrder === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else {
            return sortOrder === 'asc' ? parseFloat(valA) - parseFloat(valB) : parseFloat(valB) - parseFloat(valA);
        }
        });

    return { data: filteredSorted, setFilter, setSortKey, setSortOrder };
    };

    export default useBinanceMarket;
