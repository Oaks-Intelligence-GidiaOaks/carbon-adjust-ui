import StaffForm from "@/components/containers/StaffForm";
import { FC } from "react";

type Props = {};

const AddStaff: FC<Props> = ({}) => {
  return (
    <div className="mx-4">
      <div className="">
        <h2 className="page-header">Add Staffdd</h2>
      </div>

      <StaffForm />
    </div>
  );
};

export default AddStaff;