import DeviceGrid from "@/components/grid/admin/DeviceGrid";
import Loading from "@/components/reusables/Loading";
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
    <div className="px-5">
      <h2>Devices</h2>

      {/* Table */}
      <div className="">
        <DeviceGrid data={data.data.dispatchDevices} isUpdating />
      </div>
    </div>
  );
};

export default Devices;
