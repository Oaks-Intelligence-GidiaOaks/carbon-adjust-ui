import { GuageChart } from "@/components/charts";
import { Button } from "@/components/ui";
import { AiOutlineDownload } from "react-icons/ai";

const TransportChartCard = () => {
  const data = {
    labels: ["Filled", "Empty"],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["#4caf50", "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className="flex flex-col bg-[#Fff] border rounded-lg p-5 mt-5 ">
      <div className="flex justify-between items-center my-2 sm:px-5">
        <div className="flex  ">
          <h3 className="text-lg font-normal text-gray-700">Carbon Tracker</h3>
        </div>

        <div className="flex ">
          <Button
            variant={"outline"}
            className="rounded-[20px] border-cyan-700 flex-center gap-1 py-3 h-[20px] text-sky-900"
          >
            <span>Download</span>
            <AiOutlineDownload />
          </Button>
        </div>
      </div>
      <div className="mx-auto my-3 py-5 h-[200px] sm:w-full w-[300px]">
        <GuageChart data={data} Text={"25%"} textColor={"#4caf50"} />
      </div>
    </div>
  );
};

export default TransportChartCard;
