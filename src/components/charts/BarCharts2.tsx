
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  options: any;
  data: {
    labels: string[];
    datasets: any[];
  };
};

const BarChart = (props: Props) => {
  return (
    <div style={{ width: "300px", height: '500px', overflow: "hidden" }}>
      {/* Adjust width here */}
      <Bar options={props.options} data={props.data} />
    </div>
  );
};

export default BarChart;
