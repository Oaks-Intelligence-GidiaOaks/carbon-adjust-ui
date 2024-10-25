import { useQuery} from "@tanstack/react-query"; 
import LineChart from "@/components/charts/LineChart";
import { getEnergyChart } from '@/services/homeOwner';
import { useEffect } from "react";
import Loading from "@/components/reusables/Loading";
import { GoDownload } from "react-icons/go";

interface LineChartProps {
  buildingId: string;
}


const TrendingProjections = ({ buildingId }: LineChartProps) => {
  const { data: response, isLoading, error } = useQuery({
    queryKey: ["building-energy-chart", buildingId],
    queryFn: () => getEnergyChart(buildingId),
    enabled: !!buildingId, 
  });

 

  // Log error if it exists
  useEffect(() => {
    if (error) {
      console.error("Error in useQuery:", error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="h-32 grid place-items-center">
        <Loading message="Transition score loading..." />
      </div>
    );
  }
  if (error) return <div>Error loading data</div>;


  const transitionScore = response?.data?.[0]?.transitionScore || {};
  console.log("hello", response)
  
  const data = {
    labels: ["Short", "Medium", "Long"], // X-axis labels
    datasets: [
      {
        label: "Price Trendline",
        data: [
          transitionScore.short?.priceTrendLine || 0,
          transitionScore.medium?.priceTrendLine || 0,
          transitionScore.long?.priceTrendLine || 0
        ],
        lineTension: 0.2, 
        borderColor: "#FF5733", 
        backgroundColor: "rgba(255, 87, 51, 0.2)", 
        pointRadius: 5, 
      },
      {
        label: "Policy Effect Trendline",
        data: [
          transitionScore.short?.policyEffectTrendLine || 0,
          transitionScore.medium?.policyEffectTrendLine || 0,
          transitionScore.long?.policyEffectTrendLine || 0
        ], 
        lineTension: 0.2,
        borderColor: "#33FF57",
        backgroundColor: "rgba(51, 255, 87, 0.2)",
        pointRadius: 5,
      },
      {
        label: "Consumption Trendline",
        data: [
          transitionScore.short?.consumptionTrendline || 0,
          transitionScore.medium?.consumptionTrendline || 0,
          transitionScore.long?.consumptionTrendline || 0
        ],
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
      legend: {
        display: true,
        position: "top",
        labels: { boxWidth: 10 },
      },
      title: {
        display: true,
        text: "Trending Projections",
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Term" },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: "Value" },
        grid: { display: false },
        min: 950,
        max: 1150,
      },
      y1: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Consumption Trendline" },
        grid: { drawOnChartArea: false },
        min: 1700,
        max: 1900,
      },
    },
  };

  return (
    <div className="h-[500px] w-[90%]">
      <div className="flex flex-col md:flex-row justify-between items-center">
      <h3 className="font-semibold">Transition Score</h3>
      <button
                
                className="flex-center w-fit text-sm gap-2 py-1 mt-2 md:mt-0 md:py-[6px] px-5 border-2 rounded-3xl  text-gray-500 border-[#3465AF]"
              >
             
                <span>Download</span>
                <GoDownload />
              </button>
      </div>
      
      <LineChart data={data} options={options} />
    </div>
  );
};

export default TrendingProjections;
