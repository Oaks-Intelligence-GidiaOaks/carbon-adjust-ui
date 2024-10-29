import { useQuery } from "@tanstack/react-query";
import LineChart from "@/components/charts/LineChart";
import { getEnergyChart } from "@/services/homeOwner";
import { useEffect, useRef } from "react";
import Loading from "@/components/reusables/Loading";
import { GoDownload } from "react-icons/go";
import html2canvas from "html2canvas";

interface LineChartProps {
  buildingId: string[];
}

const TrendingProjections = ({ buildingId }: LineChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Fetch data from the API
  const { data: response, isLoading, error } = useQuery({
    queryKey: ["building-energy-chart", buildingId],
    queryFn: () => getEnergyChart(buildingId),
    enabled: buildingId.length > 0,
  });

  // Log error if it exists
  useEffect(() => {
    if (error) {
      console.error("Error in useQuery:", error);
    }
  }, [error]);

  // Download chart as PNG
  const downloadChart = async () => {
    if (chartRef.current) {
      const originalHeight = chartRef.current.style.height; // Store original height
      chartRef.current.style.height = '600px'; // Increase height for download

      const canvas = await html2canvas(chartRef.current, {
        scale: 2, // For better quality
        useCORS: true,
        backgroundColor: null // Optional: For transparent backgrounds
      });

      // Reset the original height after capturing
      chartRef.current.style.height = originalHeight;

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "TrendingProjectionsChart.png";
      link.click();
    }
  };

  if (isLoading) {
    return (
      <div className="h-32 grid place-items-center">
        <Loading message="Transition score loading..." />
      </div>
    );
  }
  if (error) return <div>Error loading data</div>;

  const transitionScore = response?.data?.transition_score || {};

  const priceValues = [
    transitionScore.short?.price_trendline || 0,
    transitionScore.medium?.price_trendline || 0,
    transitionScore.long?.price_trendline || 0,
  ];

  const policyValues = [
    transitionScore.short?.policy_effect_trendline || 0,
    transitionScore.medium?.policy_effect_trendline || 0,
    transitionScore.long?.policy_effect_trendline || 0,
  ];

  const consumptionValues = [
    transitionScore.short?.consumption_trendline || 0,
    transitionScore.medium?.consumption_trendline || 0,
    transitionScore.long?.consumption_trendline || 0,
  ];

  const yMin = Math.min(...priceValues, ...policyValues) - 100;
  const yMax = Math.max(...priceValues, ...policyValues) + 100;
  const y1Min = Math.min(...consumptionValues) - 100;
  const y1Max = Math.max(...consumptionValues) + 100;

  const data = {
    labels: ["Short", "Medium", "Long"],
    datasets: [
      {
        label: "Price Trendline",
        data: priceValues,
        lineTension: 0.2,
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        pointRadius: 5,
      },
      {
        label: "Policy Effect Trendline",
        data: policyValues,
        lineTension: 0.2,
        borderColor: "#33FF57",
        backgroundColor: "rgba(51, 255, 87, 0.2)",
        pointRadius: 5,
      },
      {
        label: "Consumption Trendline",
        data: consumptionValues,
        lineTension: 0.2,
        borderColor: "#3357FF",
        backgroundColor: "rgba(51, 87, 255, 0.2)",
        pointRadius: 5,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top", labels: { boxWidth: 10 } },
      title: { display: true, text: "Trending Projections" },
    },
    scales: {
      x: {
        title: { display: true, text: "Term" },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: "Price and Policy Effect Trendline" },
        grid: { display: false },
        min: yMin,
        max: yMax,
      },
      y1: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Consumption Trendline" },
        grid: { drawOnChartArea: false },
        min: y1Min,
        max: y1Max,
      },
    },
  };

  return (
    <div className="h-[500px] w-[90%]" ref={chartRef}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="font-semibold">Transition Score</h3>
        <button
          onClick={downloadChart}
          className="flex items-center justify-center  hover:bg-[#3465AF] hover:text-white w-fit text-sm gap-2 py-1 mt-2 md:mt-0 md:py-[6px] px-5 border-2 rounded-3xl text-gray-500 border-[#3465AF]"
        >
         <span className="inline-block">Download</span>
         <GoDownload className="inline-block" />
        </button>
      </div>
      <LineChart data={data} options={options} />
    </div>
  );
};

export default TrendingProjections;
