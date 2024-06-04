// type Props = {};

import axiosInstance from "@/api/axiosInstance";
import {
  Button,
  CountryRegionDropdown,
  Dropdown,
  Input,
} from "@/components/ui";
import RadioGroupComponent from "@/components/ui/RadioGroup";
import { Country, ICountry, State } from "country-state-city";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
// import { addSpecializationService } from "@/services/hiaService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { cn, convertImageToDataURL } from "@/utils";
import Select, { MultiValue } from "react-select";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const AddPackage = () => {
  const navigate = useNavigate();
  let countryData = Country.getAllCountries();
  const { user } = useSelector((state: RootState) => state.user);

  const country = Country.getAllCountries().filter(
    (c: ICountry) => c.name === user?.address.country
  )[0];

  const addPackage = useMutation({
    mutationKey: ["add-package"],
    mutationFn: (data: any) =>
      axiosInstance.post(`/packages`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      toast.success("Package added successfully");

      navigate("/hia/packages");
    },
    onError: () => {
      toast.error("Error adding package");
    },
  });

  const addRegionalPackage = useMutation({
    mutationKey: ["add-package"],
    mutationFn: (data: any) =>
      axiosInstance.post(`/packages`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      toast.success("Package added successfully");

      navigate("/hia/packages");
    },
    onError: () => {
      toast.error("Error adding package");
    },
  });

  const [packageState, setPackageState] = useState({
    name: "",
    subcontractors: {
      label: "",
      value: "",
    },
    country: {
      label: "",
      value: "",
    },
    locationType: "",
    serviceId: "",
    serviceName: "",
    service: {
      label: "",
      value: "",
    },
    file: null as File | null,
    imageDataUrl: "",
    packageVisibility: "",
    regions: [] as MultiValue<any>,
  });

  let inputClassName = ` bg-[#E4E7E863] bg-opacity-30 text-xs !text-[#9C9C9C] !font-[400] `;
  let labelStyle = `!font-[400] !text-sm !leading-[23.97px] !text-[#333333] !mb-[10px]`;

  // let staffLevels = [
  //   {
  //     label: "level 1",
  //     value: "level 1",
  //   },
  //   {
  //     label: "level 2",
  //     value: "level 2",
  //   },
  //   {
  //     label: "level 3",
  //     value: "level 3",
  //   },
  // ];

  const specializations = useQuery({
    queryKey: ["get-specializations"],
    queryFn: () => axiosInstance.get(`/specializations/hia`),
  });

  const subcontractors = useQuery({
    queryKey: ["get-subcontractors"],
    queryFn: () => axiosInstance.get(`/users/hia/subcontractors/approved`),
  });

  console.log(subcontractors.data?.data.data);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(packageState);
    const formData = new FormData();
    formData.append("name", packageState.name);
    formData.append("service", packageState.serviceId);
    formData.append(
      "subcontractors",
      JSON.stringify([packageState.subcontractors.value])
    );
    formData.append("country", packageState.country.label);
    formData.append("locationType", packageState.packageVisibility);
    if (packageState.file === null) {
      return toast.error("Please select image for your package");
    }
    if (packageState.file) {
      formData.append("file", packageState.file);
    }

    if (packageState.packageVisibility.toLowerCase() === "regional") {
      alert(packageState.packageVisibility);
      formData.append(
        "regions",
        JSON.stringify(packageState.regions.map((region) => region.label))
      );
      console.log(formData);
      return addRegionalPackage.mutate(formData);
    }

    addPackage.mutate(formData);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      return; // No file selected
    }

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      e.target.files = null; // Reset file input
      return;
    }

    // Check if the file size exceeds 2MB
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Please select an image file smaller than 2MB.");
      e.target.files = null; // Reset file input
      return;
    }
    if (file) {
      const imageDataUrl = await convertImageToDataURL(file);
      setPackageState((prev) => ({
        ...prev,
        file: file,
        imageDataUrl: imageDataUrl as string, // Ensure you have imageDataUrl in your state
      }));
    } else {
      setPackageState((prev) => ({
        ...prev,
        file: null,
        imageDataUrl: "/assets/icons/img-icon.svg",
      }));
    }
  };

  return (
    <div className="font-poppins">
      <h2 className="page-header"> Create package</h2>

      <form
        action=" "
        onSubmit={handleSubmit}
        className=" md:w-1/2 mx-auto space-y-4 mb-80 mt-10"
      >
        {/* avatar */}
        <div>
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          {/* <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            onChange={(e) =>
              setPackageState((prev) => ({
                ...prev,
                file: e.target?.files !== null ? e.target?.files[0] : null,
              }))
            }
          /> */}
          <span className="text-xs mb-3">Click to insert logo</span>
          <label
            htmlFor="image"
            className="h-[100px] w-[100px] relative rounded-full border bg-[#F2F2F2] grid place-items-center"
          >
            <img
              src={
                packageState.file
                  ? packageState.imageDataUrl
                  : "/assets/icons/img-icon.svg"
              }
              alt="icon"
              className={cn(
                packageState.imageDataUrl &&
                  "h-[100px] w-[100px] object-cover rounded-full"
              )}
            />
            <img
              src="/assets/icons/pen-icon.svg"
              alt="icon"
              className="absolute bottom-0 -right-1"
            />
          </label>
        </div>

        {/* <Dropdown
          labelClassName={labelStyle}
          placeholder={`Select institution name`}
          label="Institution name"
          name=""
          options={staffLevels}
          wrapperClassName={inputClassName + ` w-full`}
          optionClassName={``}
        /> */}
        <Input
          name="name"
          label="Package name"
          inputClassName={inputClassName}
          labelClassName={labelStyle}
          placeholder="Enter package name"
          value={packageState.name}
          onChange={(e) =>
            setPackageState((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />

        <Dropdown
          name="Service"
          labelClassName={labelStyle}
          options={
            specializations.isSuccess &&
            specializations.data?.data.data.length > 0
              ? specializations.data?.data.data.map((agg: any) => ({
                  label: agg.name,
                  value: agg._id,
                }))
              : []
          }
          label="Service"
          wrapperClassName="bg-gray-100 w-full font-poppins"
          placeholder="Select aggregator name"
          isLoading={specializations.isLoading}
          loadingText="Searching for aggregators"
          value={packageState!.service}
          onOptionChange={(value) =>
            setPackageState!((prev) => ({
              ...prev,
              service: value,
              serviceName: value,
              serviceId: value.value,
            }))
          }
        />

        <Dropdown
          name="Subcontractor"
          labelClassName={labelStyle}
          options={
            subcontractors.isSuccess &&
            subcontractors.data?.data.data.contractors.length > 0
              ? subcontractors.data?.data.data.contractors.map((agg: any) => ({
                  label: agg.name,
                  value: agg._id,
                }))
              : []
          }
          label="Subcontractor"
          wrapperClassName="bg-gray-100 w-full font-poppins"
          placeholder="Select contractor"
          isLoading={specializations.isLoading}
          loadingText="Searching for contractors"
          value={packageState!.subcontractors}
          onOptionChange={(value) =>
            setPackageState((prev) => ({
              ...prev,
              subcontractors: value,
            }))
          }
        />

        <CountryRegionDropdown
          name="country"
          labelClassName={labelStyle}
          options={countryData.map((country) => ({
            label: country.name,
            value: country.isoCode,
            prefixIcon: country.flag,
          }))}
          searchable={true}
          label="Location"
          wrapperClassName="bg-gray-100 w-full font-poppins"
          placeholder="Select country"
          value={packageState.country}
          countryChange={(value) => {
            setPackageState((prev) => ({
              ...prev,
              country: value,
            }));
          }}
        />

        <p className={labelStyle}>Package Visibility</p>
        <RadioGroupComponent
          size="size-5"
          value={packageState.packageVisibility}
          setValue={(value: string) =>
            setPackageState((prev) => ({
              ...prev,
              packageVisibility: value,
            }))
          }
          options={["National", "Regional"]}
        />

        {packageState.packageVisibility === "Regional" && (
          <Select
            isMulti
            name="colors"
            options={State.getStatesOfCountry(country.isoCode).map((state) => ({
              label: state.name,
              value: state.isoCode,
            }))}
            className="basic-multi-select"
            classNamePrefix="select"
            value={packageState.regions}
            // isDisabled={formData.regions.length >= 5}
            onChange={(value) => {
              if (value.length > 5) return;
              setPackageState((prev) => ({
                ...prev,
                regions: value,
              }));
            }}
          />
        )}

        <Button
          disabled={addPackage.isPending || addRegionalPackage.isPending}
          className="rounded-lg text-white mt-10 w-full h-11 translate-y-6"
        >
          {addPackage.isPending || addRegionalPackage.isPending ? (
            <Oval
              visible={addPackage.isPending || addRegionalPackage.isPending}
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
      </form>
    </div>
  );
};

export default AddPackage;
