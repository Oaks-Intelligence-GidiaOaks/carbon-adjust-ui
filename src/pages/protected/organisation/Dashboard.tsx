import NoDepartmentCard from "@/components/empty-states/NoDepartmentCard";
import CorporateWalletCard from "@/components/ui/CorporateWalletCard";
import InfoCard from "@/components/ui/InfoCard";
import { AiTwotoneCreditCard } from "react-icons/ai";
import { FaBuilding } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { RootState } from "@/app/store";
import DepartmentWithStaffCard from "@/components/containers/organisation/DepartmentWithStaffCard";
import StaffRequestCard from "@/components/ui/StaffRequestCard";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AllAdminUnits, AllUnitsRequests } from "@/services/organisation";
import { DepartmentWithStaffCardProps } from "@/interfaces/organisation.interface";
import { useSelector } from "react-redux";

interface IDashboardStats {
  units: Array<DepartmentWithStaffCardProps>;
  totalUnits: number;
  totalSubUnits: number;
  totalStaff: number;
  unitStats: any;
  totalAssets: number;
}

const Dashboard = () => {
  const userData = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const isUnitAdmin =
    userData?.roles.includes("STAFF_CORPORATE") &&
    userData?.adminRoles?.isUnitAdmin;
  const corporateAdmin = userData?.roles.includes("CORPORATE_USER_ADMIN");

  const { data } = useQuery({
    queryKey: ["get-admin-units"],
    queryFn: () => AllAdminUnits(),
    enabled: isUnitAdmin || corporateAdmin,
  });

  const { data: Requests } = useQuery({
    queryKey: ["get-all-requests"],
    queryFn: () => AllUnitsRequests(),
  });

  const request = Requests?.data?.receipts || null;
  const stats: IDashboardStats = data?.data || null;

  const infoCards = [
    {
      title: "Units",
      count: stats?.totalUnits || 0,
      buttonText: "View All Units",
      icon: FaBuilding,
      iconStyle: "bg-yellow-100 text-yellow-500",
    },
    {
      title: "Sub Units",
      count: stats?.totalSubUnits || 0,
      buttonText: "View All Units",
      icon: FaBuilding,
      iconStyle: "bg-yellow-100 text-yellow-500",
    },
    {
      title: "Staff",
      count: stats?.totalStaff || 0,
      buttonText: "View All Staff",
      icon: HiMiniUsers,
      iconStyle: "bg-[#E5E4FF] text-[#5233FF]",
    },
    {
      title: "Assets",
      count: stats?.totalAssets || 0,
      buttonText: "View All Asset",
      icon: AiTwotoneCreditCard,
      iconStyle: "bg-[#D9FFD6] text-[#00F83E]",
    },
  ];

  const unitInfoCards = [
    {
      title: "Sub Units",
      count: isUnitAdmin ? stats?.unitStats[0]?.totalSubUnits || 0 : null,
      buttonText: "View All Units",
      icon: FaBuilding,
      iconStyle: "bg-yellow-100 text-yellow-500",
    },
    {
      title: "Staff",
      count: isUnitAdmin ? stats?.unitStats[0]?.totalStaff || 0 : null,
      buttonText: "View All Staff",
      icon: HiMiniUsers,
      iconStyle: "bg-[#E5E4FF] text-[#5233FF]",
    },
    {
      title: "Assets",
      count: isUnitAdmin ? stats?.unitStats[0]?.totalAssets || 0 : null,
      buttonText: "View All Asset",
      icon: AiTwotoneCreditCard,
      iconStyle: "bg-[#D9FFD6] text-[#00F83E]",
    },
  ];
  const lastThreeRequests = Array.isArray(request) ? request.slice(-3) : [];

  return (
    <div className="space-y-10 bg-[#F9FCFD] px-[40px] py-[28px]">
      {/* card */}
      <CorporateWalletCard
        organization="Bolt"
        walletHolder="Danny Walters"
        ledgerBalance="532,789 tCO2e"
        emissionScore={560}
        totalOffset="532,789 tCO2e"
      />

      {/* info cards */}
      {userData && userData.roles.includes("CORPORATE_USER_ADMIN") && (
        <>
          <div className="flex-center md:flex-row items-center gap-4">
            {Array.from(infoCards, (it, i) => (
              <InfoCard key={i} {...it} onButtonClick={() => {}} />
            ))}
          </div>

          {/* Carbon Footprint chart */}

          {/* Empty State */}
          <div>
            <NoDepartmentCard
              title="Create Unit"
              buttonText="Create Unit"
              onButtonClick={() => navigate("/organisation/units/new")}
            />
          </div>
        </>
      )}

      {isUnitAdmin && (
        <>
          <div className="flex-center md:flex-row items-center gap-4">
            {Array.from(unitInfoCards, (it, i) => (
              <InfoCard key={i} {...it} onButtonClick={() => {}} />
            ))}
          </div>
        </>
      )}

      <div className="space-y-4">
        <div className="flex-center justify-between">
          <h2 className="font-semibold">Requests</h2>

          <Link to="/organisation/requests">
            <button>See all</button>
          </Link>
        </div>

        {lastThreeRequests && lastThreeRequests.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 gap-y-5">
            {lastThreeRequests.map((req, i) => (
              <StaffRequestCard
                key={i}
                id={req._id}
                name={req?.staff?.name}
                role={req?.staff?.jobTitle}
                department={req?.unit?.name}
                requestDetails=""
                status={req?.status}
                profileImage="https://via.placeholder.com/150"
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4">
            No Pending requests at the moment.
          </div>
        )}
      </div>

      <div className="space-y-5">
        {Array.from(stats?.units.slice(0, 3) || [], (it) => (
          <DepartmentWithStaffCard {...it} key={it._id} climateScore={4} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
