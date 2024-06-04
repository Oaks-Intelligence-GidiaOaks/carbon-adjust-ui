import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         barThickness: 20,
//         grid: {
//           display: false,
//         },
//       },

//       y: {
//         barThickness: 10,
//         grid: {
//           display: false,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//         position: "top",
//       },
//       title: {
//         display: false,
//         text: "Chart.js Bar Chart",
//       },
//     },
//   };

type Props = {
  options: {};
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      lineTension: number;
      borderColor: string;
      backgroundColor: string;
      pointRadius: number;
    }[];
  };
};

const LineChart = (props: Props) => {
  return <Line options={props.options} data={props.data} />;
};

export default LineChart;
