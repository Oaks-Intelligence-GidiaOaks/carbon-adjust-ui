//@ts-nocheck
import Modal from "@/components/dialogs/Modal";
import { Button, Input } from "@/components/ui";
import MediaPreviewCard from "@/components/ui/MediaPreviewCard";
import SelectInput from "@/components/ui/SelectInput";
import TextArea from "@/components/ui/TextArea";
import { ProductForm } from "@/interfaces/sales.interface";
import { createPackageQuery, getPackageCategories } from "@/services/merchant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import Select, { MultiValue } from "react-select";

type AddInventoryModalProps = {
  setShowModal: (value: boolean) => void;
};

type MediaPreview = {
  url: string;
  type: string;
} | null;

const AddInventoryModal = ({ setShowModal }: AddInventoryModalProps) => {
  const transportPhotoRef = useRef<HTMLInputElement | null>(null);
  const [productPreview, setProductPreview] = useState<MediaPreview>(null);

  const initialState: ProductForm = {
    productPhoto: null,
    title: "",
    description: "",
    category: { label: "", value: "" },
    packageType: { label: "", value: "" },
    quantity: "",
    askPurchaserQuote: false,
    colors: [],
    price: "",
  };

  const [formData, setFormData] = useState<ProductForm>(initialState);

  const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const getCategories = useQuery<
    { data: { categories: { name: string; _id: string }[] } },
    Error
  >({
    queryKey: ["get categories"],
    queryFn: getPackageCategories,
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (preview: MediaPreview) => void,
    fieldName: keyof ProductForm
  ) => {
    const file = e.target.files?.[0];

    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ url: reader.result as string, type: file.type });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleColorsChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    setFormData((prev) => ({
      ...prev,
      colors: selectedOptions.map((opt) => opt.value),
    }));
  };

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

  const colourOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "purple", label: "Purple" },
    { value: "orange", label: "Orange" },
  ];

  const CreateProduct = useMutation({
    mutationKey: ["create package"],
    mutationFn: (
      data: Omit<ProductForm, "category" | "packageType"> & {
        category: string;
        packageType: string;
      }
    ) => createPackageQuery(data),
    onSuccess: () => {
      toast.success("Inventory created successfully");
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
      productPhoto: formData.productPhoto,
      title: formData.title,
      description: formData.description,
      category: formData.category.value,
      packageType: formData.packageType.value,
      quantity: formData.quantity,
      askPurchaserQuote: formData.askPurchaserQuote,
      colors: formData.colors,
      price: formData.price,
    };

    CreateProduct.mutate(Payload);
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return (
    <>
      <Modal>
        <div className="w-[90%] sm:w-[50%] bg-white h-[90%] rounded-lg p-5 overflow-y-scroll">
          <div className="sticky top-0 flex justify-end  p-5">
            <button
              className="text-gray-500 text-2xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
          <div className="flex  flex-col justify-start p-2">
            <form action="" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <h2 className=" text-[#575757]">product Attachment</h2>

                <input
                  type="file"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={(e) =>
                    handleFileChange(e, setProductPreview, "productPhoto")
                  }
                  ref={transportPhotoRef}
                />

                <div
                  className="rounded-xl border grid place-items-center h-[180px] cursor-pointer"
                  onClick={() => triggerFileInput(transportPhotoRef)}
                >
                  {productPreview ? (
                    <MediaPreviewCard
                      preview={productPreview.url}
                      fileType={productPreview.type}
                    />
                  ) : (
                    <div className="w-fit h-fit grid place-items-center space-y-2">
                      <div className="w-[40px] h-[40px] rounded-full bg-[#E4E7E863] grid place-items-center">
                        <img src="/assets/graphics/uploadIcon.svg" alt="" />
                      </div>

                      <h2>Click to Upload your image or video</h2>
                      <p className="text-sm text-gray-500">or drag and drop</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 w-full mt-5">
                <h2 className="pl-2 text-[#575757] text-sm">Product Name</h2>

                <Input
                  name="title"
                  inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Enter product name"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2 w-full mt-5">
                <h2 className="pl-2 text-[#575757] text-sm">
                  Product Description
                </h2>
                <TextArea
                  rows={4}
                  name="description"
                  value={formData.description}
                  labelClassName="pb-[10px]"
                  inputClassName="border p-3 bg-[#E4E7E8] resize-none h-[100px] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Write a brief Description of the product"
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2 w-full mt-5">
                <h2 className="pl-2 text-[#575757] text-sm">Category</h2>
                <SelectInput
                  options={
                    Boolean(getCategories.data?.data.data.categories.length)
                      ? getCategories.data?.data.data.categories.map(
                          (cat: { name: string; _id: string }) => ({
                            label: cat.name,
                            value: cat._id,
                          })
                        )
                      : []
                  }
                  className="border border-none"
                  value={formData.category}
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: val && val,
                    }))
                  }
                  placeholder="Select Category"
                />
              </div>

              <div className="space-y-2 w-full mt-5">
                <h2 className="pl-2 text-[#575757] text-sm">
                  Services/Products
                </h2>
                <SelectInput
                  options={[
                    { label: "Service", value: "Service" },
                    { label: "Product", value: "Product" },
                  ]}
                  className=""
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      packageType: val && val,
                    }))
                  }
                  value={formData.packageType}
                  placeholder="Select specific service"
                />
              </div>

              <div className="space-y-2 w-full mt-5">
                <h2 className="pl-2 text-[#575757] text-sm">Quantity</h2>

                <Input
                  name="quantity"
                  inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Input quantity"
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 w-full mt-5">
                <h2 className="pl-2 text-[#575757] text-sm">Colors</h2>
                <Select
                  isMulti
                  name="colors"
                  options={colourOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleColorsChange}
                />
              </div>

              <div className="flex-center gap-[11px] mt-5 ml-2">
                <input
                  type="checkbox"
                  name="askPurchaserQuote"
                  id=""
                  checked={formData.askPurchaserQuote}
                  onChange={handleInputChange}
                  className="border accent-ca-blue border-[#575757] h-[19px] w-[19px]"
                />

                <p className="text-[#575757] text-sm">
                  Purchasers should ask for a quote
                </p>
              </div>

              <div className="space-y-2 w-full mt-5">
                <h2 className="pl-2 text-[#575757] text-sm">Price</h2>

                <Input
                  name="price"
                  inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Enter Price"
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full flex mt-5 ">
                <Button disabled={false} className="w-[80%] mx-auto">
                  {CreateProduct.isPending ? (
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
                    <span>Create</span>
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

export default AddInventoryModal;
