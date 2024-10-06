import { useState } from "react";
import TabToggler from "../TabToggler";
import { IComponentMap } from "@/types/general";
import RegularPackages from "./RegularPackages";
import GrantPackages from "./GrantPackages";

const SuperMerchantPackages = () => {
  const [activeTab, setActiveTab] = useState<string>("Regular");
  const tabs = ["Regular", "Grant"];

  const activeComponent: IComponentMap = {
    Regular: <RegularPackages />,
    Grant: <GrantPackages />,
  };

  return (
    <div className="px-5 pt-4">
      {/* Tabs */}
      <div className="lg:w-3/5">
        <TabToggler activeTab={activeTab} onClick={setActiveTab} tabs={tabs} />
      </div>

      {/* Tab content  */}
      <div className="">{activeComponent[activeTab]}</div>
    </div>
  );
};

export default SuperMerchantPackages;
