import TabToggler from "@/components/containers/TabToggler";
import OrgDashboardDetailsCard from "@/components/reusables/OrgDashboardDetailsCard";
import UseScrollToTop from "@/hooks/useScrollToTop";
import { SalesTabs } from "@/interfaces/sales.interface";
import { fetchInventory, getPackageCategories } from "@/services/merchant";
import { useQuery } from "@tanstack/react-query";
import { FC, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const SalesLayout: FC = (_) => {
  const tabs: SalesTabs[] = [SalesTabs.Sales, SalesTabs.Inventory];

  const { pathname } = useLocation();

  const navigate = useNavigate();
  const contentRef = useRef<null | HTMLDivElement>(null);

  UseScrollToTop(contentRef);

  const handleTabSwitch = (tab: string) => {
    navigate(`/merchant/${tab.toLocaleLowerCase()}`);
  };

  const getActiveTab = (pathString: string) => {
    switch (true) {
      case pathString.includes("sales"):
        return SalesTabs.Sales;
      case pathString.includes("inventory"):
        return SalesTabs.Inventory;
      default:
        return SalesTabs.Sales;
    }
  };

  const {
    data: categories
  } = useQuery({
    queryKey: ["get categories"],
    queryFn: () => getPackageCategories(),
    enabled: true,
  });

  const { data: inventory } = useQuery({
    queryKey: ["get-inventory"],
    queryFn: () => fetchInventory(),
  });

  const packagesCount = 0;
  const applicationsCount = 0;

  const cardItems = [
    {
      title: "Categories",
      value: categories?.data?.data?.categories?.length,
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
      viewAllUrl: "#",
    },
    {
      title: "Total Products",
      value: inventory?.data?.inventories?.length,
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/helmet.svg" />
        </div>
      ),
      viewAllUrl: "#",
    },
    {
      title: "Top Selling",
      value: packagesCount,
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/doc.svg" />
        </div>
      ),
      viewAllUrl: "#",
    },
    {
      title: "Low Stock",
      value: applicationsCount,
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/devices.svg" />
        </div>
      ),
      viewAllUrl: "#",
    },
    // {
    //   title: "Total Revenue",
    //   value: `£${formatNumberWithCommas("0")}`,
    //   icon: (
    //     <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
    //       <img src="/assets/icons/org-dashboard/doc.svg" />
    //     </div>
    //   ),
    //   viewAllUrl: "#",
    // },
  ];

  return (
    <div
      ref={contentRef}
      className="bg-[#FAFDFF] p-[20px] font-poppins min-h-screen"
    >
      {/* <h1 className="font-[500] text-[#667085] text-[24px] mb-4">Asset</h1> */}

      <div className="md:w-4/5">
        <TabToggler
          activeTab={getActiveTab(pathname)}
          onClick={handleTabSwitch}
          tabs={tabs}
        />

        <div className="flex items-strectch gap-[20px] mt-[50px] max-w-[93vw] md:max-w-[64vw] lg:max-w-[70vw] pr-3 overflow-x-scroll pb-5 xl:max-w-full ">
          {Array.from(cardItems, (item) => (
            <OrgDashboardDetailsCard {...item} />
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default SalesLayout;
