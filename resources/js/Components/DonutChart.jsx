import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({ title, labels, data }) {
    const hasData = data && data.length > 0 && data.some(value => value > 0);

    const total = data ? data.reduce((sum, val) => sum + val, 0) : 0;

    const chartData = {
        labels: labels || [],
        datasets: [{
            data: data || [],
            backgroundColor: [
                'oklch(63.7% 0.237 25.331)',   // Primary
                '#10B981',                       // Emerald
                '#F59E0B',                       // Amber
                '#EF4444',                       // Red
                '#3B82F6',                       // Blue
                '#8B5CF6',                       // Violet
                '#EC4899',                       // Pink
                '#06B6D4',                       // Cyan
            ],
            borderColor: '#ffffff',
            borderWidth: 3,
            hoverBorderColor: '#ffffff',
            hoverBorderWidth: 4,
            borderRadius: 4,
            hoverBorderRadius: 6,
            spacing: 2,
            cutout: '65%',
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                    padding: 18,
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
                        const value = context.parsed;
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        return ` ${context.label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    // Center Text Plugin
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: (chart) => {
            const { width, height, ctx } = chart;
            ctx.restore();
            
            const fontSize = (height / 140).toFixed(2);
            ctx.font = `bold ${fontSize}em 'Inter', system-ui, sans-serif`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            
            // Total angka
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--tw-text-opacity') 
                ? '#111827' 
                : '#111827';
            ctx.fillText(total, width / 2, height / 2 - 8);
            
            // Label kecil
            ctx.font = `${(fontSize * 0.5).toFixed(2)}em 'Inter', system-ui, sans-serif`;
            ctx.fillStyle = '#6B7280';
            ctx.fillText('Total', width / 2, height / 2 + 16);
            
            ctx.save();
        },
    };

    // Empty State
    if (!hasData) {
        return (
            <div className="w-full h-72 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <svg className="w-16 h-16 mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="5" />
                </svg>
                <p className="text-sm font-medium">Tidak ada data</p>
                <p className="text-xs mt-1">Data akan muncul di sini</p>
            </div>
        );
    }

    return (
        <div className="w-full h-72 sm:h-80">
            <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />
        </div>
    );
}