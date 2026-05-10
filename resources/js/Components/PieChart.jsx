import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ title, labels, data }) {
    const hasData = data && data.length > 0 && data.some(value => value > 0);

    const chartData = {
        labels: labels || [],
        datasets: [{
            data: data || [],
            backgroundColor: [
                'oklch(63.7% 0.237 25.331)',   // Primary
                '#10B981',                       // Emerald
                '#F59E0B',                       // Amber
                '#3B82F6',                       // Blue
                '#8B5CF6',                       // Violet
                '#EC4899',                       // Pink
                '#06B6D4',                       // Cyan
                '#F97316',                       // Orange
            ],
            borderColor: '#ffffff',
            borderWidth: 2.5,
            hoverBorderColor: '#ffffff',
            hoverBorderWidth: 3,
            hoverBorderJoinStyle: 'round',
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '0%',
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 800,
            easing: 'easeInOutQuart',
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyleWidth: 10,
                    pointStyleHeight: 10,
                    pointStyleBorderRadius: 3,
                    font: {
                        size: 12,
                        family: "'Inter', system-ui, sans-serif",
                    },
                    color: '#6B7280',
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return chart.data.labels.map((label, i) => ({
                            text: `${label} (${datasets[0].data[i]})`,
                            fillStyle: datasets[0].backgroundColor[i],
                            strokeStyle: datasets[0].borderColor,
                            lineWidth: 0,
                            hidden: false,
                            index: i,
                            borderRadius: 3,
                        }));
                    },
                },
            },
            title: {
                display: !!title,
                text: title,
                font: {
                    size: 16,
                    weight: 'bold',
                    family: "'Inter', system-ui, sans-serif",
                },
                color: '#111827',
                padding: { bottom: 16 },
            },
            tooltip: {
                backgroundColor: '#1F2937',
                titleFont: {
                    size: 13,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 12,
                },
                padding: 12,
                cornerRadius: 10,
                displayColors: true,
                boxPadding: 4,
                callbacks: {
                    label: (context) => {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const value = context.parsed;
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        return ` ${context.label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    // Empty State
    if (!hasData) {
        return (
            <div className="w-full h-72 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <svg className="w-16 h-16 mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm font-medium">Tidak ada data</p>
                <p className="text-xs mt-1">Data akan muncul di sini</p>
            </div>
        );
    }

    return (
        <div className="w-full h-72 sm:h-80">
            <Pie data={chartData} options={options} />
        </div>
    );
}