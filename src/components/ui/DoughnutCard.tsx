import { doughnutChartOptions } from "@/constants";
import { DoughnutChart } from "../charts";

type Props = {
  countOne?: number;
  countTwo?: number;
  title: string;
  labels?: string[];
};

const DoughnutCard = (props: Props) => {
  // component variables
  const chartData = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19],
        backgroundColor: ["#EF1E1E", "#8AC926"],
        borderWidth: 1,
      },
    ],
  };

  const LabelItem = ({ text, color }: { text: string; color: string }) => (
    <div className="flex items-center gap-[9px]">
      <div className={`h-[7px] w-[7px] bg-[${color}]`} />
      <span>{text}</span>
    </div>
  );

  return (
    <div className="border bg-[#F8F9FA] rounded-[12px] py-2 px-3">
      <p className=" py-3 w-fit ml-auto text-sm font-[600] leading-[22px]">
        {props.title}
      </p>

      <div className="">
        <div className=" relative grid place-items-center h-[130px] w-[130px]">
          <DoughnutChart data={chartData} options={doughnutChartOptions} />
          <div className=" absolute drop-shadow-lg h-[70px] ab w-[70px] rounded-full bg-white text-black text-center  grid place-items-center">
            <span className="">305</span>
          </div>
        </div>

        <div>
          {props.labels?.map((it) => (
            <LabelItem text={it} color="#EF1E1E" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoughnutCard;
