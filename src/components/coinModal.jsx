    import React, { useRef, useEffect } from 'react';
    import { Line } from 'react-chartjs-2';
    import useCoinDetails from '../hooks/useCoinDetails';

    const CoinModal = ({ coinId, onClose }) => {
    const { details, chart, loading } = useCoinDetails(coinId);
    const chartRef = useRef(null); 

    useEffect(() => {
        return () => {
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }
        };
    }, [coinId]); 

    if (loading) return <div className="modal">Cargando...</div>;

    const chartData = {
        labels: chart.map(([ts]) => new Date(ts).toLocaleDateString()),
        datasets: [
        {
            label: 'Precio USD',
            data: chart.map(([, price]) => price),
            borderColor: '#007bff',
            fill: false,
        },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
        },
        scales: {
        x: { display: true },
        y: { display: true },
        },
    };

    return (
        <div className="modal">
        <button onClick={onClose}>Cerrar</button>
        <h2>{details.name}</h2>
        <Line ref={chartRef} data={chartData} options={chartOptions} />
        <p>{details.description?.en?.slice(0, 300)}...</p>
        <a href={details.links.homepage[0]} target="_blank">Sitio oficial</a>
        </div>
    );
    };

    export default CoinModal;
