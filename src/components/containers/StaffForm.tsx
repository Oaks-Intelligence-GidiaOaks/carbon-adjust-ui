import { FC, useState } from "react";
import { Button, Dropdown, Input } from "../ui";
import { Oval } from "react-loader-spinner";
import { useMutation } from "@tanstack/react-query";
import { addStaff } from "@/services/merchant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  handleSubmit?: () => void;
};

interface AccessLevel {
  label: string;
  value: string;
}

interface User {
  firstName: string;
  surname: string;
  email: string;
  accessLevel: AccessLevel;
}

const StaffForm: FC<Props> = ({}) => {
  const navigate = useNavigate();

  function isValidStaff(user: User): boolean {
    // Check if firstName, surname, and email have non-empty values
    if (!user.firstName || !user.surname || !user.email) {
      return false;
    }

    // Check if accessLevel.label and accessLevel.value have non-empty values
    if (!user.accessLevel.label || !user.accessLevel.value) {
      return false;
    }

    return true;
  }
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    email: "",
    accessLevel: {
      label: "",
      value: "",
    },
  });

  let staffLevels = [
    {
      label: "Full",
      value: "FULL",
    },
    {
      label: "Restricted",
      value: "RESTRICTED",
    },
  ];
  let labelStyle = `!fonty-[400] !text-sm !leading-[23.97px] !text-[#333333] !mb-[10px]`;
  let inputClassName = `bg-[#E4E7E863] bg-opacity-30 text-xs !font-[400] `;
  let dropdownClassName = `bg-[#E4E7E863] bg-opacity-30 !font-[400] `;

  const addStaffMutation = useMutation({
    mutationKey: ["add-staff"],
    mutationFn: (data: any) => addStaff(data),
    onSuccess: () => {
      toast.success("Staff account created successfully");
      navigate("/merchant/staff");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Error creating staff account"
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addStaffMutation.mutate({ ...form, accessLevel: form.accessLevel.value });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-[44px]  md:w-1/2 mx-auto space-y-5"
      >
        <h2 className="page-header">Staff Details</h2>

        <Input
          name="first_name"
          label="First name"
          placeholder="Enter First name"
          inputClassName={inputClassName}
          labelClassName={labelStyle}
          value={form.firstName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, firstName: e.target.value }))
          }
          required
        />

        <Input
          name="last_name"
          label="Last name"
          inputClassName={inputClassName}
          labelClassName={labelStyle}
          value={form.surname}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, surname: e.target.value }))
          }
          placeholder="Enter Last name"
          required
        />

        <Input
          name="email"
          label="Email Address"
          labelClassName={labelStyle}
          inputClassName={inputClassName}
          value={form.email}
          type="email"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Email Address"
          required
        />

        <Dropdown
          labelClassName={labelStyle}
          placeholder={`Select option`}
          label="Staff Access Level"
          name=""
          options={staffLevels}
          wrapperClassName={dropdownClassName + ` w-full`}
          optionClassName={``}
          value={form.accessLevel}
          onOptionChange={(value) =>
            setForm((prev) => ({ ...prev, accessLevel: value }))
          }
        />

        <Button
          disabled={!isValidStaff(form) || addStaffMutation.isPending}
          className="rounded-lg text-white mt-4 w-full h-11"
        >
          {addStaffMutation.isPending ? (
            <Oval
              visible={addStaffMutation.isPending}
              height="20"
              width="20"
              color="#ffffff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <span>Add Staff</span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default StaffForm;
