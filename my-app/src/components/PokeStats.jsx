import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components for Radar chart
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function PokeStats({ stats }) {
  // Transform API data into Chart.js format
  const labels = stats.map((s) => s.stat.name.replace("-", " ")); // ex: "special-attack" -> "special attack"
  const dataValues = stats.map((s) => s.base_stat);

  const data = {
    labels,
    datasets: [
      {
        label: "Base Stats",
        data: dataValues,
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Tailwind blue-500 with opacity
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 150,
        ticks: {
          stepSize: 25,
        },
        pointLabels: {
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend for a cleaner look
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
}

export default PokeStats;
