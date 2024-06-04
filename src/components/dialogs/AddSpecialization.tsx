import { Button, Dropdown } from "../ui";
import * as Dialog from "@radix-ui/react-dialog";
import { GrClose } from "react-icons/gr";
import { FormEvent, useState } from "react";
import { retrofittingServices } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { addSpecializationService } from "@/services/hiaService";

type Props = {
  setShowAddSpecializationDialog: (value: boolean) => void;
};

const AddSpecializationDialog = ({ setShowAddSpecializationDialog }: Props) => {
  const queryClient = useQueryClient();
  const [specialization, setSpecialization] = useState({
    label: "",
    value: "",
  });

  const addSpecialization = useMutation({
    mutationKey: ["add-specialization"],
    mutationFn: () => addSpecializationService(specialization.value),
    onSuccess: () => {
      toast.success("Specialization added successfully");
      queryClient.invalidateQueries({ queryKey: ["get-hia-specializations"] });

      setShowAddSpecializationDialog(false);
    },
    onError: () => {
      toast.error("Error adding specialization");
      setShowAddSpecializationDialog(false);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addSpecialization.mutate();
  };

  return (
    <div className="w-screen max-w-[806px] bg-white h-fit rounded-md pt-6 mt-[10vh] relative">
      <div className="max-w-[630px] w-full mx-auto px-2 sm:px-6 relative">
        <div className="mx-auto pb-[10vh]">
          <p className="font-semibold text-blue-main text-lg text-center font-poppins">
            SELECT SPECIALIZATION
          </p>
          <form onSubmit={handleSubmit} className="mt-10 mx-auto">
            <div className="mt-6">
              <Dropdown
                name="AggregatorType"
                labelClassName="mb-4 text-[#000000_!important] font-poppins"
                options={retrofittingServices}
                label="Select type"
                wrapperClassName="bg-gray-100 w-full font-poppins"
                placeholder="Select aggregator type"
                value={specialization}
                optionClassName="font-poppins"
                onOptionChange={(value) => setSpecialization!(value)}
              />
            </div>

            <div className="mt-10">
              <Button
                disabled={addSpecialization.isPending || !specialization.value}
                className="rounded-lg text-white mt-4 w-full h-11"
              >
                {addSpecialization.isPending ? (
                  <Oval
                    visible={addSpecialization.isPending}
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <span>Next</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Dialog.Close asChild>
        <button
          className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-7 right-6 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          <GrClose />
        </button>
      </Dialog.Close>
    </div>
  );
};

export default AddSpecializationDialog;
