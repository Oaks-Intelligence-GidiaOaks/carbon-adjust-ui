import React from "react";
import Modal from "./Modal";
import { Button } from "../ui";
import SelectInput from "../ui/SelectInput";
import { StaffRole } from "@/interfaces/user.interface";

const staffRoles = [
  { label: "GENERAL ADMIN", value: StaffRole.GENERAL_ADMIN },
  { label: "UNIT ADMIN", value: StaffRole.UNIT_ADMIN },
  { label: "SUB UNIT ADMIN", value: StaffRole.SUB_UNIT_ADMIN },
  ,
];

const AssignStaffRoleModal: React.FC = () => {
  return (
    <Modal>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 font-kumbh">
        <div className="bg-white rounded-lg shadow-lg w-full mx-5 max-w-md p-8 animate-bounceIn">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Assign Role
          </h2>

          <form className="space-y-6">
            {/* Assign Role */}
            <SelectInput
              label="Assign Role"
              //   @ts-ignore
              options={staffRoles}
              className=""
            />

            {/* Sub-Unit */}
            <SelectInput
              label="Sub-Unit"
              //   @ts-ignore
              options={staffRoles}
              className=""
            />

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
