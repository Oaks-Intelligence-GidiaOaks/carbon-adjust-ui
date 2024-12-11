import BackButton from "@/components/reusables/BackButton";
import { Button, Input } from "@/components/ui";
import { ChangeEvent } from "react";

const NewStaff = () => {
  // import mutation function from useMutations

  const handleSubmit = () => {
    // validate input field with JOI
    // call mutate function
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const { value, name } = e.target;

    // set or update state
  };

  const handleTriggerDialog = () => {};

  return (
    <div className="">
      <BackButton className="text-lg mt-6" />

      <div className=" shadow-md rounded-2xl  md:w-2/3 mx-auto p-10 px-14 bg-white">
        <form action="" onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-center font-[600] font-inter text-2xl">
            Add Staff
          </h2>

          <div className="space-y-2">
            <h4 className="font-[400] text-sm">Upload Image</h4>

            {/* image holder  */}
            <div
              onClick={handleTriggerDialog}
              className="border rounded-xl grid place-items-center shadow-sm  w-[120px] h-[120px]"
            >
              {/*  */}
            </div>
          </div>

          <Input
            name="name"
            label="Name"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
            value={""}
            onChange={handleInputChange}
          />

          <Input
            name="name"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
            label="Job title"
            value={""}
            onChange={handleInputChange}
          />

          <Input
            name="name"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
            label="Department"
            value={""}
            onChange={handleInputChange}
          />

          <Input
            name="name"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
            label="Email"
            value={""}
            onChange={handleInputChange}
          />

          <Input
            name="name"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
            label="Authorization Level"
            value={""}
            onChange={handleInputChange}
          />

          <Button className="w-full">
            <span>Create</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewStaff;
