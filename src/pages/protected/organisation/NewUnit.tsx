import BackButton from "@/components/reusables/BackButton";
import { Button, Input } from "@/components/ui";
import { ChangeEvent } from "react";

const NewUnit = () => {
  const handleSubmit = () => {
    // validate input field with JOI
    // call mutate function
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const { value, name } = e.target;
    // set or update state
  };

  return (
    <div className="">
      <BackButton className="text-lg mt-6" />
      <div className="mt-10 shadow-md rounded-2xl  md:w-2/3 mx-auto p-10 px-14 bg-white">
        <form action="" onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-center font-[600] font-inter text-2xl">
            Create Unit
          </h2>

          <Input
            name="name"
            label="Enter name"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
            value={""}
            onChange={handleInputChange}
          />

          <Input
            name="name"
            label="Enter Function"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
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

export default NewUnit;