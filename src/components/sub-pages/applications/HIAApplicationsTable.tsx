import axiosInstance from "@/api/axiosInstance";
import HOHIAGrid from "@/components/grid/HOHIAGrid";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const HIAApplicationsTable = (_: Props) => {
  const hiaApplications = useQuery({
    queryKey: ["get-hia-apps-history"],
    queryFn: () =>
      axiosInstance.get(`/applications/ho?limit=10000&page=1&type=HIA`),
  });
  console.log(hiaApplications.data?.data.data.applications);
  return (
    <div className="flex gap-4 flex-wrap p-5">
      {
        hiaApplications.isSuccess &&
          hiaApplications.data?.data.data.applications.length >= 1 && (
            <HOHIAGrid
              data={hiaApplications.data?.data.data.applications}
              isUpdating={hiaApplications.isLoading}
            />
          )
        // aggApplications.data?.data.data.applications.map(
        //   (app: any, i: number) => <AggAppCard app={app} key={i} />
        // )
      }
    </div>
  );
};
export default HIAApplicationsTable;
