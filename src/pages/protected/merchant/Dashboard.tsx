// import React from "react";

import { StackedLineChart } from "@/components/charts/StackedLineChart";
import PackagesGrid from "@/components/grid/merchant/PackagesGrid";
import OrgDashboardDetailsCard from "@/components/reusables/OrgDashboardDetailsCard";
import { IComponentMap } from "@/types/general";
import MainActionSubHeader from "@/components/reusables/MainActionSubHeader";
// import ProcessApplicationModal from "@/components/reusables/ProcessApplicationModal";
// import RejectApplicationModal from "@/components/reusables/RejectApplicationModal";
import { useQuery } from "@tanstack/react-query";
import {
  getAllApplications,
  getAllPackages,
  getApplicationsChart,
  getEarnings,
} from "@/services/merchantService";
import { transformPackagesGridData } from "@/utils/reshape";
import { formatNumberWithCommas, getLastFiveYears } from "@/utils";
import { useState } from "react";
import { Dropdown } from "@/components/ui";
import { GrantIcon } from "@/assets/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { UserRole } from "@/interfaces/user.interface";

type Props = {};

type ChartType = {
  month: string;
  year: number;
  cancelled: number;
  pending: number;
  completed: number;
  processing: number;
};

const Dashboard = (_: Props) => {
  const { user } = useSelector((state: RootState) => state.user);

  const [yearSelector, setYearSelector] = useState({
    label: new Date().getFullYear(),
    value: new Date().getFullYear(),
  });
  // integration
  const { data, isSuccess } = useQuery({
    queryKey: ["get-packages"],
    queryFn: () => getAllPackages(),
  });
  const { data: earningsData } = useQuery({
    queryKey: ["get-total-earnings"],
    queryFn: () => getEarnings(),
  });

  const { data: applicationsData, isSuccess: isApplicationsSuccess } = useQuery(
    {
      queryKey: ["get-all-applications"],
      queryFn: () => getAllApplications("Regular_Package"),
    }
  );

  const { data: applicationsChart } = useQuery({
    queryKey: ["get-applications-chart", yearSelector.value],
    queryFn: () => getApplicationsChart(yearSelector.value),
  });

  const pkgData = isSuccess
    ? transformPackagesGridData(data.data.packages)
    : [];

  const packagesCount = isSuccess ? data.data.totalPackages : 0;
  const applicationsCount = isApplicationsSuccess
    ? applicationsData.data.totalOrder
    : 0;

  const cardItems = [
    {
      title: "Packages Created",
      value: packagesCount,
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
      viewAllUrl: "/merchant/packages/all",
    },
    {
      title: "Applications",
      value: applicationsCount,
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
      viewAllUrl: "/merchant/applications",
    },
    {
      title: "Total Earnings",
      value: `£${formatNumberWithCommas(earningsData?.data?.total ?? "0")}`,
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
      viewAllUrl: "/merchant/packages/all",
    },
  ];

  const superMerchantCards = [
    {
      title: "Total Grants",
      value: `£${formatNumberWithCommas("0")}`,
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <GrantIcon />
        </div>
      ),
      viewAllUrl: "/merchant/packages",
    },
  ];

  if (user?.roles.includes(UserRole.SUPER_MERCHANT)) {
    for (let i of superMerchantCards) {
      cardItems.push(i);
    }
  }

  const activePackageComponent: IComponentMap = {
    // "loading": "",
    "1": <PackagesGrid isUpdating={false} data={pkgData} />,
    "2": (
      <>
        <div className="bg-white h-[60px] -mb-3 rounded-lg text-[#495057] text-base text-center grid place-items-center border mt-8">
          <span>No package created yet</span>
        </div>

        <MainActionSubHeader
          buttonText="Create a Package"
          actionUrl="/merchant/packages/new"
          subTitle="Create packages to allow users see and apply to your services"
          title="Create a package"
        />
      </>
    ),
  };

  return (
    <div className="px-2 xl:px-8">
      <div className="flex items-strectch gap-[20px] mt-[50px] max-w-[93vw] md:max-w-[64vw] lg:max-w-[70vw] pr-3 overflow-x-scroll pb-5 xl:max-w-full ">
        {Array.from(cardItems, (item) => (
          <OrgDashboardDetailsCard {...item} />
        ))}
      </div>

      {/* chart - Applications */}
      <div className="my-4">
        <div className="flex justify-between">
          <p className="font-poppins font-bold pb-8 text-main text-xl">
            Applications
          </p>
          <Dropdown
            name="yearSelector"
            wrapperClassName={"w-20 border border-gray-500 shadow-lg"}
            value={yearSelector}
            onOptionChange={(value) => setYearSelector(value)}
            options={getLastFiveYears()}
          />
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
            completed={
              applicationsChart?.data?.map((v: ChartType) => ({
                month: v.month,
                year: v.year,
                count: v.completed,
              })) ?? []
            }
            cancelled={
              applicationsChart?.data?.map((v: ChartType) => ({
                month: v.month,
                year: v.year,
                count: v.cancelled,
              })) ?? []
            }
            pending={
              applicationsChart?.data?.map((v: ChartType) => ({
                month: v.month,
                year: v.year,
                count: v.pending,
              })) ?? []
            }
            processing={
              applicationsChart?.data?.map((v: ChartType) => ({
                month: v.month,
                year: v.year,
                count: v.processing,
              })) ?? []
            }
          />
          <div className="flex gap-4 flex-wrap justify-center items-center px-4 mt-4">
            <div className="flex justify-center gap-2 items-center">
              <div className="size-2 rounded-full bg-[rgba(243,245,255,1)] drop-shadow-[0_0_1px_rgba(0,0,0,0.3)]" />
              <span className="text-[rgba(243,245,255,1)] drop-shadow-[0_0_1px_rgba(0,0,0,0.3)] text-sm">
                Pending
              </span>
            </div>
            <div className="flex justify-center gap-2 items-center">
              <div className="size-2 rounded-full bg-[rgba(255,215,75,1)] drop-shadow-[0_0_1px_rgba(0,0,0,0.3)]" />
              <span className="text-[rgba(255,215,75,1)] text-sm">
                Processing
              </span>
            </div>
            <div className="flex justify-center gap-2 items-center">
              <div className="size-2 rounded-full bg-[rgba(55,215,75,1)]" />
              <span className="text-[rgba(55,215,75,1)] text-sm">
                Completed
              </span>
            </div>
            <div className="flex justify-center gap-2 items-center">
              <div className="size-2 rounded-full bg-[rgba(254,1,6,1)]" />
              <span className="text-[rgba(254,1,6,1)] text-sm">Cancelled</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-x-3 items-center"></div>
      </div>

      {/* Packages Grid */}
      <div className=" p-3 rounded-md bg-white">
        <h2 className="font-[600] text-lg">Packages Created </h2>

        <div className="-mt-3">{activePackageComponent[1]}</div>
      </div>
    </div>
  );
};

export default Dashboard;
