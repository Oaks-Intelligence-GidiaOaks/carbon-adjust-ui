import { Button, Input } from "@/components/ui";
import CustomMapInput from "@/components/ui/customMapInput";
import ImagePreviewCard from "@/components/ui/ImagePreviewCard";
import { ITransport } from "@/interfaces/transport.interface";
import { validateTransportInputs } from "@/lib/utils";
import { addTransport, getSuggestions } from "@/services/homeOwner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";
import { Oval } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";

const NewTransport = () => {
  const navigate = useNavigate();

  const transportPhotoRef = useRef<HTMLInputElement | null>(null);
  const transportIdRef = useRef<HTMLInputElement | null>(null);
  const driversLicenseRef = useRef<HTMLInputElement | null>(null);

  const [transportPhotoPreview, setTransportPhotoPreview] = useState<
    string | null
  >(null);
  const [transportIdPreview, setTransportIdPreview] = useState<string | null>(
    null
  );
  const [driversLicensePreview, setDriversLicensePreview] = useState<
    string | null
  >(null);

  const initialState: ITransport = {
    transportPhoto: null,
    transportId: null,
    driversLicense: null,
    licensePlateNumber: "",
    address: "",
    city: "",
  };

  const [formData, setFormData] = useState<ITransport>(initialState);
  const debouncedAddress = useDebounce(formData.address, 500);
  const debouncedCity = useDebounce(formData.city, 500);

  const { pathname } = useLocation()
  const type = pathname.includes("/organisation") ? "organisation" : "dashboard";

  const CreateTransport = useMutation({
    mutationKey: ["create-transport"],
    mutationFn: (transportData: FormData) => addTransport(transportData),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
      resetForm();

      navigate(`/${type}/transport`);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  const { data: addressSuggestions } = useQuery({
    queryKey: ["suggestions", debouncedAddress],
    queryFn: () => getSuggestions(debouncedAddress),
    enabled: debouncedAddress.length >= 3,
    staleTime: 5 * 60 * 1000,
  });

  const { data: citySuggestions } = useQuery({
    queryKey: ["suggestions", debouncedCity],
    queryFn: () => getSuggestions(debouncedCity),
    enabled: debouncedCity.length >= 3,
    staleTime: 5 * 60 * 1000,
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (value: string | null) => void,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setFormData((prev: any) => ({
        ...prev,
        [fieldName]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
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

  const handleOptionClick = (
    type: "address" | "city",
    location: {
      address: {
        freeformAddress: string;
        municipality: string;
      };
    }
  ) => {
    if (type === "address") {
      setFormData((prev: ITransport) => ({
        ...prev,
        address: location.address.freeformAddress,
      }));
    } else {
      setFormData((prev: ITransport) => ({
        ...prev,
        city: location.address.municipality,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateTransportInputs(formData);

    if (error) {
      return toast.error(error);
    }

    const transportData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      transportData.append(key, value as Blob | string);
    });

    CreateTransport.mutate(transportData);
  };

  const resetForm = () => {
    setFormData(initialState);
    setTransportPhotoPreview(null);
    setTransportIdPreview(null);
    setDriversLicensePreview(null);
    if (transportPhotoRef.current) transportPhotoRef.current.value = "";
    if (transportIdRef.current) transportIdRef.current.value = "";
    if (driversLicenseRef.current) driversLicenseRef.current.value = "";
  };

  return (
    <div className="px-4 ">
      <div>
        <div className="border-b py-6 md:px-7 flex-center ">
          <Button
            variant={"ghost"}
            className="px-2"
            onClick={() => navigate(`/${type}/transport`)}
          >
            <MdKeyboardArrowLeft />
          </Button>

          <h2 className="text-[#495057] font-[700] text-center hidden md:block mx-auto w-fit text-2xl font-sans">
            Register Transport
          </h2>
        </div>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8 lg:w-3/4 xl:w-2/3 w-full mx-auto mt-10 text-sm">
          {/* Transport photo */}
          <div className="space-y-2">
            <h2 className="">
              Transport photo
              <span className="font-medium text-sm text-red-500">*</span>
            </h2>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(e, setTransportPhotoPreview, "transportPhoto")
              }
              ref={transportPhotoRef}
            />

            <div
              className="rounded-xl border grid place-items-center h-[180px] cursor-pointer"
              onClick={() => triggerFileInput(transportPhotoRef)}
            >
              {transportPhotoPreview ? (
                <ImagePreviewCard image={transportPhotoPreview} />
              ) : (
                <div className="w-fit h-fit grid place-items-center space-y-2">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#E4E7E863] grid place-items-center">
                    <img src="/assets/graphics/docUploadGrad.svg" alt="" />
                  </div>

                  <h2>Click to Upload your image</h2>
                  <h2>
                    <span className="text-[blue]">Browse</span> Support jpg,
                    png.
                  </h2>
                </div>
              )}
            </div>
          </div>

          {/* Transport ID */}
          <div className="space-y-2">
            <h2 className="">Transport ID</h2>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(e, setTransportIdPreview, "transportId")
              }
              ref={transportIdRef}
            />

            <div
              className="rounded-xl border grid place-items-center h-[180px] cursor-pointer"
              onClick={() => triggerFileInput(transportIdRef)}
            >
              {transportIdPreview ? (
                <ImagePreviewCard image={transportIdPreview} />
              ) : (
                <div className="w-fit h-fit grid place-items-center space-y-2">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#E4E7E863] grid place-items-center">
                    <img src="/assets/graphics/docUploadGrad.svg" alt="" />
                  </div>

                  <h2>Click to Upload your image</h2>
                  <h2>
                    <span className="text-[blue]">Browse</span> Support jpg,
                    png.
                  </h2>
                </div>
              )}
            </div>
          </div>

          {/* Drivers License */}
          <div className="space-y-2">
            <h2 className="">Drivers License</h2>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(e, setDriversLicensePreview, "driversLicense")
              }
              ref={driversLicenseRef}
            />

            <div
              className="rounded-xl border grid place-items-center h-[180px] cursor-pointer"
              onClick={() => triggerFileInput(driversLicenseRef)}
            >
              {driversLicensePreview ? (
                <ImagePreviewCard image={driversLicensePreview} />
              ) : (
                <div className="w-fit h-fit grid place-items-center space-y-2">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#E4E7E863] grid place-items-center">
                    <img src="/assets/graphics/docUploadGrad.svg" alt="" />
                  </div>

                  <h2>Click to Upload your image</h2>
                  <h2>
                    <span className="text-[blue]">Browse</span> Support jpg,
                    png.
                  </h2>
                </div>
              )}
            </div>
          </div>
          <div className="flex sm:flex-row flex-col justify-between w-full sm:items-center items-start  gap-5 mt-3 sm:mt-5">
            <div className="space-y-2 w-full">
              <h2 className="pl-2">
                Transport license plate number
                <span className="font-medium text-sm text-red-500">*</span>
              </h2>

              <Input
                className="border rounded-xl px-2 text-sm"
                type="text"
                name="licensePlateNumber"
                value={formData.licensePlateNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2 w-full">
            <h2 className="pl-5">
              Address{" "}
              <span className="font-medium text-sm text-red-500">*</span>
            </h2>
            <CustomMapInput
              inputName="address"
              value={formData.address}
              icon={<FaLocationDot size={20} color="#3465AF" />}
              onChange={handleInputChange}
              options={addressSuggestions}
              handleOptionClick={(location: any) => {
                handleOptionClick("address", location);
              }}
            />
          </div>

          <div className="space-y-2 w-full">
            <h2 className="pl-5">
              City <span className="font-medium text-sm text-red-500">*</span>
            </h2>

            <CustomMapInput
              inputName="city"
              value={formData.city}
              icon={<FaLocationCrosshairs size={20} color="#3465AF" />}
              onChange={handleInputChange}
              options={citySuggestions}
              handleOptionClick={(location: any) => {
                handleOptionClick("city", location);
              }}
            />

            {/* <Input
              className="border rounded-xl px-2 text-sm"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            /> */}
          </div>

          <div className="w-full mx-auto ">
            <Button disabled={false} className="w-full">
              {CreateTransport.isPending ? (
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

export default NewTransport;
