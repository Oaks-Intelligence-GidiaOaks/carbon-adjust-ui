import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import Modal from "./Modal";
import { Button } from "../ui";
import SelectInput from "../ui/SelectInput";
import { StaffRole } from "@/interfaces/user.interface";
// import { IUnit } from "@/interfaces/organisation.interface";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import useMutations from "@/hooks/useMutations";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const staffRoles = [
  { label: "UNIT ADMIN", value: StaffRole.UNIT_ADMIN },
  // { label: "SUB UNIT ADMIN", value: StaffRole.SUB_UNIT_ADMIN },
  ,
];

interface IAssignStaffRole {
  staffId: string;
  unitId?: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const AssignStaffRoleModal: React.FC<IAssignStaffRole> = ({
  staffId,
  unitId,
  setShowModal,
  showModal,
}) => {
  console.log(unitId, "unit id");
  const queryClient = useQueryClient();

  const { MakeunitAdmin } = useMutations();
  const ref = useRef<HTMLDivElement | null>(null);

  // @ts-ignore
  const [roleType, setRoleType] = useState<StaffRole | null>(
    StaffRole.UNIT_ADMIN
  );

  useOutsideCloser(ref, showModal, setShowModal);

  const handleAssignRole = (e: any) => {
    e.preventDefault();

    if (roleType === StaffRole.UNIT_ADMIN) {
      MakeunitAdmin.mutateAsync(
        { staffId, unitId },
        {
          onSuccess: (sx: any) => {
            toast.success(sx.message || `Staff Role Updated succesfully`);
            queryClient.invalidateQueries({ queryKey: ["get-admin-units"] });
            queryClient.invalidateQueries({ queryKey: ["get-admin-staff"] });
            setShowModal(false);
          },
          onError: (ex: any) => {
            toast.error(
              ex.response.data.message || "error updating staff role"
            );
          },
        }
      );
    }
  };

  return (
    <Modal>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 font-kumbh">
        <div
          ref={ref}
          className="bg-white rounded-lg shadow-lg w-full mx-5 max-w-md p-8 animate-bounceIn"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Assign Role
          </h2>

          <form className="space-y-6" onSubmit={handleAssignRole}>
            {/* Assign Role */}
            <SelectInput
              label="Assign Role"
              //   @ts-ignore
              options={staffRoles}
              onChange={() => {}}
              className=""
            />

            {/* Sub-Unit */}
            {/* <SelectInput
              label="Sub-Unit"
              //   @ts-ignore
              options={staffRoles}
              className=""
            /> */}

            {/* Submit Button */}
            <Button className="w-full">
              <span className="">Assign</span>
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AssignStaffRoleModal;
