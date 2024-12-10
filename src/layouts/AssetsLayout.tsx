import TabToggler from "@/components/containers/TabToggler";
import UseScrollToTop from "@/hooks/useScrollToTop";
import { AssetTabs } from "@/interfaces/device.interface";
import { FC, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

interface AssetsLayoutProps {
  type?: string;
}

const AssetsLayout: FC<AssetsLayoutProps> = ({ type = "home-occupant" }) => {
  const tabs: AssetTabs[] = [
    AssetTabs.Devices,
    AssetTabs.Buildings,
    AssetTabs.Transport,
    AssetTabs.Purchases,
  ];

  const { pathname } = useLocation();

  const navigate = useNavigate();
  const contentRef = useRef<null | HTMLDivElement>(null);

  UseScrollToTop(contentRef);

  const handleTabSwitch = (tab: string) => {
    type === "home-occupant"
      ? navigate(`/dashboard/${tab.toLocaleLowerCase()}`)
      : navigate(`/organization/${tab.toLocaleLowerCase()}`);
  };

  const getActiveTab = (pathString: string) => {
    switch (true) {
      case pathString.includes("devices"):
        return AssetTabs.Devices;
      case pathString.includes("building"):
        return AssetTabs.Buildings;
      case pathString.includes("transport"):
        return AssetTabs.Transport;
      default:
        return AssetTabs.Purchases;
    }
  };

 
  return (
    <div
      ref={contentRef}
      className="bg-[#FAFDFF] p-[20px] font-poppins min-h-screen"
    >
      <h1 className="font-[500] text-[#667085] text-[24px] mb-4">Asset</h1>

      <div className="md:w-4/5">
        <TabToggler
          activeTab={getActiveTab(pathname)}
          onClick={handleTabSwitch}
          tabs={tabs}
        />
      </div>

      <Outlet />
    </div>
  );
};

export default AssetsLayout;
