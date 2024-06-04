import axiosInstance from "@/api/axiosInstance";
import HOAggGrid from "@/components/grid/HOAggGrid";
import { Button } from "@/components/ui";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
// import PlaceholderActionCard from "@/components/reusables/PlaceholderActionCard";
import { useQuery } from "@tanstack/react-query";
import { createSearchParams, useNavigate } from "react-router-dom";

type Props = {};

const AggregatorApplicationsTable = (_: Props) => {
  const navigate = useNavigate();
  const aggApplications = useQuery({
    queryKey: ["get-agg-apps-history"],
    queryFn: () =>
      axiosInstance.get(`/applications/ho?limit=100000&page=1&type=AGGREGATOR`),
  });
  console.log(aggApplications.data?.data.data.applications);
  return (
    <div className="flex gap-4 flex-wrap p-5">
      {
        aggApplications.isSuccess &&
          aggApplications.data?.data.data.applications.length >= 1 && (
            <HOAggGrid
              data={aggApplications.data?.data.data.applications}
              isUpdating={aggApplications.isLoading}
            />
          )
        // aggApplications.data?.data.data.applications.map(
        //   (app: any, i: number) => <AggAppCard app={app} key={i} />
        // )
      }
      {/* Empty state */}
      {
        aggApplications.isSuccess &&
          aggApplications.data?.data.data.applications.length <= 0 && (
            <div className="flex justify-center bg-white/80 mx-auto min-h-screen">
              <div className="max-w-[500px] px-2 flex flex-col items-center pt-10">
                <img src="/assets/graphics/empty-box.svg" />
                <p className="text-center font-poppins text-lg font-semibold px-[10%] text-black-main">
                  There is no created{" "}
                  <span className="text-blue-main">application</span> yet on
                  your account
                </p>
                <Button
                  variant="default"
                  // disabled
                  className="bg-white h-10 shadow px-8 flex gap-4 justify-center items-center font-poppins mt-6"
                  onClick={() =>
                    navigate({
                      pathname: "/dashboard/applications/aggregator",
                      search: createSearchParams({
                        state: "aggregator-form",
                      }).toString(),
                    })
                  }
                >
                  <span className="text-white">Start Application</span>
                  <ArrowRightIcon
                    width={24}
                    className="text-white"
                    color="#FFFFFF"
                  />
                </Button>
                <p className="mt-10 text-blue-main text-center font-poppins italic">
                  “From 1990 to 2019, the total warming effect from greenhouse
                  gases added by humans to the Earth's atmosphere increased by
                  45 percent. The warming effect associated with carbon dioxide
                  alone increased by 36 percent.”
                </p>
              </div>
            </div>
          )
        // aggApplications.data?.data.data.applications.map(
        //   (app: any, i: number) => <AggAppCard app={app} key={i} />
        // )
      }
    </div>
  );
};

// const AggAppCard = ({ app }: { app: any }) => {
//   // const handleSubmit = (type: string) => {};

//   return (
//     <PlaceholderActionCard>
//       <p>ID: {app._id}</p>
//       <p>Retrofitting Type: {app.retrofittingType}</p>
//       <p>Aggregator Name: {app.aggregator.name}</p>
//       {/* <p>Email: {app.statuses.state}</p> */}
//       <p>Status: {app.currentState}</p>
//       <p>Application Stage: {app.appStage}</p>
//     </PlaceholderActionCard>
//   );
// };

export default AggregatorApplicationsTable;
