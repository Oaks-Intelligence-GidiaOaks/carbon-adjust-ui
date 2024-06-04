import axiosInstance from "@/api/axiosInstance";
// import HOAggGrid from "@/components/grid/HOAggGrid";
import HOFinanceGrid from "@/components/grid/HOFinanceGrid";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const FinanceApplications = (_: Props) => {
  const finApplications = useQuery({
    queryKey: ["get-fin-apps-history"],
    queryFn: () =>
      axiosInstance.get(
        `/applications/ho?limit=10000&page=1&type=FINANCIAL_INSTITUTION`
      ),
  });
  // console.log(finApplications.data?.data.data.applications);
  return (
    <div className="flex gap-4 flex-wrap p-5 ">
      {
        finApplications.isSuccess &&
          finApplications.data?.data.data.applications.length >= 1 && (
            <HOFinanceGrid
              data={finApplications.data?.data.data.applications}
              isUpdating={finApplications.isLoading}
            />
          )
        // aggApplications.data?.data.data.applications.map(
        //   (app: any, i: number) => <AggAppCard app={app} key={i} />
        // )
      }
    </div>
  );
};

export default FinanceApplications;
