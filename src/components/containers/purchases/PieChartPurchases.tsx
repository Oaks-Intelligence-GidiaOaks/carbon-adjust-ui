import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/reusables/Loading";
import { getPurchasesChart } from "@/services/homeOwner";
import DoughnutChart from "@/components/charts/Doughnut2";

interface UsageSummaryProps {
  purchaseId: string[];
}

const DoughnutUsageSummary = ({ purchaseId }: UsageSummaryProps) => {
  const { data: response, isLoading, error } = useQuery({
    queryKey: ["purchase-chart", purchaseId],
    queryFn: () => getPurchasesChart(purchaseId),
  });

  if (isLoading) {
    return (
      <div className="h-32 grid place-items-center">
        <Loading message="Loading data..." />
      </div>
    );
  }

  if (error) return <div>Error loading data</div>;

  // Extract data for doughnut charts
  const totalCummulativeScope = response?.data?.total_cummulative_scope || {};
  const totalEmissionCategory = response?.data?.total_emission_category || {};

  // Data for Doughnut Chart 1: Total Cumulative Scope
  const totalCummulativeScopeData = {
    labels: ["Scope 1", "Scope 2", "Scope 3"],
    datasets: [
      {
        data: [
          totalCummulativeScope.scope_1 || 0,
          totalCummulativeScope.scope_2 || 0,
          totalCummulativeScope.scope_3 || 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Data for Doughnut Chart 2: Total Emission Category
  const emissionCategoryLabels = Object.keys(totalEmissionCategory);
  const emissionCategoryValues = Object.values(totalEmissionCategory);
  const totalEmissionCategoryData = {
    labels: emissionCategoryLabels,
    datasets: [
      {
        data: emissionCategoryValues,
        backgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF", "#FF6384"],
        hoverBackgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF", "#FF6384"],
      },
    ],
  };

  // Check if datasets are empty
  const isTotalCummulativeScopeEmpty =
    totalCummulativeScopeData.datasets[0].data.every((value) => value === 0);
  const isTotalEmissionCategoryEmpty =
    totalEmissionCategoryData.datasets[0].data.every((value) => value === 0);

  // Default Empty Chart Data
  const emptyChartData = {
    labels: ["No Data"],
    datasets: [
      {
        data: [1],
        backgroundColor: ["#E0E0E0"], // Grey color for the empty state
        hoverBackgroundColor: ["#E0E0E0"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Doughnut Chart 1 */}
      <div className="flex flex-col items-center">
        <h3 className="font-semibold mb-4">Total Cumulative Scope</h3>
        <DoughnutChart
          data={isTotalCummulativeScopeEmpty ? emptyChartData : totalCummulativeScopeData}
        />
      </div>

      {/* Doughnut Chart 2 */}
      <div className="flex flex-col items-center">
        <h3 className="font-semibold mb-4">Total Emission Categories</h3>
        <DoughnutChart
          data={isTotalEmissionCategoryEmpty ? emptyChartData : totalEmissionCategoryData}
        />
      </div>
    </div>
  );
};

export default DoughnutUsageSummary;

