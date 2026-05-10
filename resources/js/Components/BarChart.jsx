import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ 
    title, 
    labels, 
    data, 
    labelName = 'Jumlah',
    horizontal = false,
    multiple = false,
    datasets = [],
}) {
    const hasData = data && data.length > 0 && data.some(value => value > 0);

    const defaultDataset = {
        label: labelName,
        data: data || [],
        backgroundColor: [
            'oklch(63.7% 0.237 25.331)',
            'oklch(63.7% 0.237 25.331 / 0.85)',
            'oklch(63.7% 0.237 25.331 / 0.70)',
            'oklch(63.7% 0.237 25.331 / 0.55)',
        ],
        borderColor: 'oklch(63.7% 0.237 25.331)',
        borderWidth: 0,
        borderRadius: 10,
        borderSkipped: false,
        hoverBackgroundColor: 'oklch(63.7% 0.237 25.331 / 0.9)',
        maxBarThickness: 60,
    };

    const multipleColors = [
        {
            backgroundColor: 'oklch(63.7% 0.237 25.331 / 0.8)',
            borderColor: 'oklch(63.7% 0.237 25.331)',
        },
        {
            backgroundColor: '#10B981',
            borderColor: '#059669',
        },
        {
            backgroundColor: '#F59E0B',
            borderColor: '#D97706',
        },
        {
            backgroundColor: '#3B82F6',
            borderColor: '#2563EB',
        },
        {
            backgroundColor: '#8B5CF6',
            borderColor: '#7C3AED',
        },
    ];

    const finalDatasets = multiple 
        ? datasets.map((ds, i) => ({
            ...defaultDataset,
            ...ds,
            backgroundColor: multipleColors[i]?.backgroundColor || defaultDataset.backgroundColor,
            borderColor: multipleColors[i]?.borderColor || defaultDataset.borderColor,
        }))
        : [defaultDataset];

    const chartData = {
        labels: labels || [],
        datasets: finalDatasets,
    };

    const options = {
        indexAxis: horizontal ? 'y' : 'x',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 800,
            easing: 'easeInOutQuart',
        },
        layout: {
            padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
            },
        },
        scales: {
            x: {
                grid: {
                    color: '#E5E7EB',
                    drawBorder: false,
                    lineWidth: 0.5,
                },
                ticks: {
                    font: {
                        size: 11,
                        family: "'Inter', system-ui, sans-serif",
                    },
                    color: '#6B7280',
                    padding: 8,
                },
                border: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: '#E5E7EB',
                    drawBorder: false,
                    lineWidth: 0.5,
                },
                ticks: {
                    font: {
                        size: 11,
                        family: "'Inter', system-ui, sans-serif",
                    },
                    color: '#6B7280',
                    padding: 8,
                },
                border: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    padding: 16,
                    usePointStyle: true,
                    pointStyleWidth: 8,
                    pointStyleHeight: 8,
                    pointStyleBorderRadius: 4,
                    font: {
                        size: 12,
                        family: "'Inter', system-ui, sans-serif",
                    },
                    color: '#6B7280',
                    boxWidth: 8,
                    boxHeight: 8,
                },
            },
            title: {
                display: !!title,
                text: title,
                align: 'start',
                font: {
                    size: 16,
                    weight: 'bold',
                    family: "'Inter', system-ui, sans-serif",
                },
                color: '#111827',
                padding: { bottom: 20 },
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
            },
        },
    };

    // Empty State
    if (!hasData) {
        return (
            <div className="w-full h-80 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <svg className="w-16 h-16 mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20V10" />
                    <path d="M12 20V4" />
                    <path d="M6 20v-6" />
                </svg>
                <p className="text-sm font-medium">Tidak ada data</p>
                <p className="text-xs mt-1">Data grafik akan muncul di sini</p>
            </div>
        );
    }

    return (
        <div className="w-full h-80 sm:h-96">
            <Bar data={chartData} options={options} />
        </div>
    );
}