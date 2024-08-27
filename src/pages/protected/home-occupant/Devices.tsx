import TabToggler from "@/components/containers/TabToggler";
import { DeviceTabs } from "@/interfaces/device.interface";
import { useState } from "react";
// @ts-ignore
import NoDevices from "@/components/containers/devices/NoDevices";
import DispatchHistory from "@/components/containers/devices/DispatchHistory";
import { IComponentMap } from "@/types/general";
import AddedDevices from "@/components/containers/devices/AddedDevices";
import DeviceDialog from "@/components/dialogs/DeviceDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const Devices = () => {
  const { device } = useSelector((state: RootState) => state.assets);

  const tabs: DeviceTabs[] = [
    DeviceTabs.AddedDevices,
    DeviceTabs.DispatchedDevices,
    DeviceTabs.DispatchHistory,
  ];

  const [activeTab, setActiveTab] = useState<DeviceTabs>(tabs[0]);

  const handleTabSwitch = (tab: any) => {
    setActiveTab(tab);
  };

  const activeComponent: IComponentMap = {
    [DeviceTabs.AddedDevices]: <AddedDevices />,
    [DeviceTabs.DispatchedDevices]: <div>No Dispatched Devices</div>,
    [DeviceTabs.DispatchHistory]: <DispatchHistory />,
  };

  return (
    <div className=" py-[20px] font-poppins">
      <div className="flex-center flex-wrap  gap-2 w-full sticky top-0 pb-3 bg-[#FAFDFF] z-[50]">
        <div className="md:w-4/5">
          <TabToggler
            activeTab={activeTab}
            onClick={handleTabSwitch}
            tabs={tabs}
            variant="underline"
          />
        </div>
      </div>

      <div className="mt-[15px]">{activeComponent[activeTab]}</div>

      {(device.id as string).length && (
        <DeviceDialog
          deviceId={device.id as string}
          actions={[
            { text: "No", actionType: "secondary", onClick: () => {} },
            { text: "Yes", actionType: "destructive", onClick: () => {} },
          ]}
          headerText="Cancel Schedule"
          leadText="Are you sure you want to cancel schedule for this device?"
        />
      )}
    </div>
  );
};

export default Devices;
