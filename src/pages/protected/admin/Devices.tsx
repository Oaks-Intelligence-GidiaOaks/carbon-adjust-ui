// @ts-ignore
import { LineChart } from "@/components/charts";
import DeviceGrid from "@/components/grid/admin/DeviceGrid";
import Loading from "@/components/reusables/Loading";
// @ts-ignore
import { Button, Input } from "@/components/ui";
import WalletCard from "@/components/ui/WalletCard";
import { formatNumber } from "@/lib/utils";
import { getDispatchedDevices } from "@/services/homeOwner";
import { LineChartProps } from "@/types/general";
import { useQuery } from "@tanstack/react-query";

const Devices = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-devices-dispatch"],
    queryFn: () => getDispatchedDevices(),
  });

  if (isLoading) {
    return (
      <div className="h-32 grid place-items-center">
        <Loading message="Loading" />
      </div>
    );
  }

  // @ts-ignore
  const datum: LineChartProps = {
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0.4, // bezier curves
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Power (W)",
          },
        },
        y1: {
          type: "linear",
          position: "right",
          title: {
            display: true,
            text: "Emission (CO2e)",
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    },
    data: {
      labels: Array.from({ length: 13 }, (_, i) => formatNumber(i)),
      datasets: [
        {
          label: "Power (W)",
          data: Array.from({ length: 13 }, () => Math.floor(Math.random() * 9)),
          lineTension: 0.4,
          borderColor: "#347AE2",
          backgroundColor: "#347AE2",
          pointRadius: 1,
          yAxisID: "y",
        },
        {
          label: "Emission (C02e)",
          data: Array.from({ length: 13 }, () => Math.floor(Math.random() * 9)),
          lineTension: 0.4,
          borderColor: "#FFE7BF",
          backgroundColor: "#FFE7BF",
          pointRadius: 1,
          yAxisID: "y1",
        },
      ],
    },
  };

  return (
    <div className="px-5 bg-[#F9FCFD] text-sm py-7">
      {/* <h2>Devices</h2> */}

      {/* Wallet */}
      <WalletCard />

      <div className="bg-white shadow-md  p-6 rounded-xl mt-12">
        <div className="flex-center">
          <h2 className="pl-5 pb-3 font-[500] text-xl">Devices</h2>
        </div>

        <div
          style={{
            height: "45vh",
            position: "relative",
            marginBottom: "1%",
            padding: "1%",
          }}
          className="relative w-full"
        >
          <LineChart data={datum.data} options={datum.options} />
        </div>

        <div className=" space-y-4 mt-6 pl-5">
          <h5 className="font-[600] ">Set Limits</h5>

          <div className="flex-center gap-6">
            <div className="flex-center gap-1">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Power</label>
            </div>

            <div className="flex-center gap-1">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Time</label>
            </div>

            <div className="flex-center gap-1">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Emission</label>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-fit">
            <h2 className="pl-2">Power cap(Value)</h2>

            <Input
              type="number"
              name="power"
              placeholder="00"
              className="border rounded-md w-fit px-2"
            />
          </div>

          <Button
            onClick={() => {}}
            variant={"default"}
            size={"default"}
            className="!rounded-3xl w-[126px] ml-3"
          >
            <span className="text-white ">Set</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="">
        <DeviceGrid data={data.data.dispatchDevices} isUpdating />
      </div>
    </div>
  );
};

export default Devices;
