import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieChartProps {
  data: any;
  options?: any;
}

const PieChart: React.FC<PieChartProps> = ({ data, options }) => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
