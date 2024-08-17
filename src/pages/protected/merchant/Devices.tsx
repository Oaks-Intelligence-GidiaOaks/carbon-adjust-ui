import TabToggler from "@/components/containers/TabToggler";
import { DeviceTabs } from "@/interfaces/device.interface";
import { useState } from "react";
// @ts-ignore
import NoDevices from "@/components/containers/devices/NoDevices";
import { Button } from "@/components/ui";
import { PlusIcon } from "@/assets/icons";
import DispatchHistory from "@/components/containers/devices/DispatchHistory";
import { IComponentMap } from "@/types/general";
import AddedDevices from "@/components/containers/devices/AddedDevices";

const Devices = () => {
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
    <div className="bg-[#FAFDFF] p-[20px] font-poppins min-h-screen">
      <div className="flex-center flex-wrap  gap-2 w-full sticky top-0 pb-3 bg-[#FAFDFF] z-[50]">
        <div className="md:w-4/5">
          {/* Tab selectors */}
          <TabToggler
            activeTab={activeTab}
            onClick={handleTabSwitch}
            tabs={tabs}
          />
        </div>

        <Button className="rounded-[20px] flex-center gap-1 ml-auto">
          <span>Add device</span>
          <PlusIcon />
        </Button>
      </div>

      <div className="mt-[15px]">{activeComponent[activeTab]}</div>
    </div>
  );
};

export default Devices;
