import React, { useMemo } from 'react';

interface EvolutionChartProps {
    data: { date: string; weight: number }[];
}

const EvolutionChart: React.FC<EvolutionChartProps> = ({ data }) => {
    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [data]);

    if (sortedData.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 text-slate-400">
                <div className="text-center">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">show_chart</span>
                    <p>No hay datos suficientes aún.</p>
                </div>
            </div>
        );
    }

    const weights = sortedData.map(d => d.weight);
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);

    // Add some padding to Y axis
    const yMin = minWeight - 2;
    const yMax = maxWeight + 2;
    const yRange = yMax - yMin || 1; // Avoid division by zero

    const width = 100; // viewbox units
    const height = 50; // viewbox units

    // Calculate points
    const points = sortedData.map((d, i) => {
        const x = (i / (sortedData.length - 1 || 1)) * width;
        const normalizedY = (d.weight - yMin) / yRange;
        const y = height - (normalizedY * height); // invert Y for SVG
        return `${x},${y}`;
    }).join(' ');

    // Fill area gradient
    const fillPoints = `0,${height} ${points} ${width},${height}`;

    return (
        <div className="bg-card-light dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">ssid_chart</span>
                Evolución de Peso
            </h3>

            <div className="relative w-full aspect-[2/1] bg-slate-50 dark:bg-card-dark rounded-xl overflow-hidden border border-slate-100 dark:border-border-dark">
                {/* Y-Axis Labels (Min/Max) */}
                <div className="absolute left-2 top-2 text-xs font-bold text-slate-300">{yMax.toFixed(1)} kg</div>
                <div className="absolute left-2 bottom-2 text-xs font-bold text-slate-300">{yMin.toFixed(1)} kg</div>

                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible p-4">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#20df70" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#20df70" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#cbd5e1" strokeWidth="0.2" strokeDasharray="2" className="dark:stroke-slate-700" />

                    {/* Area Fill */}
                    {sortedData.length > 1 && (
                        <polygon points={fillPoints} fill="url(#chartGradient)" />
                    )}

                    {/* Line */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke="#20df70"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Dots */}
                    {sortedData.map((d, i) => {
                        const x = (i / (sortedData.length - 1 || 1)) * width;
                        const normalizedY = (d.weight - yMin) / yRange;
                        const y = height - (normalizedY * height);
                        return (
                            <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="1.5"
                                className="fill-white dark:fill-surface-dark stroke-primary stroke-[0.5]"
                            />
                        );
                    })}
                </svg>
            </div>

            {/* Legend / Stats */}
            <div className="mt-4 flex justify-between items-center">
                <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase font-bold">Inicial</p>
                    <p className="text-lg font-bold">{sortedData[0].weight} kg</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase font-bold">Actual</p>
                    <p className="text-lg font-bold">{sortedData[sortedData.length - 1].weight} kg</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase font-bold">Cambio</p>
                    <p className={`text-lg font-bold ${sortedData[sortedData.length - 1].weight < sortedData[0].weight ? 'text-green-500' : 'text-slate-900 dark:text-white'}`}>
                        {(sortedData[sortedData.length - 1].weight - sortedData[0].weight).toFixed(1)} kg
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EvolutionChart;
