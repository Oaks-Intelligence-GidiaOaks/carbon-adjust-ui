// type Props = {};

import axiosInstance from "@/api/axiosInstance";
import { RootState } from "@/app/store";
import {
  Button,
  CountryRegionDropdown,
  // CountryRegionDropdown,
  // Dropdown,
  Input,
} from "@/components/ui";
import { currencies } from "@/constants";
// import RadioGroupComponent from "@/components/ui/RadioGroup";
// import { maximumRepaymentOptions } from "@/constants";
import { cn, convertImageToDataURL } from "@/utils";
import { useMutation } from "@tanstack/react-query";
// import { Country, ICountry, State } from "country-state-city";
import { useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { MultiValue } from "react-select";

const AddPackage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  // const country = Country.getAllCountries().filter(
  //   (c: ICountry) => c.name === user?.address.country
  // )[0];

  let inputClassName = ` bg-[#E4E7E863] bg-opacity-30 text-xs text-black-main !font-[400]`;
  let labelStyle = `!fonty-[400] !text-sm !leading-[23.97px] !text-[#333333] !mb-[10px]`;

  const addPackage = useMutation({
    mutationKey: ["add-finance-package"],
    mutationFn: (data: any) =>
      axiosInstance.post(`/packages/insurance`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      toast.success("Package added successfully");

      navigate("/insurance/packages");
    },
    onError: () => {
      toast.error("Error adding package");
    },
  });

  const [formData, setFormData] = useState({
    institutionName: user?.name,
    packageName: "",
    maximumAmount: "",
    percentageOfInsurance: "",
    // annualPercentageRate: "",
    // interestRateType: "",
    // maxRepaymentPeriod: {
    //   label: "",
    //   value: "",
    // },
    // country: {
    //   label: "",
    //   value: "",
    // },
    currency: {
      label: "",
      value: "",
    },
    // packageVisibility: "",
    // regions: [] as MultiValue<any>,
    file: null as File | null,
    imageDataUrl: "",
  });

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
      setFormData((prev) => ({
        ...prev,
        file: file,
        imageDataUrl: imageDataUrl as string, // Ensure you have imageDataUrl in your state
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        file: null,
        imageDataUrl: "/assets/icons/img-icon.svg",
      }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    const formDataPayload = new FormData();
    formDataPayload.append("name", formData.packageName);
    formDataPayload.append("currency", formData.currency.value);
    formDataPayload.append("maxInsuranceAmount", formData.maximumAmount);
    formDataPayload.append("insurancePercent", formData.percentageOfInsurance);
    // formDataPayload.append(
    //   "maxRepaymentPeriod",
    //   formData.maxRepaymentPeriod.value
    // );
    // formDataPayload.append(
    //   "interestRateType",
    //   formData.interestRateType.toLowerCase()
    // );
    // formDataPayload.append("country", formData.country.label);
    // formDataPayload.append("locationType", formData.packageVisibility);
    if (formData.file === null) {
      return toast.error("Please select image for your package");
    }
    if (formData.file) {
      formDataPayload.append("file", formData.file);
    }

    console.log(formData);

    addPackage.mutate(formDataPayload);
  };

  function isValidDataObject(data: any): boolean {
    const entries = Object.entries(data);

    for (const [key, value] of entries) {
      if (key === "regions") continue;
      if (value === null || value === undefined) return false;

      if (typeof value === "object") {
        if ("label" in value && value.label === "") return false;
        if ("value" in value && value.value === "") return false;
      } else if (value === "") {
        return false;
      }
    }

    return true;
  }

  return (
    <div className="font-poppins pb-96">
      <h2 className="page-header"> Create package</h2>

      <form
        action=" "
        onSubmit={handleSubmit}
        className="md:w-1/2 mx-auto space-y-8"
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
          <span className="text-xs mb-3">Click to insert logo</span>
          <label
            htmlFor="image"
            className="h-[100px] w-[100px] relative rounded-full border bg-[#F2F2F2] grid place-items-center"
          >
            <div className="h-[100px] w-[100px] overflow-hidden rounded-full flex justify-center items-center">
              <img
                src={
                  formData.file
                    ? formData.imageDataUrl
                    : "/assets/icons/img-icon.svg"
                }
                alt="icon"
                className={cn(
                  formData.imageDataUrl && "w-full h-full object-cover"
                )}
              />
            </div>

            <img
              src="/assets/icons/pen-icon.svg"
              alt="icon"
              className="absolute bottom-0 -right-1"
            />
          </label>
        </div>

        <Input
          name="institution-name"
          label="Institution name"
          readOnly
          inputClassName={inputClassName}
          labelClassName={labelStyle}
          placeholder="Enter package name"
          value={formData.institutionName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              institutionName: e.target.value,
            }))
          }
        />

        <Input
          name="package name"
          label="Package name *"
          inputClassName={inputClassName}
          labelClassName={labelStyle}
          placeholder="Enter package name"
          value={formData.packageName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              packageName: e.target.value,
            }))
          }
        />

        <CountryRegionDropdown
          name="currency"
          labelClassName={labelStyle}
          options={currencies.map((currency) => ({
            label: currency.label + ` (${currency.value})`,
            value: currency.value,
          }))}
          searchable={true}
          label="Currency"
          wrapperClassName="bg-gray-100 w-full font-poppins"
          placeholder="Select currency"
          value={formData.currency}
          countryChange={(value) => {
            setFormData((prev) => ({
              ...prev,
              currency: value,
            }));
          }}
        />

        <Input
          name="maximum-amount"
          label="Maximum Insurance amount *"
          inputClassName={inputClassName}
          labelClassName={labelStyle}
          placeholder="Enter maximum amount"
          // prependIcon={<p className="text-base text-gray-800">£</p>}
          value={formData.maximumAmount}
          onChange={(e) =>
            setFormData((prev) => {
              // Remove all non-digit characters except decimal points
              const newValue = e.target.value.replace(/[^0-9.]/g, "");
              // Remove leading zeroes except if the value is '0'
              const cleanedValue = newValue.replace(/^0+(?=\d)/, "");
              return {
                ...prev,
                maximumAmount: cleanedValue,
              };
            })
          }
        />

        <Input
          name="percentageofInsurance"
          label="Percentage of Insurance *"
          type="number"
          inputClassName={inputClassName}
          labelClassName={labelStyle}
          placeholder=""
          value={formData.percentageOfInsurance}
          appendIcon={<p className="text-base text-gray-800">%</p>}
          onChange={(e) =>
            setFormData((prev) => {
              // Remove all non-digit characters except decimal points
              const newValue = e.target.value.replace(/[^0-9.]/g, "");
              // Remove leading zeroes except if the value is '0'
              const cleanedValue = newValue.replace(/^0+(?=\d)/, "");
              return {
                ...prev,
                percentageOfInsurance: cleanedValue,
              };
            })
          }
        />

        {/* <Dropdown
          labelClassName={labelStyle}
          placeholder={`Select`}
          label="Maximum repayment period *"
          name="maximumRepaymentPeriod"
          options={maximumRepaymentOptions}
          wrapperClassName={inputClassName + `w-full text-sm`}
          optionClassName={``}
          value={formData.maxRepaymentPeriod}
          onOptionChange={(value) =>
            setFormData!((prev) => ({
              ...prev,
              maxRepaymentPeriod: value,
            }))
          }
        />

        <p className={labelStyle}>Interest rate type</p>
        <RadioGroupComponent
          size="size-5"
          value={formData.interestRateType}
          setValue={(value: string) =>
            setFormData((prev) => ({
              ...prev,
              interestRateType: value,
            }))
          }
          options={["Variable", "Fixed"]}
        />

        <CountryRegionDropdown
          name="country"
          labelClassName={labelStyle}
          options={Country.getAllCountries().map((country) => ({
            label: country.name,
            value: country.isoCode,
            prefixIcon: country.flag,
          }))}
          searchable={true}
          label="Location"
          wrapperClassName="bg-gray-100 w-full font-poppins"
          placeholder="Select country"
          value={formData.country}
          countryChange={(value) => {
            setFormData((prev) => ({
              ...prev,
              country: value,
            }));
          }}
        />

        <p className={labelStyle}>Package visibility</p>
        <RadioGroupComponent
          size="size-5"
          value={formData.packageVisibility}
          setValue={(value: string) =>
            setFormData((prev) => ({
              ...prev,
              packageVisibility: value,
            }))
          }
          options={["National", "Regional"]}
        />
        {formData.packageVisibility === "Regional" && (
          <Select
            isMulti
            name="colors"
            options={State.getStatesOfCountry(country.isoCode).map((state) => ({
              label: state.name,
              value: state.isoCode,
            }))}
            className="basic-multi-select"
            classNamePrefix="select"
            value={formData.regions}
            // isDisabled={formData.regions.length >= 5}
            onChange={(value) => {
              if (value.length > 5) return;
              setFormData((prev) => ({
                ...prev,
                regions: value,
              }));
            }}
          />
        )} */}

        <Button
          disabled={!isValidDataObject(formData) || addPackage.isPending}
          className="rounded-lg text-white w-full h-11 mt-10"
        >
          {addPackage.isPending ? (
            <Oval
              visible={addPackage.isPending}
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
