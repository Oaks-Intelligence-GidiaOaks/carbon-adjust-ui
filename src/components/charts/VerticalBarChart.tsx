import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: "Poppins", // Add your font here to change the font of your legend label
        },
      },
    },
    y: {
      ticks: {
        font: {
          family: "Poppins", // Add your font here to change the font of your legend label
        },
      },
    },
  },
};

const labels = ["Insulation", "Flexible", "Energy Efficiency", "Others"];

export type RetrofittingAnalyticsProps = {
  // heating: number;
  insulation: number;
  energy_efficieny: number;
  // solar: number;
  flexible: number;
  others: number;
};

export function VerticalBarChart(chartData: RetrofittingAnalyticsProps) {
  const rawData = chartData;

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: [
          // rawData.heating,
          // rawData.solar,
          rawData.insulation,
          rawData.flexible,
          rawData.energy_efficieny,
          rawData.others,
        ],
        backgroundColor: "rgba(206, 231, 253, 1)",
        hoverBackgroundColor: "rgba(14, 136, 246, 1)",
        borderRadius: 10,
        width: 20,
        maxBarThickness: 33,
      },
    ],
  };

  return <Bar width={"100%"} options={options} data={data} />;
}
