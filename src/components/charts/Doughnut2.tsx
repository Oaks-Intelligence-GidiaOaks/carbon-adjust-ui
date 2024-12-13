import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DoughnutChartProps {
  data: any; // Chart.js data object
  options?: any; // Chart.js options object
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options }) => {
  const defaultOptions = {
    maintainAspectRatio: false, // Disables the default aspect ratio
    plugins: {
      legend: {
        position: "bottom", // Moves legend below the chart
        labels: {
          boxWidth: 15, // Smaller legend box size
        },
      },
    },
    ...options, // Merges any custom options passed as props
  };

  return (
    <div style={{ width: "200px", height: "200px" }}>
      <Doughnut data={data} options={defaultOptions} />
    </div>
  );
};

export default DoughnutChart;
