import TabToggler from "@/components/containers/TabToggler";
import { IComponentMap } from "@/types/general";
import { OrganizationTransportTabs } from "@/interfaces/transport.interface";
import { FleetTransport, IndividualTransport, StaffTransport } from "@/components/containers/organisation/transport";
import { useState } from "react";

const Transport = () => {
  const tabs: OrganizationTransportTabs[] = [
    OrganizationTransportTabs.Individual,
    OrganizationTransportTabs.Staff,
    OrganizationTransportTabs.Fleet,
  ];
  const [activeTab, setActiveTab] = useState<OrganizationTransportTabs>(tabs[0]);

  const handleTabSwitch = (tab: any) => {
    setActiveTab(tab);
  };

  const activeComponent: IComponentMap = {
    [OrganizationTransportTabs.Individual]: <IndividualTransport />,
    [OrganizationTransportTabs.Staff]: <StaffTransport />,
    [OrganizationTransportTabs.Fleet]: <FleetTransport />,
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
