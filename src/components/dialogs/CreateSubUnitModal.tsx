import React, { Dispatch, SetStateAction, useRef } from "react";
import Modal from "./Modal";
import { Button, Input } from "../ui";
import { ICreateSubUnit } from "@/interfaces/organisation.interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchemas } from "@/schemas/forms";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import useMutations from "@/hooks/useMutations";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";

interface Props extends Pick<ICreateSubUnit, "parentUnitId"> {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
}

const CreateSubUnitModal: React.FC<Props> = ({
  parentUnitId,
  setShowModal,
  showModal,
}) => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLDivElement | null>(null);

  const { AddSubUnit } = useMutations();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchemas().CreateSubUnit),
    defaultValues: {
      parentUnitId,
    },
  });

  //   @ts-ignore
  const onSubmit = (data: any) => {
    // mutate async

    AddSubUnit.mutateAsync(data, {
      onSuccess: (sx: any) => {
        toast.success(sx.message || `Sub unit created successfully`);
        queryClient.invalidateQueries({ queryKey: ["get-admin-units"] });
        setShowModal(false);
      },
      onError: (ex: any) => {
        toast.success(ex.response.data.message || `Error creating sub unit`);
      },
    });
  };

  useOutsideCloser(ref, showModal, setShowModal);

  return (
    <Modal>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 font-kumbh">
        <div
          ref={ref}
          className="bg-white rounded-lg shadow-lg w-full mx-5 max-w-md p-8 animate-bounceIn"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Sub-Unit
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Enter Sub-Main name"
              name="name"
              className="border rounded-xl px-2 text-sm bg-[#E4E7E8]"
              inputClassName="bg-transparent px-0"
              register={register}
              error={errors.name?.message}
            />

            <Input
              label="Sub-Main function"
              name="description"
              register={register}
              className="border rounded-xl px-2 text-sm bg-[#E4E7E8]"
              inputClassName="bg-transparent px-0"
              error={errors.description?.message}
            />

            {/* Submit Button */}
            <Button
              disabled={AddSubUnit.isPending}
              className="w-full grid place-items-center"
            >
              {AddSubUnit.isPending ? (
                <Oval height={"15"} color="white" />
              ) : (
                <span className="">Create</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateSubUnitModal;
