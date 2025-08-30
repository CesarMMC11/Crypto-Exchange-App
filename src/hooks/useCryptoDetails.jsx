    import { useEffect, useState } from 'react';
    import axios from 'axios';

    const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids';

    const useCoinGeckoMarkets = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarkets = async () => {
        try {
            const response = await axios.get(API_URL);
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        };

        fetchMarkets();
    }, []);

    return { data, loading, error };
    };

    export default useCoinGeckoMarkets;