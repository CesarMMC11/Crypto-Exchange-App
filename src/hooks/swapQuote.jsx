    // hooks/useSwapQuote.js
    import { useEffect, useMemo, useState } from 'react';
    import axios from 'axios';

    const toFixedDown = (num, decimals = 6) =>
    Math.floor(num * 10 ** decimals) / 10 ** decimals;

    export default function useSwapQuote({
    fromId, // 'bitcoin'
    toId,   // 'ethereum'
    amountIn, // número
    slippage = 0.005, // 0.5%
    fee = 0.001,      // 0.1%
    enabled = true,
    }) {
    const [prices, setPrices] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stale, setStale] = useState(false);
    const [error, setError] = useState(null);

    const debouncedAmount = useDebounce(amountIn, 250);

    useEffect(() => {
        if (!enabled || !fromId || !toId) return;
        let cancelled = false;
        const fetch = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets',
            { params: { vs_currency: 'usd', ids: `${fromId},${toId}` } }
            );
            if (cancelled) return;
            const map = Object.fromEntries(
            data.map(c => [c.id, c.current_price])
            );
            setPrices({ from: map[fromId], to: map[toId], ts: Date.now() });
            setStale(false);
        } catch (e) {
            if (!cancelled) setError(e.message || 'Error cotizando');
        } finally {
            if (!cancelled) setLoading(false);
        }
        };
        fetch();

        // Marca la cotización como “stale” a los 20s
        const staleTimer = setTimeout(() => setStale(true), 20000);
        return () => {
        cancelled = true;
        clearTimeout(staleTimer);
        };
    }, [fromId, toId, enabled]);

    const quote = useMemo(() => {
        if (!prices || !Number(debouncedAmount)) return null;
        const rate = prices.to / prices.from;
        const grossOut = debouncedAmount * rate;
        const netOut = grossOut * (1 - fee) * (1 - slippage);
        return {
        rate,
        amountOut: toFixedDown(netOut, 8),
        feeAmount: toFixedDown(grossOut * fee, 8),
        slippage,
        updatedAt: prices.ts,
        };
    }, [prices, debouncedAmount, fee, slippage]);

    return { quote, loading, error, stale, refreshNeeded: stale };
    }

    function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
    }
