import { GuageChart } from "@/components/charts";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui";
import { AiOutlineDownload } from "react-icons/ai";
import { getOptimizeChart } from "@/services/homeOwner";
import Loading from "@/components/reusables/Loading";
import { useRef } from "react";
import html2canvas from "html2canvas";

interface TransportChartCardProps {
  ids: string;
}

const TransportChartCard: React.FC<TransportChartCardProps> = ({ ids }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const { data: response, isLoading } = useQuery({
    queryKey: ["optimize-chart", ids],
    queryFn: () => getOptimizeChart(ids),
    enabled: ids.length > 0,
  });

  const carbonFootprintTracker = response?.data?.carbon_footprint_tracker || {};
  const carbonFootprint = Math.round(
    carbonFootprintTracker.carbon_footprint || 0
  );
  const highFootprint = Math.round(
    carbonFootprintTracker.high_footprint || 100
  );

  const filledValue = Math.min(carbonFootprint, highFootprint);
  const emptyValue = highFootprint - filledValue;

  const downloadChart = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "CarbonFootprintChart.png";
      link.click();
    }
  };

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
    <div className="flex flex-col bg-[#Fff] border rounded-lg p-5 mt-5 ">
      <div className="flex justify-between items-center my-2 sm:px-5">
        <div className="flex  ">
          <h3 className="font-semibold">Bill Summary</h3>
        </div>

        <div className="flex ">
          <Button
            onClick={downloadChart}
            variant={"outline"}
            className="rounded-[20px] border-cyan-700 flex-center gap-1 py-3 h-[20px] text-sky-900"
          >
            <span>Download</span>
            <AiOutlineDownload />
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="h-32 grid place-items-center">
          <Loading message="Carbon Footprint score loading..." />
        </div>
      ) : (
        <div
          className="flex items-center justify-center mx-auto my-3 py-5 h-[250px] sm:w-full w-[300px]"
          ref={chartRef}
        >
          <GuageChart
            data={data}
            Text={`${filledValue} M`}
            textColor={"#4caf50"}
          />
        </div>
      )}
    </div>
  );
};

export default TransportChartCard;
