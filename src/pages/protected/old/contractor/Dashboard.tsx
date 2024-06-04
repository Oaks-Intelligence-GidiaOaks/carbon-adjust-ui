import { FC } from "react";
import { BarChart } from "@/components/charts";
import { Grid } from "@/components/grid";
import { DoughnutCard } from "@/components/ui";
import { barChartOptions } from "@/constants";
import dummy from "@/dummy/aggregator.json";

const Dashboard: FC = () => {
  // component variables
  let labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Received",
        data: labels.map(() => 4),
        backgroundColor: `#2196F3`,
      },
      {
        label: "Declined",
        data: labels.map(() => 5),
        backgroundColor: `#EF1E1E`,
      },
    ],
  };

  return (
    <div className="w-full px-3">
      {/* dougnuts section */}
      <div>
        <h2>Monthly Applications Status</h2>

        <div className="flex items-center overflow-x-scroll w-full gap-[33px]">
          {labels.map((it, i) => (
            <DoughnutCard
              key={i}
              title={`${it} 2023`}
              countOne={20}
              countTwo={70}
            />
          ))}
        </div>
      </div>

      {/* charts section*/}
      <div className="w-full mt-[34px]">
        <h2>Application Received vs Declined </h2>
        <div className="  w-full">
          {/* <div className="flex items-center gap-x-[18px]">
            <span>Showing Data</span>

            <YearDropdown
              endYear={2026}
              onChange={() => {}}
              selectedYear={2023}
              startYear={2023}
            />
          </div> */}

          <div className="h-[319px] bg-[#F8F9FA] px-4 border py-5 rounded-[5px]">
            <BarChart data={data} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* table section */}
      <div className="w-full mt-[31px]">
        <Grid data={dummy} pageSize={30} tableStyles={` h-[300px] w-full`} />
      </div>
    </div>
  );
};

export default Dashboard;
