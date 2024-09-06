import { LineChart } from "@/components/charts";
import TimeCapModal from "@/components/dialogs/TimeCapModal";
import Loading from "@/components/reusables/Loading";
import { Button } from "@/components/ui";
import { IDeviceChartData, IPowerLimit } from "@/interfaces/device.interface";
import {
  formatChartLabel,
  getEmissionDataSet,
  getPowerDataSet,
} from "@/lib/utils";
// @ts-ignore
import { getChartData, updateLimits } from "@/services/adminService";
// @ts-ignore
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const AdminDeviceChart = () => {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: sss, isLoading } = useQuery({
    queryKey: ["get-chart-data"],
    queryFn: () => getChartData(),
  });

  const deviceGraphD =
    sss?.chartData.map((item) => ({
      ...item,
      from_date: new Date(item.from_date),
      to_date: new Date(item.to_date),
    })) || [];

  const data: {
    powerLimits: IPowerLimit[];
    chartData: IDeviceChartData[];
  } = {
    powerLimits: sss?.powerLimits ?? [],
    chartData: deviceGraphD,
  };

  const UpdateLimits = useMutation({
    mutationKey: ["update-limits"],
    mutationFn: (mData: Array<IPowerLimit>) => updateLimits(mData),
    // @ts-ignore
    onSuccess: (sx: any) => {
      toast.success(`Power Limits successfully updated`);
    },
    // @ts-ignore
    onError: (ex: any) => {
      toast.error("Error updating limits");
    },
    onSettled: () => {
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ["get-chart-data"] });
    },
  });

  //   create labels
  const labels = sss ? formatChartLabel(deviceGraphD) : [];

  // create datasets

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
      labels,
      datasets: [
        {
          label: "Power (W)",
          data: sss ? getPowerDataSet(deviceGraphD) : [],
          lineTension: 0.4,
          borderColor: "#347AE2",
          backgroundColor: "#347AE2",
          pointRadius: 1,
          yAxisID: "y",
        },
        {
          label: "Emission (C02e)",
          data: sss ? getEmissionDataSet(deviceGraphD) : [],
          lineTension: 0.4,
          borderColor: "#FFE7BF",
          backgroundColor: "#FFE7BF",
          pointRadius: 1,
          yAxisID: "y1",
        },
      ],
    },
  };

  if (isLoading) {
    return (
      <div className="h-[48vh] w-full grid place-items-center">
        <Loading message="" />
      </div>
    );
  }

  return (
    <div>
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

          {/* <div className="flex flex-col gap-2 w-fit">
            <h2 className="pl-2">Power cap(Value)</h2>

            <Input
              type="number"
              name="power"
              placeholder="00"
              className="border rounded-md w-fit px-2"
            />
          </div> */}

          <Button
            onClick={() => setShowModal(true)}
            variant={"default"}
            size={"default"}
            className="!rounded-3xl w-[126px] ml-1"
          >
            <span className="text-white ">Set</span>
          </Button>
        </div>
      </div>

      {showModal && (
        <div>
          <TimeCapModal
            isPending={UpdateLimits.isPending}
            powerLimits={data?.powerLimits || []}
            updateLimits={(limitsData: Array<IPowerLimit>) => {
              UpdateLimits.mutate(limitsData);
            }}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDeviceChart;
