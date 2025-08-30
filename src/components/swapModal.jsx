    import React, { useMemo, useState } from 'react';
    import useSwapQuote from '../hooks/swapQuote';

    const COINS = [
    { id: 'bitcoin', symbol: 'BTC' },
    { id: 'ethereum', symbol: 'ETH' },
    { id: 'solana', symbol: 'SOL' },
    ];

    export default function SwapModal({ onClose, balances = {}, onSimulateSwap }) {
    const [fromId, setFromId] = useState('bitcoin');
    const [toId, setToId] = useState('ethereum');
    const [amountIn, setAmountIn] = useState('');
    const [slippage, setSlippage] = useState(0.005);
    const [swapSuccess, setSwapSuccess] = useState(false); // ✅ Estado agregado

    const { quote, loading, error, refreshNeeded } = useSwapQuote({
        fromId,
        toId,
        amountIn: Number(amountIn || 0),
        slippage,
    });

    const from = useMemo(() => COINS.find(c => c.id === fromId), [fromId]);
    const to = useMemo(() => COINS.find(c => c.id === toId), [toId]);
    const balance = balances[from?.symbol] ?? 0;

    const canSwap =
        fromId !== toId &&
        Number(amountIn) > 0 &&
        Number(amountIn) <= balance &&
        !!quote &&
        !loading;

    const switchPair = () => {
        setFromId(toId);
        setToId(fromId);
    };

    const handleSwap = () => {
        if (!canSwap) return;

        const tx = {
        fromSymbol: from.symbol,
        toSymbol: to.symbol,
        amountIn: Number(amountIn),
        amountOut: quote.amountOut,
        timestamp: new Date().toISOString(),
        };

        onSimulateSwap?.(tx);
        setSwapSuccess(true); // ✅ Confirmación visual
    };

    const resetSwap = () => {
        setAmountIn('');
        setSwapSuccess(false);
    };

    return (
        <div className="modal-1">
        <button className="modal-close" onClick={onClose}>Cerrar</button>
        <h2>Intercambiar</h2>

        {swapSuccess ? (
            <div className="swap-success">
            <p>✅ Intercambio realizado con éxito.</p>
            <button onClick={resetSwap}>Nuevo intercambio</button>
            </div>
        ) : (
            <>
            <div className="swap-row">
                <div className="swap-col">
                <label>De</label>
                <select value={fromId} onChange={e => setFromId(e.target.value)}>
                    {COINS.map(c => (
                    <option key={c.id} value={c.id}>{c.symbol}</option>
                    ))}
                </select>
                <input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="Monto"
                    value={amountIn}
                    onChange={e => setAmountIn(e.target.value)}
                />
                <small>Balance: {balance}</small>
                </div>

                <button className="swap-switch" onClick={switchPair}>⇅</button>

                <div className="swap-col">
                <label>A</label>
                <select value={toId} onChange={e => setToId(e.target.value)}>
                    {COINS.map(c => (
                    <option key={c.id} value={c.id}>{c.symbol}</option>
                    ))}
                </select>
                <input
                    type="text"
                    readOnly
                    value={quote?.amountOut ?? ''}
                    placeholder="Calculado"
                />
                </div>
            </div>

            <div className="swap-meta">
                {quote && (
                <>
                    <div><strong>Tasa:</strong> 1 {from.symbol} ≈ {quote.rate.toFixed(6)} {to.symbol}</div>
                    <div><strong>Slippage:</strong> {(slippage * 100).toFixed(2)}%</div>
                    <div><strong>Fee estimada:</strong> {quote.feeAmount} {to.symbol}</div>
                </>
                )}
                {refreshNeeded && <div className="swap-warning">Cotización desactualizada.</div>}
                {error && <div className="swap-error">Error: {error}</div>}
            </div>

            <button className="swap-cta" disabled={!canSwap} onClick={handleSwap}>
                Intercambiar
            </button>
            </>
        )}
        </div>
    );
    }
