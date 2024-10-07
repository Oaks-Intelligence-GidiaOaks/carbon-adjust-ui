import { Dispatch, SetStateAction, useState } from "react";
import { Button, Input } from "../ui";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFacilitator, inviteMerchant } from "@/services/merchant";
import { Oval } from "react-loader-spinner";

type inviteType = "merchant" | "facilitator";

const SendInvite = (props: {
  type: inviteType;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const InviteMerchantMutation = useMutation({
    mutationKey: ["invite-grant-merchant"],
    mutationFn: (mcInput: { name: string; email: string }) =>
      inviteMerchant(mcInput),

    onSuccess: (sx) => {
      toast.success(sx.message);
      props.setShowModal(false);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-merchants"] });
    },
  });

  const CreateFacilitatorMutation = useMutation({
    mutationKey: ["create-facilitator"],
    mutationFn: (mcInput: { name: string; email: string }) =>
      createFacilitator(mcInput),

    onSuccess: (sx) => {
      toast.success(sx.message);
      props.setShowModal(false);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-facilitators"] });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const isEmpty = Object.values(formData).filter((it) => !it.length)?.length;

    if (isEmpty) {
      toast.error("Input fields are required");
      return;
    }

    props.type === "merchant"
      ? InviteMerchantMutation.mutate(formData)
      : CreateFacilitatorMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col gap-3 pt-3">
      <Input
        name="name"
        label="Name of Company/Entity"
        labelClassName="pb-[10px] text-sm"
        value={formData.name}
        onChange={handleInputChange}
        inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
        placeholder={`Enter name`}
      />

      <Input
        name="email"
        onChange={handleInputChange}
        label="Merchant Email Address"
        labelClassName="pb-[10px] text-sm"
        value={formData.email}
        inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
        placeholder={`Enter merchant email address`}
      />

      <div className="ml-auto flex-center gap-2 mt-2">
        <Button variant={"outline"}>Cancel</Button>
        <Button
          disabled={
            InviteMerchantMutation.isPending ||
            CreateFacilitatorMutation.isPending
          }
          onClick={handleSubmit}
        >
          {InviteMerchantMutation.isPending ||
          CreateFacilitatorMutation.isPending ? (
            <Oval
              visible={true}
              height="20"
              width="20"
              color="#ffffff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <span>Invite</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SendInvite;
