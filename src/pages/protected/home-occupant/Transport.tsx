import TabToggler from "@/components/containers/TabToggler";
import { useState } from "react";
import { IComponentMap } from "@/types/general";
import { TransportTabs } from "@/interfaces/transport.interface";
import Vehicles from "@/components/containers/transport/Vehicles";
import TransportHistory from "@/components/containers/transport/TransportHistory";

const Transport = () => {
  const tabs: TransportTabs[] = [
    TransportTabs.Transport,
    TransportTabs.TravelHistory,
  ];

  const [activeTab, setActiveTab] = useState<TransportTabs>(tabs[0]);

  const handleTabSwitch = (tab: any) => {
    setActiveTab(tab);
  };

  const activeComponent: IComponentMap = {
    [TransportTabs.Transport]: <Vehicles />,
    [TransportTabs.TravelHistory]: <TransportHistory />,
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

export default Transport;
