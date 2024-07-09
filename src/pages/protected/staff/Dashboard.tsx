import { StackedLineChart } from "@/components/charts/StackedLineChart";
// import PackagesGrid from "@/components/grid/merchant/PackagesGrid";
import OrgDashboardDetailsCard from "@/components/reusables/OrgDashboardDetailsCard";
// import { IComponentMap } from "@/types/general";
// import MainActionSubHeader from "@/components/reusables/MainActionSubHeader";

import { useQuery } from "@tanstack/react-query";
import { getAllApplications } from "@/services/merchantService";
// import { transformPackagesGridData } from "@/utils/reshape";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

type Props = {};

const Dashboard = (_: Props) => {
  const user = useSelector((state: RootState) => state.user.user);

  // const { data, isSuccess } = useQuery({
  //   queryKey: ["get-packages"],
  //   queryFn: () => getAllPackages(),
  // });

  const { data: applicationsData, isSuccess: isApplicationsSuccess } = useQuery(
    {
      queryKey: ["get-all-applications"],
      queryFn: () => getAllApplications(),
    }
  );

  // const pkgData = isSuccess
  //   ? transformPackagesGridData(data.data.packages)
  //   : [];

  // const packagesCount = isSuccess ? data.data.totalPackages : 0;
  const applicationsCount = isApplicationsSuccess
    ? applicationsData.data.totalOrder
    : 0;

  const cardItems = [
    {
      title: "Packages Created",
      value: "",
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
      viewAllUrl: "/merchant/packages/all",
    },
    {
      title: "Applications",
      value: applicationsCount,
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
      viewAllUrl: "/merchant/packages/all",
    },
    {
      title: "Total Earnings",
      value: "£0",
      icon: (
        <div className="size-7 flex justify-center items-center bg-purple-100 rounded-lg">
          <img src="/assets/icons/org-dashboard/project.svg" />
        </div>
      ),
      viewAllUrl: "/merchant/packages/all",
    },
  ];

  // const activePackageComponent: IComponentMap = {
  //   // "loading": "",
  //   "1": <PackagesGrid isUpdating={false} data={[]} />,
  //   "2": (
  //     <>
  //       <div className="bg-white h-[60px] -mb-3 rounded-lg text-[#495057] text-base text-center grid place-items-center border mt-8">
  //         <span>No package created yet</span>
  //       </div>

  //       <MainActionSubHeader
  //         buttonText="Create a Package"
  //         actionUrl="/merchant/packages/new"
  //         subTitle="Create packages to allow users see and apply to your services"
  //         title="Create a package"
  //       />
  //     </>
  //   ),
  // };

  return (
    <div className="px-2 xl:px-8">
      <div className="flex items-strectch gap-[20px] mt-[50px] max-w-[93vw] md:max-w-[64vw] lg:max-w-[70vw] pr-3 overflow-x-scroll pb-5 xl:max-w-full ">
        {user?.roles[0] === "STAFF"
          ? Array.from(cardItems.slice(1), (item) => (
              <OrgDashboardDetailsCard {...item} />
            ))
          : Array.from(cardItems, (item) => (
              <OrgDashboardDetailsCard {...item} />
            ))}
      </div>

      {/* chart - Applications */}
      <div className="my-4">
        <div className="flex justify-between">
          <p className="font-poppins font-bold pb-8 text-main text-xl">
            Orders
          </p>
        </div>
        <div
          style={{
            height: "35vh",
            position: "relative",
            marginBottom: "1%",
            padding: "1%",
          }}
          className="relative w-full"
        >
          <StackedLineChart approved={[]} rejected={[]} received={[]} />
        </div>

        <div className="mt-6 flex justify-center gap-x-3 items-center"></div>
      </div>

      {/* Packages Grid */}
      {/* <div className=" p-3 rounded-md bg-white">
        <h2 className="font-[600] text-lg">Packages Created </h2>

        <div className="-mt-3">{activePackageComponent[1]}</div>
      </div> */}
    </div>
  );
};

export default Dashboard;
