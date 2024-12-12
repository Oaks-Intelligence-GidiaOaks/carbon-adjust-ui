import BackButton from "@/components/reusables/BackButton";
import { Button, Input } from "@/components/ui";
import SelectInput from "@/components/ui/SelectInput";
import { ICreateStaff } from "@/interfaces/organisation.interface";
import { FormSchemas } from "@/schemas/forms";
import { AllAdminUnits, CreateStaff } from "@/services/organisation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const levels = [
  {
    label: "FULL ACCESS",
    value: "FULL_ACCESS",
  },
  {
    label: "RESTRICTED ACCESS",
    value: "RESTRICTED_ACCESS",
  },
];

const NewStaff = () => {
  const navigate = useNavigate();

  const { data: allUnits, isLoading } = useQuery({
    queryKey: ["get-all-admin-units"],
    queryFn: () => AllAdminUnits(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create-corporate-staff"],
    mutationFn: (input: FormData) => CreateStaff(input),
    onSuccess: (sx: any) => {
      toast.success(sx.message || `staff created successfully`);
      navigate(`/organisation/staff`);
      reset();
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message || `error creating staff`);
    },
  });

  let units =
    allUnits?.data?.units?.map((it: any) => ({
      label: it.name,
      value: it._id,
    })) || [];

  const {
    watch,
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateStaff>({
    resolver: yupResolver<any>(FormSchemas().CreateOrganisationStaff),
  });

  const [filePreview, setFilePreview] = useState<string | null>(null);

  watch("file");

  const fileInput = useRef<HTMLInputElement>(null);

  const onSubmit = (data: any) => {
    const rData: ICreateStaff = {
      ...data,
      auThorizationLevel: data.auThorizationLevel.value,
      unit: data.unit.value,
      file: data.file[0],
    };

    const newStaff = new FormData();

    Object.entries(rData).map((item) => {
      newStaff.append(item[0], (item as any)[1]);
    });

    mutateAsync(newStaff);
  };

  const handleFilePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleTriggerDialog = () => {
    fileInput.current?.click();
  };

  if (isLoading) {
    return (
      <div className="md:w-2/3 mx-auto h-44 border grid place-items-center bg-white mt-8">
        <Oval height={"15"} color="blue" />
      </div>
    );
  }

  return (
    <div className="">
      <BackButton className="text-lg mt-6" />

      <div className=" shadow-md rounded-2xl  md:w-2/3 mx-auto p-10 px-14 bg-white">
        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-center font-[600] font-inter text-2xl">
            Add Staff
          </h2>

          <div className="space-y-2">
            <h4 className="font-[400] text-sm">Upload Image</h4>

            {/* image holder  */}
            <div
              onClick={handleTriggerDialog}
              className="border rounded-xl grid place-items-center shadow-sm  cursor-pointer w-[150px] h-[150px]"
            >
              <Controller
                name="file"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <input
                    type="file"
                    {...field}
                    className="hidden"
                    ref={fileInput}
                    onChange={(e) => {
                      onChange(e.target.files);
                      handleFilePreview(e);
                    }}
                    accept="image/*"
                    id=""
                  />
                )}
              />

              {filePreview ? (
                <img src={filePreview} alt="" className="size-full" />
              ) : (
                <div className="flex flex-col items-center justify-center gap-1">
                  <img src="/assets/graphics/docUploadGrad.svg" alt="" />
                  <p className="text-xs">Click to upload </p>
                </div>
              )}
            </div>

            <p className="text-red-500">{errors.file?.message}</p>
          </div>

          <Input
            error={errors.name?.message}
            register={register}
            name="name"
            label="Name"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
          />

          <Input
            error={errors.email?.message}
            register={register}
            name="email"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
            label="Email"
          />

          <Input
            error={errors.jobTitle?.message}
            register={register}
            name="jobTitle"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
            label="Job title"
          />

          <>
            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <SelectInput
                  options={units}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                  }}
                  className=" rounded-xl text-sm "
                  label="Unit"
                  placeholder="Select a unit..."
                />
              )}
            />

            <span className="text-red-500">
              {/* @ts-ignore */}
              {errors.unit?.value?.message || errors.unit?.message}
            </span>
          </>

          {/* <SelectInput
            name="subUnit"
            className=" rounded-xl px-3 text-sm bg-[#E4E7E863]"
            inputClassName="bg-transparent px-0"
            label="Sub Unit"
          /> */}

          {/* authorization level */}
          <>
            <Controller
              name="auThorizationLevel"
              control={control}
              render={({ field }) => (
                <SelectInput
                  options={levels}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                  }}
                  className=" rounded-xl text-sm "
                  label="Authorization Level"
                  placeholder="Select authorization level"
                />
              )}
            />

            <span className="text-red-500">
              {/* @ts-ignore */}
              {errors.auThorizationLevel?.value?.message ||
                errors.auThorizationLevel?.message}
            </span>
          </>

          <Button
            disabled={isPending}
            className="w-full grid place-items-center"
          >
            {isPending ? (
              <Oval height={"15"} color="white" />
            ) : (
              <span>Create</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewStaff;
