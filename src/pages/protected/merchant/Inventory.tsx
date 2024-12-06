
import TabToggler from "@/components/containers/TabToggler";
import { IComponentMap } from "@/types/general";
import { InventoryTabs } from "@/interfaces/sales.interface";
import { useState } from "react";
import { InventoryHistoryGrid } from "@/components/grid/merchant/InventoryHistoryGrid";
import { AllInventoryGrid } from "@/components/grid/merchant/AllInventoryGrid";

const Inventory = () => {
  const tabs: InventoryTabs[] = [InventoryTabs.All, InventoryTabs.History];
  const [activeTab, setActiveTab] = useState<string>(InventoryTabs.All);

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
  };

  const activeComponent: IComponentMap = {
    [InventoryTabs.All]: <AllInventoryGrid className="mt-8 max-w-[90vw]"/>,
    [InventoryTabs.History]: <InventoryHistoryGrid className="mt-8 max-w-[90vw]"/>,
  };

  return (
    <div className="py-[20px] font-poppins">
      <div className="flex-center flex-wrap gap-2 w-full sticky top-0 pb-3 bg-[#FAFDFF] z-[50]">
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

export default Inventory;

