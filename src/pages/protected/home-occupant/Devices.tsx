import TabToggler from "@/components/containers/TabToggler";
import { DeviceTabs } from "@/interfaces/device.interface";
import { useState } from "react";

import DispatchHistory from "@/components/containers/devices/DispatchHistory";
import { IComponentMap } from "@/types/general";
import AddedDevices from "@/components/containers/devices/AddedDevices";
import DispatchDevices from "@/components/containers/devices/DispatchedDevices";

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
    [DeviceTabs.DispatchedDevices]: <DispatchDevices status="processed" />,
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
    </div>
  );
};

export default Devices;
