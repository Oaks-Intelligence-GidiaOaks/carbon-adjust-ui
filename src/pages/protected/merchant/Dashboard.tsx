// import React from "react";

import { StackedLineChart } from "@/components/charts/StackedLineChart";
import OrgDashboardDetailsCard from "@/components/reusables/OrgDashboardDetailsCard";
import { DataTable } from "@/components/tables/DataTable";

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
    <div>
      <div className="flex-center gap-[20px] mt-[50px] ">
        {Array.from(cardItems, (item) => (
          <div className="border flex-1 ">
            <OrgDashboardDetailsCard {...item} viewAllUrl="" />
          </div>
        ))}
      </div>

      {/* chart - Applications */}
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
          <StackedLineChart approved={[]} rejected={[]} received={[]} />
        </div>
        <div className="mt-6 flex justify-center gap-x-3 items-center"></div>
      </div>

      {/* Packages Grid */}
      <div>
        <DataTable columns={[]} data={[]} />
      </div>
    </div>
  );
};

export default Dashboard;
