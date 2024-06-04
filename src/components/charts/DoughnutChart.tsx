import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// const options = {
//   plugins: {
//     legend: {
//       display: false,
//     },
//   },
//   radius: "90%",
// };

// const newdata = {
//     labels: ["Applicants Approved", "Applicants Declined"],
//     datasets: [
//       {
//         label: "No of Applicants",
//         data: [data.approved, data.declined],
//         backgroundColor: ["#8AC926", "#EF1E1E"],
//         borderColor: ["#8AC926", "#EF1E1E"],
//         borderWidth: 1,
//       },
//     ],
//   };

type Props = {
  options: {};
  data: {
    labels: any[];
    datasets: any[];
  };
};

const DoughnutChart = (props: Props) => {
  return <Doughnut data={props.data} options={props.options} />;
};

export default DoughnutChart;
