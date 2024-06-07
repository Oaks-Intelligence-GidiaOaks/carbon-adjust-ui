// import React from "react";

import { StackedLineChart } from "@/components/charts/StackedLineChart";
import PackagesGrid from "@/components/grid/merchant/PackagesGrid";
import OrgDashboardDetailsCard from "@/components/reusables/OrgDashboardDetailsCard";
import packagesDummy from "../../../dummy/packages.json";

type Props = {};

const Dashboard = (_: Props) => {
  const cardItems = [
    {
      title: "Packages Created",
      value: "1,000",
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
    },
    {
      title: "Applications",
      value: "750",
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
    },
    {
      title: "Total Earnings",
      value: "$1500",
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
    },
  ];

  return (
    <div className="px-2 xl:px-8">
      <div className="flex items-strectch gap-[20px] mt-[50px] max-w-[93vw] md:max-w-[64vw] lg:max-w-[70vw] pr-3 overflow-x-scroll pb-5 xl:max-w-full ">
        {Array.from(cardItems, (item) => (
          // <div className="border flex-1 ">
          <OrgDashboardDetailsCard {...item} viewAllUrl="" />
          // </div>
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

        <div className="-mt-3">
          <PackagesGrid isUpdating={false} data={packagesDummy.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
