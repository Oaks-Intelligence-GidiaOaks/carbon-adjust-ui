import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  // Title,
  // Tooltip,
  // Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import { faker } from "@faker-js/faker";
// import { defaults } from 'react-chartjs-2';

// defaults.font.family = 'font name...';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
  // Title
  // Tooltip
  // Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    // title: {
    //   display: true,
    //   text: "Chart.js Line Chart - Multi Axis",
    // },
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.4, // bezier curves
    },
  },
  tooltips: {
    font: {
      family: "Poppins", // Add your font here to change the font of your legend label
    },
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      min: 0,
      position: "left" as const,
      ticks: {
        font: {
          family: "Poppins", // Add your font here to change the font of your legend label
        },
      },
    },
    x: {
      ticks: {
        font: {
          family: "Poppins", // Add your font here to change the font of your legend label
        },
      },
    },
    // y1: {
    //   type: "linear" as const,
    //   display: true,
    //   position: "right" as const,
    //   grid: {
    //     drawOnChartArea: false,
    //   },
    // },
  },
};

export type StackedChartProps = {
  completed?: { month: string; year: number; count: number }[];
  cancelled?: { month: string; year: number; count: number }[];
  pending?: { month: string; year: number; count: number }[];
  processing?: { month: string; year: number; count: number }[];
};

export function StackedLineChart({
  completed,
  cancelled,
  pending,
  processing,
}: StackedChartProps) {
  const labels: string[] = [];

  pending?.forEach((val) => labels.push(val.month));

  const data = {
    labels,
    datasets: [
      {
        label: "Pending",
        data: pending?.map((app) => app.count),
        borderColor: "rgb(243, 245, 255, 0.7)",
        backgroundColor: "rgba(243, 245, 255, 0.7)",
        yAxisID: "y",
        fill: true,
      },
      {
        label: "Completed",
        data: completed?.map((app) => app.count),
        borderColor: "rgb(55,215,75, 0.3)",
        backgroundColor: "rgba(55,215,75, 0.3)",
        yAxisID: "y",
        fill: true,
      },
      {
        label: "Cancelled",
        data: cancelled?.map((app) => app.count),
        borderColor: "rgb(254, 1, 6, 0.3)",
        backgroundColor: "rgba(254, 1, 6, 0.3)",
        yAxisID: "y",
        fill: true,
      },
      {
        label: "Processing",
        data: processing?.map((app) => app.count),
        borderColor: "rgb(255,215,75)",
        backgroundColor: "rgba(255,215,75)",
        yAxisID: "y",
        fill: true,
      },
    ],
  };
  return <Line width={"100%"} height={"100%"} options={options} data={data} />;
}
