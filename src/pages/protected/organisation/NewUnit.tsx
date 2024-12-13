import BackButton from "@/components/reusables/BackButton";
import { Button, Input } from "@/components/ui";
import { IUnit } from "@/interfaces/organisation.interface";
import { FormSchemas } from "@/schemas/forms";
import { CreateUnit } from "@/services/organisation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const NewUnit = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUnit>({
    resolver: yupResolver(FormSchemas().CreateUnitSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create-unit"],
    mutationFn: (input: IUnit) => CreateUnit(input),
    onSuccess: (sx: any) => {
      reset();
      toast.success(sx.message || "Unit created successfully");
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message || "error occurred.");
    },
  });

  const onSubmit = (value: IUnit) => {
    mutateAsync(value);
  };

  return (
    <div className="">
      <BackButton className="text-lg mt-6" />

      <div className="mt-10 shadow-md rounded-2xl  md:w-2/3 mx-auto p-10 px-14 bg-white">
        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-center font-[600] font-inter text-2xl">
            Create Unit
          </h2>

          <Input
            register={register}
            name="name"
            label="Enter name"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
            error={errors.name?.message}
          />

          <Input
            register={register}
            name="unitFunction"
            label="Enter Function"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
            error={errors.unitFunction?.message}
          />

          <Button disabled={isPending} className="w-full">
            {isPending ? (
              <Oval height={"15"} color="white" />
            ) : (
              <span className="text-center">Create</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewUnit;
