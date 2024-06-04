import { FC } from "react";
import OrgDashboardDetailsCard from "@/components/reusables/OrgDashboardDetailsCard";
import { formatLargeNumber } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import MainActionSubHeader from "@/components/reusables/MainActionSubHeader";
import { StackedLineChart } from "@/components/charts/StackedLineChart";
import InsuranceApplicationsGrid from "@/components/grid/InsuranceApplicationsGrid";
import Loading from "@/components/reusables/Loading";
// import { Dropdown } from "@/components/ui";

const Dashboard: FC = () => {
  const insApplications = useQuery({
    queryKey: ["get-ins-applications"],
    queryFn: () => axiosInstance.get(`/applications/ins`),
  });

  // const [yearSelector, setYearSelector] = useState({
  //   label: new Date().getFullYear(),
  //   value: new Date().getFullYear(),
  // });

  const insuranceDashboardData = useQuery({
    queryKey: ["get-ins-dashboard-data"],
    queryFn: () => axiosInstance.get(`/users/ins/home`),
  });

  console.log(insuranceDashboardData.data?.data);

  return (
    <>
      {insuranceDashboardData.isLoading && (
        <div className="mx-auto mt-20">
          <Loading message="" />
        </div>
      )}
      {insuranceDashboardData.isSuccess && (
        <div className="w-full px-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <OrgDashboardDetailsCard
              title="Applications"
              value={formatLargeNumber(
                insuranceDashboardData?.data?.data?.data?.applications_count ??
                  0
              )}
              viewAllUrl="/insurance/applications"
              // percentageValue={-3}
              icon={
                <div className="size-7 flex justify-center items-center bg-yellow-100 rounded-lg">
                  <img src="/assets/icons/org-dashboard/doc.svg" />
                </div>
              }
            />
            <OrgDashboardDetailsCard
              title="Packages"
              value={formatLargeNumber(
                insuranceDashboardData?.data?.data?.data?.packages_count ?? 0
              )}
              viewAllUrl="/insurance/packages"
              // percentageValue={1}
              icon={
                <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
                  <img src="/assets/icons/org-dashboard/project.svg" />
                </div>
              }
            />
            <OrgDashboardDetailsCard
              title="Staff"
              value={formatLargeNumber(
                insuranceDashboardData?.data?.data?.data?.staff ?? 0
              )}
              viewAllUrl="/insurance/staff"
              // percentageValue={2}
              icon={
                <div className="size-7 flex justify-center items-center bg-green-100 rounded-lg">
                  <img src="/assets/icons/org-dashboard/staff.svg" />
                </div>
              }
            />
            <OrgDashboardDetailsCard
              title="Carbon Offset"
              value={formatLargeNumber(
                insuranceDashboardData?.data?.data?.data?.carbon_offset ?? 0
              )}
              viewAllUrl="/insurance/carbon-credit"
              // percentageValue={1}
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
                  insuranceDashboardData.data.data.data.applications_chart
                    .approved
                }
                rejected={
                  insuranceDashboardData.data.data.data.applications_chart
                    .rejected
                }
                received={
                  insuranceDashboardData.data.data.data.applications_chart
                    .received
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
            actionUrl="/insurance/packages/add"
          />
          {/* table section */}
          <div className="grid">
            {insApplications.isSuccess &&
              insApplications.data?.data.data.applications.length >= 1 && (
                // insApplications.data?.data.data.applications.map(
                //   (app: any, i: number) => <FinanceAppCard app={app} key={i} />
                <InsuranceApplicationsGrid
                  data={insApplications.data?.data.data.applications}
                  isUpdating={
                    insApplications.isLoading || insApplications.isFetching
                  }
                />
              )}
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default Dashboard;
