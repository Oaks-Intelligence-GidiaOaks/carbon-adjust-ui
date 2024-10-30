import { useQuery } from "@tanstack/react-query";
import BarChart from "@/components/charts/BarChart";
import { getEnergyChart } from "@/services/homeOwner";
import Loading from "@/components/reusables/Loading";
import { GoDownload } from "react-icons/go";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface UsageSummaryProps {
  buildingId: string[];
}

const UsageSummary = ({ buildingId }: UsageSummaryProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Fetch data from the API
  const { data: response, isLoading, error } = useQuery({
    queryKey: ["building-energy-chart", buildingId],
    queryFn: () => getEnergyChart(buildingId),
    enabled: buildingId.length > 0,
  });

  const aggregateEnergyBill = response?.data?.aggregate_energy_bill || {};
  const currentElectricityDemand = aggregateEnergyBill.current_electricity_demand || 0;
  const currentElectricityCharge = aggregateEnergyBill.current_electricity_charge || 0;
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
      x: { title: { display: true, text: "Energy Source" }, grid: { display: false } },
      y: { title: { display: true, text: "Demand" }, grid: { display: false }, min: 0, max: 1000 },
      y1: { type: "linear", position: "right", title: { display: true, text: "Charges (€)" }, grid: { drawOnChartArea: false }, min: 0, max: 800 },
    },
  };

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
        <Loading message="Aggregate Energy Bill loading..." />
      </div>
    );
  }
  if (error) return <div>Error loading data</div>;

  return (
    <div className="h-[400px] w-[90%]" ref={chartRef}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="font-semibold">Carbon Tracker</h3>
        <button
          onClick={downloadChart}
          className="flex items-center justify-center hover:bg-[#3465AF] hover:text-white w-fit text-sm gap-2 py-1 mt-2 md:mt-0 md:py-[6px] px-5 border-2 rounded-3xl text-gray-500 border-[#3465AF]"
        >
          <span>Download</span>
          <GoDownload />
        </button>
      </div>
      <BarChart data={data} options={options} />
    </div>
  );
};

export default UsageSummary;
