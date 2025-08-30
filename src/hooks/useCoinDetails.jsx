    import { useEffect, useState } from 'react';
    import axios from 'axios';

    const useCoinDetails = (id) => {
    const [details, setDetails] = useState(null);
    const [chart, setChart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchDetails = async () => {
        try {
            const [metaRes, chartRes] = await Promise.all([
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
                params: { vs_currency: 'usd', days: 30 },
            }),
            ]);
            setDetails(metaRes.data);
            setChart(chartRes.data.prices);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchDetails();
    }, [id]);

    return { details, chart, loading };
    };

    export default useCoinDetails;
