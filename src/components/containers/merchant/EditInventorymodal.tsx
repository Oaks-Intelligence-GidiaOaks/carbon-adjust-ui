import Modal from "@/components/dialogs/Modal";
import { Button, Input } from "@/components/ui";
import SelectInput from "@/components/ui/SelectInput";
import TextArea from "@/components/ui/TextArea";
import { UProductForm } from "@/interfaces/sales.interface";
import { updateInventory } from "@/services/merchant";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

type EditInventoryModalProps = {
  setShowModal: (value: boolean) => void;
  data: any;
};

const EditInventoryModal = ({
  setShowModal,
  data,
}: EditInventoryModalProps) => {
  const initialState: UProductForm = {
    title: data?.title,
    comment: "",
    action: { label: "", value: "" },
    quantity: data.quantity,
    price: data?.price,
  };

  const [formData, setFormData] = useState<UProductForm>(initialState);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const UpdateProduct = useMutation({
    mutationKey: ["create package"],
    mutationFn: (productData: any) => updateInventory(data._id, productData),
    onSuccess: () => {
      toast.success("Inventory Updated successfully");
      resetForm();
      setShowModal(false);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const Payload = {
      title: formData.title,
      comment: formData.comment,
      // @ts-ignore
      action: formData.action.value,
      quantity: Number(formData.quantity),
      price: formData.price,
    };

    UpdateProduct.mutate(Payload);
  };

  const resetForm = () => {
    setFormData(initialState);
  };
  return (
    <>
      <Modal>
        <div className="w-[90%] sm:w-[40%] bg-white rounded-lg px-5 py-10 overflow-y-scroll">
          <div className="sticky top-0 flex justify-end  p-5">
            <button
              className="text-gray-500 text-2xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
          <div className="flex  flex-col justify-start p-2">
            <h2 className="text-2xl font-medium text-[#495057] capitalize mb-5 font-poppins">
              {data.title}
            </h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="space-y-2 w-full mt-2">
                <h2 className="pl-2 text-[#575757] text-sm">Product Name</h2>

                <Input
                  name="title"
                  inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Enter product name"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="space-y-2 w-full mt-5">
                  <h2 className="pl-2 text-[#575757] text-sm">Quantity</h2>

                  <Input
                    name="quantity"
                    inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                    placeholder="Input quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2 w-full mt-5">
                  <h2 className="pl-2 text-[#575757] text-sm">Action</h2>
                  <SelectInput
                    options={[
                      { label: "Increase", value: "increase" },
                      { label: "Decrease", value: "decrease" },
                    ]}
                    className=""
                    onChange={(val) =>
                      setFormData((prev) => ({
                        ...prev,
                        action: val && val,
                      }))
                    }
                    value={formData.action}
                    placeholder="Select action"
                  />
                </div>
              </div>

              <div className="space-y-2 w-full mt-5">
                <h2 className="pl-2 text-[#575757] text-sm">Comment</h2>
                <TextArea
                  rows={4}
                  name="comment"
                  value={formData.comment}
                  labelClassName="pb-[10px]"
                  inputClassName="border p-3 bg-[#E4E7E8] resize-none h-[100px] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Write a brief comment on this update"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 w-full mt-5">
                <h2 className="pl-2 text-[#575757] text-sm">Price</h2>

                <Input
                  name="price"
                  value={formData.price}
                  inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Enter Price"
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full flex mt-5 ">
                <Button disabled={false} className="w-[80%] mx-auto">
                  {UpdateProduct.isPending ? (
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
                    <span>Update Product</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditInventoryModal;
