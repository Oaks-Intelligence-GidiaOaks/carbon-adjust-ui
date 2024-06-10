// import React from "react";

import { StackedLineChart } from "@/components/charts/StackedLineChart";
import PackagesGrid from "@/components/grid/merchant/PackagesGrid";
import OrgDashboardDetailsCard from "@/components/reusables/OrgDashboardDetailsCard";
import packagesDummy from "../../../dummy/packages.json";
import { IComponentMap } from "@/types/general";
import MainActionSubHeader from "@/components/reusables/MainActionSubHeader";
import ProcessApplicationModal from "@/components/reusables/ProcessApplicationModal";
import RejectApplicationModal from "@/components/reusables/RejectApplicationModal";
import { useQuery } from "@tanstack/react-query";
import { getAllPackages } from "@/services/merchantService";
import { transformPackagesGridData } from "@/utils/reshape";

type Props = {};

const Dashboard = (_: Props) => {
  // integration
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-packages"],
    queryFn: () => getAllPackages(),
  });

  const pkgData = isSuccess
    ? transformPackagesGridData(data.data.packages)
    : [];

  const packagesCount = isSuccess ? data.data.totalPackages : 0;

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
      value: "750",
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
      viewAllUrl: "/merchant/packages/all",
    },
    {
      title: "Total Earnings",
      value: "$1500",
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
      viewAllUrl: "/merchant/packages/all",
    },
  ];

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
          <StackedLineChart approved={[]} rejected={[]} received={[]} />
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
