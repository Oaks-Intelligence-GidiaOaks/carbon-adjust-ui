import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Dataset = {
  data: number[];
  backgroundColor: string[];
  borderWidth: number;
};

type GaugeChartProps = {
  Text: string | React.ReactNode;
  data: {
    labels: string[];
    datasets: Dataset[];
  };
  textColor: string;
};
const GaugeChart = ({ Text, data, textColor }: GaugeChartProps) => {
  // const data = {
  //   labels: ["Filled", "Empty"],
  //   datasets: [
  //     {
  //       data: { chartData },
  //       backgroundColor: ["#4caf50", "#e0e0e0"],
  //       borderWidth: 0,
  //     },
  //   ],
  // };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
    cutout: "70%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: false,
      },

      customText: {
        id: "customText",
        beforeDraw: (chart: any) => {
          const ctx = chart.ctx;
          const width = chart.width;
          const height = chart.height;
          ctx.restore();

          // Calculate the font size relative to the chart height
          const fontSize = (height / 120).toFixed(2);
          ctx.font = `${fontSize}em sans-serif`;
          ctx.textBaseline = "middle";

          const text = Text;
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 1.2;

          ctx.fillStyle = textColor;
          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      },
    },
  };

  return (
    <Doughnut
      data={data}
      options={options}
      plugins={[options.plugins.customText]}
    />
  );
};

export default GaugeChart;
