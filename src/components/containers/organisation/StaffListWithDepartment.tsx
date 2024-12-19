// @ts-nocheck
import StaffCard from "@/components/ui/StaffCard";
import useMutations from "@/hooks/useMutations";
import {
  IAssignUnitAdmin,
  IUnitStaff,
} from "@/interfaces/organisation.interface";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

type StaffListWithDepartmentProps = {
  name: string;
  staffMembers: IUnitStaff[];
};

const StaffListWithDepartment: React.FC<StaffListWithDepartmentProps> = ({
  name,
  staffMembers,
}) => {
  const queryClient = useQueryClient();
  const { MakeunitAdmin } = useMutations();

  const handleMakeAdmin = (input: IAssignUnitAdmin) => {
    MakeunitAdmin.mutateAsync(input, {
      onSuccess: (sx: any) => {
        toast.success(sx?.message || `staff role updated`);
        queryClient.invalidateQueries({ queryKey: ["get-admin-staff"] });
      },
      onError: (ex: any) => {
        toast.error(ex.response.data.message || `error updating staff role`);
      },
    });
  };

  const handleRemoveStaff = () => {
    //
  };

  return (
    <div className="space-y-5">
      <h2 className="text-[#495057] font-[600] text-xl">{name}</h2>

      <div className="grid grid-cols-3 gap-6">
        {Array.from(staffMembers, (stf, i) => (
          <StaffCard
            {...stf}
            onAssignRole={handleMakeAdmin}
            onRemoveStaff={handleRemoveStaff}
            key={i}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default StaffListWithDepartment;
