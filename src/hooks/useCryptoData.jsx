    import { useEffect, useState } from "react";
    import axios from "axios";

    function useCryptoData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCrypto = async () => {
        try {
        const resp = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: {
            vs_currency: "usd"
            }
        });

        if (Array.isArray(resp.data)) {
            const adaptedData = resp.data.map(coin => ({
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            name: coin.name,
            image: coin.image
            }));

            setData(adaptedData);
            setError(null);
        } else {
            throw new Error("Formato inesperado de datos");
        }
        } catch (err) {
        setError(err.message || "Error desconocido");
        }
    };

    useEffect(() => {
        fetchCrypto().finally(() => setLoading(false));

        const intervalId = setInterval(() => {
        fetchCrypto();
        }, 30000);

        return () => clearInterval(intervalId);
    }, []);

    return { data, loading, error };
    }

    export default useCryptoData;
