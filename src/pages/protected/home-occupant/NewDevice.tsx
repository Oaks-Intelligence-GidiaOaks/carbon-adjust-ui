import { Button, Input } from "@/components/ui";
import ImagePreviewCard from "@/components/ui/ImagePreviewCard";
import SelectInput from "@/components/ui/SelectInput";
import { IDevice } from "@/interfaces/device.interface";
import { createDevice } from "@/services/merchantService";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const NewDevice = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  let initialState: IDevice = {
    name: "",
    type: { label: "", value: "" },
    serialNumber: "",
    powerRating: "",
    voltageLevel: "",
    energySource: { label: "", value: "" },
    file: null,
  };

  const [formData, setFormData] = useState<IDevice>(initialState);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const CreateDevice = useMutation({
    mutationKey: ["create-ad"],
    mutationFn: (deviceData: any) => createDevice(deviceData),
    onSuccess: (sx: any) => {
      console.log(sx);
      toast.success(sx.message);
      resetForm();

      navigate(`/merchant/devices`);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setFormData((prev: any) => ({
        ...prev,
        file: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const deviceData = new FormData();

    Object.entries(formData).map((item) => {
      deviceData.append(item[0], item[1]);
    });

    // CreateDevice.mutate(deviceData);
  };

  const resetForm = () => {
    setFormData(initialState);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="px-4 ">
      <div>
        <div className="border-b py-6 md:px-7 flex-center ">
          <Button
            variant={"ghost"}
            className="px-2"
            onClick={() => navigate("/dashboard/devices")}
          >
            <MdKeyboardArrowLeft />
            <h2 className="pl-4 text-base font-[600]">Devices</h2>
          </Button>

          <h2 className="text-[#495057] font-[700] text-center hidden md:block mx-auto w-fit text-2xl font-sans">
            Register Device
          </h2>
        </div>
      </div>

      {/* device image upload */}
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8 lg:w-3/4 xl:w-2/3 mx-auto mt-10 text-sm">
          <div className="space-y-2">
            <h2 className="">Device photo</h2>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />

            <div
              className="rounded-xl border grid place-items-center h-[180px] cursor-pointer "
              onClick={triggerFileInput}
            >
              {imagePreview ? (
                <ImagePreviewCard image={imagePreview} />
              ) : (
                <div className="w-fit h-fit grid place-items-center space-y-2">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#E4E7E863] grid place-items-center">
                    <img src="/assets/graphics/docUploadGrad.svg" alt="" />
                  </div>

                  <h2>Click to Upload your image</h2>
                  <h2>Browse Support jpg, png.</h2>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 ">
            <h2 className="pl-2">Device name</h2>

            <Input
              className="border rounded-xl px-2 text-sm"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2 px-2">
            <h2 className="pl-2">Device type</h2>

            <SelectInput
              options={[{ label: "option 1", value: "Option 1" }]}
              value={formData.type}
              // onChange={(e)=> handleInputChange()}
            />
          </div>

          <div className="space-y-2 ">
            <h2 className="pl-2">Serial number</h2>

            <Input
              className="border rounded-xl px-2 text-sm"
              type="number"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2 ">
            <h2 className="pl-2">Power rating (W)</h2>

            <Input
              className="border rounded-xl px-2 text-sm"
              type="number"
              name="powerRating"
              value={formData.powerRating}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2 ">
            <h2 className="pl-2">Voltage level (V)</h2>

            <Input
              className="border rounded-xl px-2 text-sm"
              type="number"
              name="voltageLevel"
              value={formData.voltageLevel}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2 px-2">
            <h2 className="pl-2">What is/are your energy source(s)?</h2>

            <SelectInput
              options={[{ label: "option 1", value: "Option 1" }]}
              value={formData.energySource}
              // onChange={(e)=> handleInputChange()}
            />
          </div>

          <div className="w-full mx-auto ">
            <Button disabled={false} className="w-full">
              {CreateDevice.isPending ? (
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
        </div>
      </form>
    </div>
  );
};

export default NewDevice;