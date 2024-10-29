import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

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
  const [radiusMultiplier, setRadiusMultiplier] = useState(1.5);
  const [verticalOffset, setVerticalOffset] = useState(85);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadiusMultiplier(0); // Adjust for smaller screens
        setVerticalOffset(70); // Adjust for smaller screens
      } else {
        setRadiusMultiplier(1.5); // Adjust for larger screens
        setVerticalOffset(85); // Adjust for larger screens
      }
    };

    // Set initial values based on screen size
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90, // Keep default rotation for chart itself
    circumference: 180, // Cover half-circle only
    cutout: "70%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      customText: {
        id: "customText",
        afterDraw: (chart: any) => {
          const ctx = chart.ctx;
          const { width, height } = chart;
          ctx.save();

          // Centered text in the middle of the doughnut chart
          ctx.font = `${(height / 10).toFixed(2)}px sans-serif`;
          ctx.textBaseline = "middle";
          ctx.fillStyle = textColor;
          const text = Text;
          const textX = width / 2 - ctx.measureText(text).width / 2;
          const textY = height * 0.7;
          ctx.fillText(text, textX, textY);

          // Custom labels on the outer hemisphere from bottom-left to bottom-right
          const labels = ["0", "0.25M", "0.5M", "0.75M", "1M"];
          const radius = radiusMultiplier * ((height - height * 0.3) / 2);

          // Angle offset to start labels from the bottom-left
          const startAngle = Math.PI;

          ctx.font = `${(height / 22).toFixed(2)}px sans-serif`;
           ctx.fillStyle = "black";

          labels.forEach((label, index) => {
            // Calculate the angle for each label position
            const angle = startAngle + (Math.PI / (labels.length - 1)) * index;
            const x = width / 2 + Math.cos(angle) * radius;
            const y = height / 2 + Math.sin(angle) * radius + verticalOffset;
            ctx.fillText(label, x - ctx.measureText(label).width / 2, y);
          });

          ctx.restore();
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
