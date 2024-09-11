// @ts-ignore
import { LineChart } from "@/components/charts";
import AdminDeviceChart from "@/components/containers/devices/AdminDeviceChart";
import WalletTabs from "@/components/containers/devices/WalletTabs";
import DeviceGrid from "@/components/grid/admin/DeviceGrid";
import Loading from "@/components/reusables/Loading";
// @ts-ignore
import { Button, Input } from "@/components/ui";
import { handleTableDownload } from "@/lib/utils";
import { getDispatchedDevices } from "@/services/homeOwner";
import { useQuery } from "@tanstack/react-query";

const Devices = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-devices-dispatch"],
    queryFn: () => getDispatchedDevices(),
  });

  const tData = data
    ? data.data.dispatchDevices.map(({ device, ...rest }: any, i: number) => {
        return {
          "S/N": i + 1,
          "Date Created": rest?.createdAt,
          "Schedule ID": rest?._id,
          "Device Name": device?.name,
          "Device Type": device?.type,
          "Electricity Supplier": device?.electricityProvider,
          "Device Duration (hh:mm)": `${rest?.wpInHours}`,
          "Start Time": rest?.dispatchStartTime,
          Status: rest?.status,
        };
      })
    : [];

  if (isLoading) {
    return (
      <div className="h-32 grid place-items-center">
        <Loading message="Loading" />
      </div>
    );
  }

  return (
    <div className="px-5 bg-[#F9FCFD] text-sm py-7">
      {/* <h2>Devices</h2> */}

      {/* Wallet */}
      <WalletTabs />

      <AdminDeviceChart />

      {/* Table */}
      <div className="mt-8">
        <div className="flex-center ml-auto">
          <Button
            onClick={() => handleTableDownload(tData)}
            className="ml-auto"
          >
            <span>Download</span>
          </Button>
        </div>

        <DeviceGrid data={data?.data?.dispatchDevices || []} isUpdating />
      </div>
    </div>
  );
};

export default Devices;
