import { useQuery } from "@tanstack/react-query";
import BarChart from "@/components/charts/BarChart";
import { getOptimizeChart } from "@/services/homeOwner";
import Loading from "@/components/reusables/Loading";
import { AiOutlineDownload } from "react-icons/ai";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { Button } from "@/components/ui";

interface TransportBarChartProps {
  ids: string;
}

const TransportBarChart = ({ ids }: TransportBarChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Fetch data from the API
  const { data: response, isLoading } = useQuery({
    queryKey: ["optimize-chart", ids],
    queryFn: () => getOptimizeChart(ids),
    enabled: ids.length > 0,
  });

  const aggregateEnergyBill = response?.data?.aggregate_energy_bill || {};
  const currentElectricityDemand =
    aggregateEnergyBill.current_electricity_demand || 0;
  const currentElectricityCharge =
    aggregateEnergyBill.current_electricity_charge || 0;
  const currentGasDemand = aggregateEnergyBill.current_gas_demand || 0;
  const currentGasCharge = aggregateEnergyBill.current_gas_charge || 0;

  const data = {
    labels: ["Electricity", "Gas"],
    datasets: [
      {
        label: "Demand",
        data: [currentElectricityDemand, currentGasDemand],
        backgroundColor: "rgba(54, 162, 235)",
        yAxisID: "y",
      },
      {
        label: "Charges",
        data: [currentElectricityCharge, currentGasCharge],
        backgroundColor: "rgba(255, 206, 86)",
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top", labels: { boxWidth: 10 } },
      title: { display: true, text: "Current Usage Summary" },
    },
    scales: {
      x: {
        title: { display: true, text: "Energy Source" },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: "Demand" },
        grid: { display: false },
        min: 0,
        max: 1000,
      },
      y1: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Charges (€)" },
        grid: { drawOnChartArea: false },
        min: 0,
        max: 800,
      },
    },
  };

  const downloadChart = async () => {
    if (chartRef.current) {
      const originalHeight = chartRef.current.style.height; // Store original height
      chartRef.current.style.height = "600px"; // Increase height for download

      const canvas = await html2canvas(chartRef.current, {
        scale: 2, // For better quality
        useCORS: true,
        backgroundColor: null, // Optional: For transparent backgrounds
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
        <Loading message="Aggregate Energy Bill loading..." />
      </div>
    );
  }

  return (
    <div className=" flex flex-col bg-[#Fff] border rounded-lg p-5 mt-5">
      <div className="flex justify-between items-center mt-2 mb-5 sm:px-5">
        <h3 className="font-semibold">Carbon Tracker</h3>
        <Button
          onClick={downloadChart}
          variant={"outline"}
          className="rounded-[20px] border-cyan-700 flex-center gap-1 py-3 h-[20px] text-sky-900"
        >
          <span>Download</span>
          <AiOutlineDownload />
        </Button>
      </div>
      <div ref={chartRef}>
        <BarChart data={data} options={options} />
      </div>
    </div>
  );
};

export default TransportBarChart;
