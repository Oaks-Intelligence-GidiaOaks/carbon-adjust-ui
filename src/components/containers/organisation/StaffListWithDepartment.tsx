import StaffCard from "@/components/ui/StaffCard";
import React from "react";

type StaffListWithDepartmentProps = {
  unitName: string;
  staffList: any[];
};

const StaffListWithDepartment: React.FC<StaffListWithDepartmentProps> = ({
  staffList,
  unitName,
}) => {
  return (
    <div className="space-y-5">
      <h2 className="text-[#495057] font-[600] text-xl">{unitName}</h2>

      <div className="grid grid-cols-3 gap-6">
        {Array.from(staffList, (stf, i) => (
          <StaffCard {...stf} key={i} className="w-full" />
        ))}
      </div>
    </div>
  );
};

export default StaffListWithDepartment;
