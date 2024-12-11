import TabToggler from "@/components/containers/TabToggler";
import UseScrollToTop from "@/hooks/useScrollToTop";
import { UnitTabs } from "@/interfaces/app.interface";
import { FC, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const UnitsLayout: FC = () => {
  const tabs: UnitTabs[] = [UnitTabs.UNIT, UnitTabs.STAFF];

  const { pathname } = useLocation();

  const navigate = useNavigate();
  const contentRef = useRef<null | HTMLDivElement>(null);

  UseScrollToTop(contentRef);

  const handleTabSwitch = (tab: string) => {
    navigate(`/organisation/${tab.toLocaleLowerCase()}`);
  };

  const getActiveTab = (pathString: string) => {
    switch (true) {
      case pathString.includes(UnitTabs.UNIT.toLowerCase()):
        return UnitTabs.UNIT;
      case pathString.includes(UnitTabs.STAFF.toLowerCase()):
        return UnitTabs.STAFF;
      default:
        return UnitTabs.UNIT;
    }
  };

  return (
    <div
      ref={contentRef}
      className="bg-[#FAFDFF] p-[20px] font-poppins min-h-screen"
    >
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

export default UnitsLayout;
