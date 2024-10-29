import { useQuery } from "@tanstack/react-query";
import { getEnergyChart } from "@/services/homeOwner";
import { useEffect, useRef } from "react";
import Loading from "@/components/reusables/Loading";
import { GoDownload } from "react-icons/go";
import { GuageChart } from "@/components/charts";
import html2canvas from "html2canvas";

interface GuaugeChartProps {
  buildingId: string[];
}

const CarbonFootPrint = ({ buildingId }: GuaugeChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Fetch data from the API
  const { data: response, isLoading, error } = useQuery({
    queryKey: ["building-energy-chart", buildingId],
    queryFn: () => getEnergyChart(buildingId),
    enabled: buildingId.length > 0,
  });

  useEffect(() => {
    if (error) {
      console.error("Error in useQuery:", error);
    }
  }, [error]);

  const downloadChart = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "CarbonFootprintChart.png";
      link.click();
    }
  };

  if (isLoading) {
    return (
      <div className="h-32 grid place-items-center">
        <Loading message="Carbon Footprint score loading..." />
      </div>
    );
  }
  if (error) return <div>Error loading data</div>;

  const carbonFootprintTracker = response?.data?.carbon_footprint_tracker || {};
  const carbonFootprint = Math.round(carbonFootprintTracker.carbon_footprint || 0);
  const highFootprint = Math.round(carbonFootprintTracker.high_footprint || 100);

  const filledValue = Math.min(carbonFootprint, highFootprint);
  const emptyValue = Math.max(0, highFootprint - filledValue);

  const data = {
    labels: ["Filled", "Empty"],
    datasets: [
      {
        data: [filledValue, emptyValue],
        backgroundColor: ["#4caf50", "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="h-[300px] w-[90%]" ref={chartRef}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="font-semibold">Carbon Footprint Score</h3>
        <button
          onClick={downloadChart}
          className="flex items-center justify-center hover:bg-[#3465AF] hover:text-white w-fit text-sm gap-2 py-1 mt-2 md:mt-0 md:py-[6px] px-5 border-2 rounded-3xl text-gray-500 border-[#3465AF]"
        >
          <span>Download</span>
          <GoDownload />
        </button>
      </div>

      <div className="mx-auto my-3 py-5 h-[200px] w-[70%] md:w-full ">
        <GuageChart data={data} Text={`${filledValue} M`} textColor={"#4caf50"} />
      </div>
    </div>
  );
};

export default CarbonFootPrint;
