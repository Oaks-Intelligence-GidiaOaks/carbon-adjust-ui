import NoDepartmentCard from "@/components/empty-states/NoDepartmentCard";
import CorporateWalletCard from "@/components/ui/CorporateWalletCard";
import InfoCard from "@/components/ui/InfoCard";
import { AiTwotoneCreditCard } from "react-icons/ai";
import { FaBuilding } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";

import DepartmentWithStaffCard from "@/components/containers/organisation/DepartmentWithStaffCard";
import StaffRequestCard from "@/components/ui/StaffRequestCard";

const Dashboard = () => {
  const infoCards = [
    {
      title: "Departments",
      count: 0,
      buttonText: "View All Departments",
      icon: FaBuilding,
      iconStyle: "bg-yellow-100 text-yellow-500",
    },
    {
      title: "Staff",
      count: 0,
      buttonText: "View All Staf",
      icon: HiMiniUsers,
      iconStyle: "bg-[#E5E4FF] text-[#5233FF]",
    },
    {
      title: "Assets",
      count: 0,
      buttonText: "View All Asset",
      icon: AiTwotoneCreditCard,
      iconStyle: "bg-[#D9FFD6] text-[#00F83E]",
    },
  ];

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
      <div className=" flex-center md:flex-row items-center gap-4">
        {Array.from(infoCards, (it, i) => (
          <InfoCard key={i} {...it} onButtonClick={() => {}} />
        ))}
      </div>

      {/* Crabon Footprint chart  */}

      {/* Empty State */}
      <div>
        <NoDepartmentCard
          title="Create Department"
          buttonText="Create department"
          onButtonClick={() => {}}
        />
      </div>

      <div className="space-y-4">
        <div className="flex-center justify-between">
          <h2 className="font-semibold">Requests</h2>

          <button>See all</button>
        </div>

        <div className="grid grid-cols-3 gap-4 gap-y-5">
          {Array.from({ length: 3 }, () => (
            <StaffRequestCard
              name="Todd H. Harrison"
              role="Project Manager"
              department="Marketing Department"
              requestDetails="Has made a request to register buildings and add assets."
              status="Pending"
              profileImage="https://via.placeholder.com/150" // Replace with actual image URL
              onApprove={() => alert("Request Approved!")}
              onDecline={() => alert("Request Declined!")}
              onViewDetails={() => alert("Viewing Details...")}
            />
          ))}
        </div>
      </div>

      <DepartmentWithStaffCard
        departmentName="Marketing Department"
        staffCount={10}
        assetsCount={4}
        climateScore={4}
      />
    </div>
  );
};

export default Dashboard;
