import axiosInstance from "@/api/axiosInstance";
// import HOAggGrid from "@/components/grid/HOAggGrid";
// import HOFinanceGrid from "@/components/grid/HOFinanceGrid";
import HOInsuranceGrid from "@/components/grid/HOInsuranceGrid";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const InsuranceApplications = (_: Props) => {
  const insApplications = useQuery({
    queryKey: ["get-ins-apps-history"],
    queryFn: () =>
      axiosInstance.get(`/applications/ho?limit=10000&page=1&type=INSURANCE`),
  });

  // console.log(insApplications?.data.data);
  // console.log(finApplications.data?.data.data.applications);
  return (
    <div className="flex gap-4 flex-wrap p-5 ">
      {
        insApplications.isSuccess &&
          insApplications.data?.data.data.applications.length >= 1 && (
            <HOInsuranceGrid
              data={insApplications.data?.data.data.applications}
              isUpdating={insApplications.isLoading}
            />
          )
        // aggApplications.data?.data.data.applications.map(
        // (app: any, i: number) => <AggAppCard app={app} key={i} />
        // )
      }
    </div>
  );
};

export default InsuranceApplications;

// HOInsuranceGrid
