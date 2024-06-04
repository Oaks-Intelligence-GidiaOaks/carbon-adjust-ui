// type Props = {};

import { Button, Dropdown, Input } from "@/components/ui";

const AddPackage = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  let inputClassName = ` bg-[#E4E7E863] bg-opacity-30 text-xs !text-[#9C9C9C] !font-[400] `;
  let labelStyle = `!fonty-[400] !text-sm !leading-[23.97px] !text-[#333333] !mb-[10px]`;

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

  return (
    <div className="font-poppins">
      <h2 className="page-header"> Create package</h2>

      <form
        action=" "
        onSubmit={handleSubmit}
        className=" md:w-1/2 mx-auto space-y-4"
      >
        {/* avatar */}
        <div>
          <span className="text-xs mb-3">Click to insert logo</span>
          <div className="h-[100px] w-[100px] relative rounded-full border bg-[#F2F2F2] grid place-items-center">
            <img src="/assets/icons/img-icon.svg" alt="icon" className="" />

            <img
              src="/assets/icons/pen-icon.svg"
              alt="icon"
              className="absolute bottom-0 -right-1"
            />
          </div>
        </div>

        <Dropdown
          labelClassName={labelStyle}
          placeholder={`Select institution name`}
          label="Institution name"
          name=""
          options={staffLevels}
          wrapperClassName={inputClassName + ` w-full`}
          optionClassName={``}
        />

        <Input
          name="package_name"
          label="Package name"
          placeholder="Enter Package name"
          inputClassName={inputClassName}
          labelClassName={labelStyle}
          required
        />

        <Input
          type="number"
          labelClassName={labelStyle}
          placeholder={`Select institution name`}
          label="Maximum amount *"
          name=""
          inputClassName={inputClassName}
        />

        <Dropdown
          labelClassName={labelStyle}
          placeholder={`Select`}
          label="Maximum repayment period *"
          name=""
          options={[
            { label: "10 months", value: "10" },
            { label: "18 months", value: "10" },
          ]}
          wrapperClassName={inputClassName + ` w-full`}
          optionClassName={``}
        />

        <div className="font-[400] text-sm text-[#333333]">
          <label htmlFor="" className="">
            Interest rate type
          </label>

          <div className="py-[10px] flex-center gap-2">
            <input type="radio" name="" id="" className="" />
            <span>Variable</span>
          </div>

          <div className="flex-center gap-2">
            <input type="radio" name="" id="" className="" /> <span>Fixed</span>
          </div>
        </div>

        <Button className="text-center w-full mt-4">
          <span className="text-white">Create</span>
        </Button>
      </form>
    </div>
  );
};

export default AddPackage;
