import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/reusables/Loading";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { GoDownload } from "react-icons/go";
import { getPurchasesChart } from "@/services/homeOwner";
import BarChart from "@/components/charts/BarCharts2";

interface UsageSummaryProps {
  purchaseId: string[];
}

const UsageSummary = ({ purchaseId }: UsageSummaryProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const { data: response, isLoading, error } = useQuery({
    queryKey: ["purchase-chart", purchaseId],
    queryFn: () => getPurchasesChart(purchaseId),
  });

  const totalCummulativeScope = response?.data?.total_cummulative_scope || {};
  const data = {
    labels: ["Electricity"],
    datasets: [
      {
        label: "Scope 1",
        data: [totalCummulativeScope.scope_1 || 0],
        backgroundColor: "rgba(255, 99, 132, 0.8)", // Color for Scope 1
      },
      {
        label: "Scope 2",
        data: [totalCummulativeScope.scope_2 || 0],
        backgroundColor: "rgba(54, 162, 235, 0.8)", // Color for Scope 2
      },
      {
        label: "Scope 3",
        data: [totalCummulativeScope.scope_3 || 0],
        backgroundColor: "rgba(75, 192, 192, 0.8)", // Color for Scope 3
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
        labels: {
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: "Electricity Usage by Scope",
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Energy Source",
        },
        grid: {
          display: false,
        },
        barThickness: 10, // Reduced bar width
        maxBarThickness: 15, // Maximum allowed width for the bars
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Emissions (tCO2e)",
        },
        grid: {
          display: false,
        },
      },
    },
  };
  

  const downloadChart = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "white",
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "ElectricityUsageChart.png";
      link.click();
    }
  };

  if (isLoading) {
    return (
      <div className="h-32 grid place-items-center">
        <Loading message="Loading data..." />
      </div>
    );
  }

  if (error) return <div>Error loading data</div>;

  return (
    <div className="" ref={chartRef}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Electricity Usage</h3>
        <button
          onClick={downloadChart}
          className="flex items-center text-sm gap-2 py-1 px-5 border-2 rounded-3xl hover:bg-blue-600 hover:text-white"
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
