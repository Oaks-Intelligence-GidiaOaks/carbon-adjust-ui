import { FC } from "react";
import OrgDashboardDetailsCard from "@/components/reusables/OrgDashboardDetailsCard";
import { formatLargeNumber } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { StackedLineChart } from "@/components/charts/StackedLineChart";
import AdminAggregatorRegistrationGrid from "@/components/grid/CollapsibleGrid";
import { fetchAllUsers } from "@/services/adminService";
// import { Dropdown } from "@/components/ui";
import axiosInstance from "@/api/axiosInstance";
import Loading from "@/components/reusables/Loading";

const Dashboard: FC = () => {
  const userRegistrations = useQuery({
    queryKey: ["users-registration"],
    queryFn: () => fetchAllUsers(),
  });

  // const [yearSelector, setYearSelector] = useState({
  //   label: new Date().getFullYear(),
  //   value: new Date().getFullYear(),
  // });

  const adminDashboardData = useQuery({
    queryKey: ["get-admin-dashboard-data"],
    queryFn: () => axiosInstance.get(`/users/adm/home`),
  });

  return (
    <>
      {adminDashboardData.isLoading && (
        <div className="mx-auto mt-20">
          <Loading message="" />
        </div>
      )}
      {adminDashboardData.isSuccess && (
        <div>
          <div className="w-full px-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
              <OrgDashboardDetailsCard
                title="Applications"
                value={formatLargeNumber(
                  adminDashboardData.data.data.data.application_count
                )}
                viewAllUrl="/admin/applications"
                icon={
                  <div className="size-7 flex justify-center items-center bg-yellow-100 rounded-lg">
                    <img src="/assets/icons/org-dashboard/doc.svg" />
                  </div>
                }
              />
              <OrgDashboardDetailsCard
                title="Registered Users"
                value={formatLargeNumber(
                  adminDashboardData.data.data.data.registration
                )}
                viewAllUrl="/admin/users-registration"
                icon={
                  <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
                    <img src="/assets/icons/org-dashboard/project.svg" />
                  </div>
                }
              />
              <OrgDashboardDetailsCard
                title="Project"
                value={formatLargeNumber(
                  adminDashboardData.data.data.data.projects
                )}
                viewAllUrl="/admin/projects"
                icon={
                  <div className="size-7 flex justify-center items-center bg-indigo-100 rounded-lg">
                    <img src="/assets/icons/org-dashboard/helmet.svg" />
                  </div>
                }
              />
              <OrgDashboardDetailsCard
                title="Carbon Offset"
                value={formatLargeNumber(
                  adminDashboardData.data.data.data.carbon_offset
                )}
                viewAllUrl="/admin/carbon-credit"
                icon={
                  <div className="size-7 flex justify-center items-center bg-green-100 rounded-lg">
                    <img src="/assets/icons/org-dashboard/devices.svg" />
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
                    adminDashboardData.data.data.data.applications_chart
                      .approved
                  }
                  rejected={
                    adminDashboardData.data.data.data.applications_chart
                      .rejected
                  }
                  received={
                    adminDashboardData.data.data.data.applications_chart
                      .received
                  }
                />
              </div>
              <div className="mt-6 flex justify-center gap-x-3 items-center"></div>
            </div>

            {/* Subheader */}
            {/* <MainActionSubHeader
        title="Start a project"
        subTitle="start a project to help home owners generate carbon-credit"
        actionUrl="/aggregator/projects"
      /> */}

            {/* table section */}
            <div className="flex gap-4 flex-wrap">
              {
                userRegistrations.isSuccess &&
                  userRegistrations.data?.data.data.users.length >= 1 && (
                    <AdminAggregatorRegistrationGrid
                      data={userRegistrations.data?.data.data.users}
                      isUpdating={
                        userRegistrations.isLoading ||
                        userRegistrations.isFetching
                      }
                    />
                  )
                // aggApplications.data?.data.data.applications.map(
                //   (app: any, i: number) => <AggAppCard app={app} key={i} />
                // )
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
