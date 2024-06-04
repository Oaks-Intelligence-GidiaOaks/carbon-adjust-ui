import { FC } from "react";
import OrgDashboardDetailsCard from "@/components/reusables/OrgDashboardDetailsCard";
import { formatLargeNumber } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import MainActionSubHeader from "@/components/reusables/MainActionSubHeader";
import { StackedLineChart } from "@/components/charts/StackedLineChart";
import HIAApplicationsGrid from "@/components/grid/HIAApplicationsGrid";
import Loading from "@/components/reusables/Loading";
// import { Dropdown } from "@/components/ui";

const Dashboard: FC = () => {
  const hiaApplications = useQuery({
    queryKey: ["get-applications"],
    queryFn: () => axiosInstance.get(`/applications/hia`),
  });

  // const [yearSelector, setYearSelector] = useState({
  //   label: new Date().getFullYear(),
  //   value: new Date().getFullYear(),
  // });

  const hiaDashboardData = useQuery({
    queryKey: ["get-hia-dashboard-data"],
    queryFn: () => axiosInstance.get(`/users/hia/home`),
  });

  return (
    <>
      {hiaDashboardData.isLoading && (
        <div className="mx-auto mt-20">
          <Loading message="" />
        </div>
      )}
      {hiaDashboardData.isSuccess && (
        <div className="w-full px-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <OrgDashboardDetailsCard
              title="Applications"
              value={formatLargeNumber(
                hiaDashboardData?.data?.data?.data?.applications_count ?? 0
              )}
              viewAllUrl="/hia/applications"
              // percentageValue={-3}
              icon={
                <div className="size-7 flex justify-center items-center bg-yellow-100 rounded-lg">
                  <img src="/assets/icons/org-dashboard/doc.svg" />
                </div>
              }
            />
            <OrgDashboardDetailsCard
              title="Packages Created"
              value={formatLargeNumber(
                hiaDashboardData?.data?.data?.data?.packages_created ?? 0
              )}
              viewAllUrl="/hia/packages"
              // percentageValue={1}
              icon={
                <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
                  <img src="/assets/icons/org-dashboard/project.svg" />
                </div>
              }
            />
            <OrgDashboardDetailsCard
              title="Subcontractors"
              value={formatLargeNumber(
                hiaDashboardData?.data?.data?.data?.total_subcontractors ?? 0
              )}
              viewAllUrl="/hia/subcontractors"
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
                hiaDashboardData?.data?.data?.data?.staff ?? 0
              )}
              viewAllUrl="/hia/staff"
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
                  hiaDashboardData.data.data.data.applications_chart.approved
                }
                rejected={
                  hiaDashboardData.data.data.data.applications_chart.rejected
                }
                received={
                  hiaDashboardData.data.data.data.applications_chart.received
                }
              />
            </div>
            <div className="mt-6 flex justify-center gap-x-3 items-center"></div>
          </div>

          {/* Subheader */}
          <MainActionSubHeader
            title="Create a package"
            buttonText="Create Package"
            subTitle="Create packages to allow users see and apply to your services"
            actionUrl="/hia/packages/add"
          />
          {/* table section */}
          <div className="flex gap-4 flex-wrap">
            {
              hiaApplications.isSuccess &&
                hiaApplications.data?.data.data.applications.length >= 1 && (
                  <HIAApplicationsGrid
                    data={hiaApplications.data?.data.data.applications}
                    isUpdating={
                      hiaApplications.isLoading || hiaApplications.isFetching
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
