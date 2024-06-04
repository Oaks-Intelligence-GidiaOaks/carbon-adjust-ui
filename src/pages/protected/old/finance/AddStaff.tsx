import StaffForm from "@/components/containers/StaffForm";
import { FC } from "react";

type Props = {};

const AddStaff: FC<Props> = ({}) => {
  return (
    <div>
      <div className="">
        <h2 className="page-header">Add Staff</h2>
      </div>

      <StaffForm />
    </div>
  );
};

export default AddStaff;
