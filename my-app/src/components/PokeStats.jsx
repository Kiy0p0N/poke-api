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
// (Chart.js requires manual registration of used components)
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

/**
 * PokeStats component
 * Displays a radar chart of Pokémon base stats using Chart.js
 * @param {Array} stats - Array of Pokémon stats objects from API (contains base_stat and stat.name)
 */
function PokeStats({ stats }) {
  // === Data Transformation ===
  // Extract stat names for labels (replace "-" with space for better readability)
  const labels = stats.map((s) => s.stat.name.replace("-", " "));

  // Extract base_stat values for the dataset
  const dataValues = stats.map((s) => s.base_stat);

  // Chart.js data object
  const data = {
    labels,
    datasets: [
      {
        label: "Base Stats",
        data: dataValues,
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Tailwind blue-500 with opacity
        borderColor: "rgba(59, 130, 246, 1)", // Blue border
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)", // Blue points
      },
    ],
  };

  // Chart.js configuration options
  const options = {
    responsive: true,
    scales: {
      r: {
        suggestedMin: 0, // Minimum value for radial scale
        suggestedMax: 150, // Maximum value (adjust based on Pokémon stat ranges)
        ticks: {
          stepSize: 25, // Step between grid lines
        },
        pointLabels: {
          font: {
            size: 12, // Font size for stat labels around the chart
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend for a cleaner look (we already know it's base stats)
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Radar chart rendering */}
      <Radar data={data} options={options} />
    </div>
  );
}

export default PokeStats;
