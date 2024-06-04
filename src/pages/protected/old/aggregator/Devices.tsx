// import { LineChart, VixLineChart } from "@/components/charts";
import TabToggler from "@/components/containers/TabToggler";
import { Grid } from "@/components/grid";
import { Button, YearDropdown } from "@/components/ui";
import { IComponentMap } from "@/types/general";
import { FC, useState } from "react";

import devices from "../../../../dummy/devices.json";
import { lineChartOptions, yearLabels } from "@/constants";
import { LineChart } from "@/components/charts";

const Devices: FC = () => {
  const deviceTabs = [
    "Create project",
    "Project in review",
    "Project Completed",
  ];
  const [activeTab, setActiveTab] = useState<string>(deviceTabs[0]);

  // component varaibles
  const chartData = {
    labels: yearLabels,
    datasets: [
      {
        label: "Dataset 1",
        data: yearLabels.map(() => Math.random()),
        lineTension: 0.3,
        borderColor: "rgba(52, 122, 226, 1)",
        backgroundColor: "rgba(52, 122, 226, 1)",
        pointRadius: 0,
      },
      // {
      //   label: "Dataset 2",
      //   data: yearLabels.map(() => Math.random()),
      //   lineTension: 0.4,
      //   borderColor: "rgb(53, 162, 235)",
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

  const getCurrentTData: IComponentMap = {
    "Create project": <Grid data={devices} pageSize={40} tableStyles={` `} />,
    "Project in review": <Grid data={[]} pageSize={40} tableStyles={` `} />,
    "Project Completed": <Grid data={[]} pageSize={40} tableStyles={` `} />,
  };

  return (
    <div>
      <div className="flex-center justify-between">
        <h2 className="page-header">Devices</h2>
        <Button className="flex items-center gap-2">
          <span className="text-white">Create new project</span>

          <img
            src="/assets/icons/plus-circle.svg"
            className="h-6 w-6"
            alt="carbon-adjust icon"
          />
        </Button>
      </div>

      {/* Tab */}
      <div className="mt-6">
        <TabToggler
          tabs={deviceTabs}
          activeTab={activeTab}
          onClick={setActiveTab}
        />
      </div>

      <div className="mt-4 border p-5 rounded-[13px]">
        <div className="flex-center">
          <h2>Users Analytics</h2>

          <div className="flex-center flex-[0.4] gap-[21px] ml-auto">
            <div className="flex-center gap-[8.78px]">
              <span className="bg-[#347AE2] h-2 w-2 rounded-full" />
              <span className="text-xs">14 Devices</span>
            </div>

            <YearDropdown
              endYear={2027}
              selectedYear={2024}
              startYear={2023}
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="mt-[26.3px] relative h-[250px]">
          {/* <VixLineChart /> */}
          <LineChart data={chartData} options={lineChartOptions} />
        </div>
      </div>

      <div className="mt-4">{getCurrentTData[activeTab]}</div>
    </div>
  );
};

export default Devices;
