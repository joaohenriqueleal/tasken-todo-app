import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

import timestampToDayMonth from "../../utils/timestampToDayMonth";
import LegendMessage from "../ui/Legend";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function ChartSWDPD({ days }) {
    const maxBars = 14
    let sorted = [...days].sort((a, b) => a.time - b.time);

    if (sorted.length > maxBars) {
        sorted = sorted.slice(sorted.length - maxBars);
    }

    const labels = sorted.map(d =>
        timestampToDayMonth(d.time)
    );

    const scores = sorted.map(d => d.scores);

    const data = {
        labels,
        datasets: [
            {
                label: "EXP. por dia",
                data: scores,
                backgroundColor: "#00ff88",
                borderColor: "#00995c",
                borderWidth: 2,
                borderRadius: 6
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "#ffffff"
                }
            }
        },
        scales: {
            x: {
                ticks: { color: "#ffffff" },
                grid: { display: false },

                barPercentage: 0.5,
                categoryPercentage: 0.5
            },
            y: {
                ticks: { color: "#ffffff" },
                grid: { color: "rgba(255,255,255,0.2)" },
                beginAtZero: true
            }
        }
    };

    return (
        <div className="w-full h-75 flex items-center justify-center">
            {days.length > 0 ? (
                <Bar data={data} options={options} />
            ) : (
                <LegendMessage
                    extraStyles='text-white text-xl font-bold'
                    text='Nenhum dia finalizado encontrado.'
                />
            )}
        </div>
    );
}
