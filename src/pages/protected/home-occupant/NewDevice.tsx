import { Button, Input } from "@/components/ui";
import ImagePreviewCard from "@/components/ui/ImagePreviewCard";
import SelectInput from "@/components/ui/SelectInput";
import {
  earningMethodOptions,
  electricitySuppliers,
  energySources,
  gasSuppliers,
  types,
} from "@/constants/devices";
import { ICreateDevice, IDevice } from "@/interfaces/device.interface";
import { validateDeviceInputs } from "@/lib/utils";
import { addDevice } from "@/services/homeOwner";
import { SelectItem } from "@/types/formSelect";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";

const NewDevice = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { pathname } = useLocation();
  const type = pathname.includes("/organisation")
    ? "organisation"
    : "dashboard";

  let initialState: IDevice = {
    name: "",
    type: { label: "", value: "" },
    serialNos: "",
    powerRating: "",
    voltageLevel: "",
    energySource: { label: "", value: "" },
    electricityProvider: { label: "", value: "" },
    gasProvider: { label: "", value: "" },
    file: null,
    earningMethod: { label: "", value: "" },
  };

  const [formData, setFormData] = useState<IDevice>(initialState);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const CreateDevice = useMutation({
    mutationKey: ["create-device"],
    mutationFn: (deviceData: FormData) => addDevice(deviceData),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
      resetForm();

      navigate(`/${type}/devices`);
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

    const regex = /^[a-zA-Z0-9\s]*$/;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "number") {
      const sanitisedValue = value.replace(/[+-]/g, "");

      setFormData((prev) => ({
        ...prev,
        [name]: sanitisedValue,
      }));
    } else if (type === "text") {
      if (regex.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const handleSelectInputChange = (e: any, fieldName: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: e,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validate required inputs
    const error = validateDeviceInputs(formData);

    if (error) {
      return toast.error(error);
    }

    const { gasProvider, ...rest } = formData;

    let nData: Partial<ICreateDevice> = {
      ...rest,
      type: (formData.type as SelectItem).value,
      energySource: (formData.energySource as SelectItem).value,
      electricityProvider: (formData.electricityProvider as SelectItem).value,
      earningMethod: (formData.earningMethod as SelectItem).value,
    };

    if (nData.energySource === "Electricity/Gas") {
      nData["gasProvider"] = (gasProvider as SelectItem).value;
    }

    const deviceData = new FormData();

    Object.entries(nData).map((item) => {
      deviceData.append(item[0], (item as any)[1]);
    });

    CreateDevice.mutate(deviceData);
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
            onClick={() => navigate(`/${type}/devices`)}
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
        <div className="flex flex-col gap-8 lg:w-3/4 xl:w-2/3 w-full mx-auto mt-10 text-sm">
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
              className="rounded-xl border grid place-items-center h-[180px] cursor-pointer"
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

          <Input
            label="Device name"
            className="border rounded-xl px-2 text-sm bg-[#E4E7E8]"
            inputClassName="bg-transparent px-0"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <SelectInput
            label="Device type"
            options={types}
            value={formData.type}
            onChange={(e) => handleSelectInputChange(e, "type")}
          />

          <Input
            label="Serial number"
            inputClassName="bg-transparent px-0 "
            className="border rounded-xl px-3 text-sm bg-[#E4E7E8]"
            name="serialNos"
            value={formData.serialNos}
            onChange={handleInputChange}
          />

          <Input
            label="Power rating (W)"
            inputClassName="bg-transparent px-0"
            className="border rounded-xl px-3 text-sm bg-[#E4E7E8]"
            type="number"
            name="powerRating"
            value={formData.powerRating}
            onChange={handleInputChange}
          />

          <Input
            label="Voltage level (V)"
            className="border rounded-xl px-3 text-sm bg-[#E4E7E8]"
            inputClassName="bg-transparent px-0"
            type="number"
            name="voltageLevel"
            value={formData.voltageLevel}
            onChange={handleInputChange}
          />

          <SelectInput
            label="What is/are your energy source(s)?"
            options={energySources}
            value={formData.energySource}
            onChange={(e) => handleSelectInputChange(e, "energySource")}
          />

          {Boolean((formData.energySource as SelectItem).value.length) && (
            <SelectInput
              label="Who is your electricity supplier?"
              options={electricitySuppliers}
              value={formData.electricityProvider}
              onChange={(e) =>
                handleSelectInputChange(e, "electricityProvider")
              }
            />
          )}

          {(formData.energySource as SelectItem).value ===
            "Electricity/Gas" && (
            <SelectInput
              label="Who is your gas provider?"
              options={gasSuppliers}
              value={formData.gasProvider}
              onChange={(e) => handleSelectInputChange(e, "gasProvider")}
            />
          )}

          <SelectInput
            label="Earning Method"
            options={earningMethodOptions}
            value={formData.earningMethod}
            onChange={(e) => handleSelectInputChange(e, "earningMethod")}
          />

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
      </form>
    </div>
  );
};

export default NewDevice;
