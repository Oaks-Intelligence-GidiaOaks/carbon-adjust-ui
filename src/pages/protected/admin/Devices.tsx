// @ts-ignore
import { LineChart } from "@/components/charts";
import AdminDeviceChart from "@/components/containers/devices/AdminDeviceChart";
import DeviceGrid from "@/components/grid/admin/DeviceGrid";
import Loading from "@/components/reusables/Loading";
// @ts-ignore
import { Button, Input } from "@/components/ui";
import WalletCard from "@/components/ui/WalletCard";
import { getDispatchedDevices } from "@/services/homeOwner";
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

  return (
    <div className="px-5 bg-[#F9FCFD] text-sm py-7">
      {/* <h2>Devices</h2> */}

      {/* Wallet */}
      <WalletCard />

      <AdminDeviceChart />

      {/* Table */}
      <div className="">
        <DeviceGrid data={data.data.dispatchDevices} isUpdating />
      </div>
    </div>
  );
};

export default Devices;
