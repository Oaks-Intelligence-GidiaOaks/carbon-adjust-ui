import { useQuery } from "@tanstack/react-query";
import { getEnergyChart } from "@/services/homeOwner";
import { useEffect } from "react";
import Loading from "@/components/reusables/Loading";
import { GoDownload } from "react-icons/go";
import { GuageChart } from "@/components/charts";

interface GuaugeChartProps {
  buildingId: string;
}

const CarbonFootPrint = ({ buildingId }: GuaugeChartProps) => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
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
        <Loading message="Carbon Footprint score loading..." />
      </div>
    );
  }
  if (error) return <div>Error loading data</div>;

  const carbonFootprintTracker =
    response?.data?.[0]?.carbonFootprintTracker || {};

//   const averageFootprint = carbonFootprintTracker.averageFootprint || 0;
  const carbonFootprint = carbonFootprintTracker.carbonFootprint || 0;
  const highFootprint = carbonFootprintTracker.highFootprint || 0;

  const data = {
    labels: ["Filled", "Empty"],
    datasets: [
      {
        data: [carbonFootprint, 100],
        backgroundColor: ["#4caf50", "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="h-fit">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="font-semibold">Carbon Footprint Score</h3>
        <button className="flex-center w-fit text-sm gap-2 py-1 mt-2 md:mt-0 md:py-[6px] px-5 border-2 rounded-3xl  text-gray-500 border-[#3465AF]">
          <span>Download</span>
          <GoDownload />
        </button>
      </div>

      <div className="mx-auto my-3 py-5 h-[200px] w-[70%] md:w-full ">
        <GuageChart data={data} Text={`${highFootprint} M`} textColor={"#4caf50"} />
      </div>
    </div>
  );
};

export default CarbonFootPrint;
