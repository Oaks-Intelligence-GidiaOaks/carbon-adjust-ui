import { FC } from "react";
import { Button, Dropdown, Input } from "../ui";

type Props = {
  handleSubmit?: () => void;
};

const StaffForm: FC<Props> = ({}) => {
  let staffLevels = [
    {
      label: "level 1",
      value: "level 1",
    },
    {
      label: "level 2",
      value: "level 2",
    },
    {
      label: "level 3",
      value: "level 3",
    },
  ];
  let labelStyle = `!fonty-[400] !text-sm !leading-[23.97px] !text-[#333333] !mb-[10px]`;
  let inputClassName = ` bg-[#E4E7E863] bg-opacity-30 text-xs !text-[#9C9C9C] !font-[400] `;

  return (
    <div>
      <form action=" " className="mt-[44px]  md:w-1/2 mx-auto space-y-5">
        <h2 className="page-header">Staff Details</h2>

        <Input
          name="first_name"
          label="First name"
          placeholder="Enter First name"
          inputClassName={inputClassName}
          labelClassName={labelStyle}
          required
        />

        <Input
          name="last_name"
          label="Last name"
          inputClassName={inputClassName}
          labelClassName={labelStyle}
          placeholder="Enter Last name "
        />

        <Input
          name="email"
          label="Email Address"
          labelClassName={labelStyle}
          inputClassName={inputClassName}
          placeholder="Email Address   "
        />

        <Dropdown
          labelClassName={labelStyle}
          placeholder={`select option`}
          label="Staff Access Level"
          name=""
          options={staffLevels}
          wrapperClassName={inputClassName + ` w-full`}
          optionClassName={``}
        />

        <Button className="text-center w-full mt-[30px]">
          <span className="text-white">Add Staff</span>
        </Button>
      </form>
    </div>
  );
};

export default StaffForm;
