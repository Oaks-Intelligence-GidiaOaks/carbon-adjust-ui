import { FC } from "react";
import OrgDashboardDetailsCard from "@/components/reusables/OrgDashboardDetailsCard";
import { formatLargeNumber } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import AggregatorDatabaseGrid from "@/components/grid/AggregatorDatabaseGrid";
import MainActionSubHeader from "@/components/reusables/MainActionSubHeader";
import { StackedLineChart } from "@/components/charts/StackedLineChart";
// import { Dropdown } from "@/components/ui";
import Loading from "@/components/reusables/Loading";

const Dashboard: FC = () => {
  const aggApplications = useQuery({
    queryKey: ["get-applications"],
    queryFn: () => axiosInstance.get(`/applications/aggregator`),
  });

  // const [yearSelector, setYearSelector] = useState({
  //   label: new Date().getFullYear(),
  //   value: new Date().getFullYear(),
  // });

  const aggregatorDashboardData = useQuery({
    queryKey: ["get-agg-dashboard-data"],
    queryFn: () => axiosInstance.get(`/users/agg/home`),
  });

  console.log(aggregatorDashboardData.data);

  return (
    <>
      {aggregatorDashboardData.isLoading && (
        <div className="mx-auto mt-20">
          <Loading message="" />
        </div>
      )}
      {aggregatorDashboardData.isSuccess && (
        <div className="w-full px-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <OrgDashboardDetailsCard
              title="Applications"
              value={formatLargeNumber(
                aggregatorDashboardData.data.data.data.applications_count
              )}
              viewAllUrl="/aggregator/database"
              // percentageValue={-3}
              icon={
                <div className="size-7 flex justify-center items-center bg-yellow-100 rounded-lg">
                  <img src="/assets/icons/org-dashboard/doc.svg" />
                </div>
              }
            />
            <OrgDashboardDetailsCard
              title="Projects"
              value={formatLargeNumber(
                aggregatorDashboardData.data.data.data.project
              )}
              viewAllUrl="/aggregator/projects"
              // percentageValue={1}
              icon={
                <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
                  <img src="/assets/icons/org-dashboard/project.svg" />
                </div>
              }
            />
            <OrgDashboardDetailsCard
              title="Devices"
              value={formatLargeNumber(
                aggregatorDashboardData.data.data.data.devices
              )}
              viewAllUrl="/aggregator/devices"
              // percentageValue={2}
              icon={
                <div className="size-7 flex justify-center items-center bg-green-100 rounded-lg">
                  <img src="/assets/icons/org-dashboard/devices.svg" />
                </div>
              }
            />
            <OrgDashboardDetailsCard
              title="Staff"
              value={formatLargeNumber(
                aggregatorDashboardData.data.data.data.staff
              )}
              viewAllUrl="/aggregator/staff"
              // percentageValue={1}
              icon={
                <div className="size-7 flex justify-center items-center bg-green-100 rounded-lg">
                  <img src="/assets/icons/org-dashboard/staff.svg" />
                </div>
              }
            />
          </div>
          {/* Chart */}

          <div className="my-10">
            <div className="flex justify-between">
              <p className="font-poppins font-bold pb-8 text-main text-xl">
                Applications
              </p>
              {/* <Dropdown
                name="yearSelector"
                wrapperClassName={"w-20 border border-gray-500 shadow-lg"}
                value={yearSelector}
                onOptionChange={(value) => setYearSelector(value)}
                options={getLastFiveYears()}
              /> */}
            </div>
            <div
              style={{
                height: "35vh",
                position: "relative",
                marginBottom: "1%",
                padding: "1%",
              }}
              className="relative w-full"
            >
              <StackedLineChart
                approved={
                  aggregatorDashboardData.data.data.data.applications_chart
                    .approved
                }
                rejected={
                  aggregatorDashboardData.data.data.data.applications_chart
                    .rejected
                }
                received={
                  aggregatorDashboardData.data.data.data.applications_chart
                    .received
                }
              />
            </div>
            <div className="mt-6 flex justify-center gap-x-3 items-center"></div>
          </div>

          {/* Subheader */}
          <MainActionSubHeader
            title="Start a project"
            buttonText="Create Project"
            subTitle="Start a project to help home owners generate carbon-credit"
            actionUrl="/aggregator/projects"
          />
          {/* table section */}
          <div className="flex gap-4 flex-wrap">
            {
              aggApplications.isSuccess &&
                aggApplications.data?.data.data.applications.length >= 1 && (
                  <AggregatorDatabaseGrid
                    data={aggApplications.data?.data.data.applications}
                    isUpdating={
                      aggApplications.isLoading || aggApplications.isFetching
                    }
                  />
                )
              // aggApplications.data?.data.data.applications.map(
              //   (app: any, i: number) => <AggAppCard app={app} key={i} />
              // )
            }
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
