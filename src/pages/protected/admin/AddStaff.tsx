import StaffForm from "@/components/containers/StaffForm";

type Props = {};

const AddStaff = (_: Props) => {
  return (
    <div className="px-4">
      <div className="">
        <h2 className="page-header">Add Staff</h2>
      </div>

      <StaffForm />
    </div>
  );
};

export default AddStaff;
