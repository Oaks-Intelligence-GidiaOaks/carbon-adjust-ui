import { Button, CountryRegionDropdown, Input, Label } from "@/components/ui";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Country, State } from "country-state-city";
// import RadioGroupComponent from "@/components/ui/RadioGroup";
import { useState } from "react";
import DialogComponent from "@/components/reusables/Dialog";
import { LuRefreshCcw } from "react-icons/lu";
import { SelectAggregator } from "@/components/dialogs";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useIsFetching, useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
// import axiosInstance from "@/api/axiosInstance";
import { cn } from "@/utils";
import { getRetrofittingActivities } from "@/services/homeOccupant";
import { DropdownOption } from "@/types/general";
// import { useQuery } from "@tanstack/react-query";
// import { fetchRetrofittingOptions } from "@/services/homeOccupant";

type Props = {};

type AddressFormState = {
  country: { label: string; value: string };
  cityOrProvince: { label: string; value: string };
  firstLineAddress: string;
  zipcode: string;
  retrofittingActivities: DropdownOption[];
};

const ApplyToAggregator = (_: Props) => {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({
    queryKey: ["application-status"],
  });

  let countryData = Country.getAllCountries();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSelectAggregatorDialog, setShowSelectAggregatorDialog] =
    useState(false);

  const retrofittingActivities = useQuery({
    queryKey: ["retrofitting-activities"],
    queryFn: () => getRetrofittingActivities(),
  });

  console.log(retrofittingActivities.data?.data.data.retrofittingTypes);

  const userData = useSelector((state: RootState) => state.user.user);
  console.log(userData);

  const [addressFormState, setAddressFormState] = useState<AddressFormState>({
    country: {
      label: userData?.address.country ?? "",
      value: userData?.address.country ?? "",
    },
    cityOrProvince: {
      label: userData?.address.cityOrProvince ?? "",
      value: userData?.address.cityOrProvince ?? "",
    },
    firstLineAddress: userData?.address.firstLineAddress ?? "",
    zipcode: userData?.address.zipcode ?? "",
    retrofittingActivities: [],
  });

  const tab = searchParams.get("state");

  // const retrofittingOptions = useQuery({
  //   queryKey: ["retrofitting-options"],
  //   queryFn: fetchRetrofittingOptions,
  // });§

  // console.log(retrofittingOptions.data?.data.data);
  // const getApplicationStatus = useQuery({
  //   queryKey: ["application-status"],
  //   queryFn: () => axiosInstance.get("/applications/me/latest"),
  // });

  // console.log(getApplicationStatus.data?.data);

  const identifyAggregatorApplicationState = () => {
    switch (tab) {
      case "aggregator-form":
        return (
          <div className="flex justify-center bg-white/80 min-h-screen py-10 px-6">
            <div className="max-w-[706px]">
              <p className="font-semibold font-poppins">
                Sustainability Information
              </p>
              <p className="font-poppins mt-4">
                Please select the range of retrofitting activities you will be
                seeking Carbon Credit for.
              </p>

              <form className="mt-10" onSubmit={(e) => e.preventDefault()}>
                <Input
                  name="firstLineOfAddress"
                  label="First Line of Address"
                  labelClassName="mb-4 font-poppins text-black-main"
                  inputClassName="bg-gray-100 font-poppins"
                  placeholder="Enter address"
                  value={addressFormState.firstLineAddress}
                  onChange={(e) =>
                    setAddressFormState((prev) => ({
                      ...prev,
                      firstLineAddress: e.target.value,
                    }))
                  }
                />
                <div className="mt-6">
                  <CountryRegionDropdown
                    name="countryOfResidence"
                    labelClassName="mb-4 text-black-main font-poppins"
                    options={countryData.map((country) => ({
                      label: country.name,
                      value: country.isoCode,
                      prefixIcon: country.flag,
                    }))}
                    searchable={true}
                    label="Country of Residence"
                    wrapperClassName="bg-gray-100 w-full font-poppins"
                    placeholder="Select country"
                    value={addressFormState.country}
                    countryChange={(value) => {
                      if (value.label !== addressFormState.country.label)
                        setAddressFormState((prev) => ({
                          ...prev,
                          cityOrProvince: { label: "", value: "" },
                        }));
                      setAddressFormState((prev) => ({
                        ...prev,
                        country: value,
                      }));
                    }}
                  />
                </div>
                <div className="mt-6">
                  <CountryRegionDropdown
                    name="city/state/province"
                    labelClassName="mb-4 text-black-main font-poppins"
                    options={State.getStatesOfCountry(
                      addressFormState.country.value
                    ).map((state) => ({
                      label: state.name,
                      value: state.isoCode,
                    }))}
                    searchable={true}
                    label="City/State/Province"
                    wrapperClassName="bg-gray-100 w-full font-poppins"
                    placeholder="Select city/state/province"
                    value={addressFormState.cityOrProvince}
                    cityChange={(value) =>
                      setAddressFormState((prev) => ({
                        ...prev,
                        cityOrProvince: value,
                      }))
                    }
                  />
                </div>
                <div className="mt-6">
                  <Input
                    name="postCode/zipCode"
                    label="Post Code/Zip code"
                    required
                    labelClassName="mb-4 font-poppins text-black-main"
                    inputClassName="bg-gray-100 font-poppins"
                    placeholder="Enter post/zip code"
                    value={addressFormState.zipcode}
                    onChange={(e) =>
                      setAddressFormState((prev) => ({
                        ...prev,
                        zipcode: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mt-6">
                  {/* <RadioGroupComponent
                    value={addressFormState.retrofittingActivity}
                    setValue={(value: string) =>
                      setAddressFormState((prev) => ({
                        ...prev,
                        retrofittingActivity: value,
                      }))
                    }
                    options={[
                      "Heating/Cooling",
                      "Insulation",
                      "Lighting",
                      "Flexible Dispatch",
                      "Others",
                    ]}
                  /> */}
                  <Label
                    htmlFor={"retrofitting-activities"}
                    className={cn(
                      `block text-[#888888] group-valid:text-[#171717] group-has-[:valid]:text-[#171717] mb-4 font-poppins text-black-main`
                    )}
                  >
                    Retrofitting Activities
                  </Label>
                  <Select
                    isLoading={retrofittingActivities.isLoading}
                    name="retrofitting-activities"
                    isMulti
                    options={
                      retrofittingActivities.data?.data.data.retrofittingTypes
                        ? retrofittingActivities.data.data.data.retrofittingTypes.map(
                            (act: any) => ({
                              label: Object.values(act)[0],
                              value: Object.values(act)[0],
                            })
                          )
                        : []
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    classNames={{
                      container: () => "bg-gray-100",
                      valueContainer: () => "bg-gray-100",
                      input: () =>
                        "[&_input:focus]:ring-0 ring-transparent ring h-10 font-sm",
                      // control: () => "form-multiselect",
                      control: () =>
                        "form-multiselect select-border-removed font-poppins",
                      menu: () => "bg-slate-200 font-poppins",
                      indicatorsContainer: () => "bg-gray-100",
                      dropdownIndicator: () => "bg-gray-100",
                      option: ({ isFocused, isSelected }) =>
                        cn(
                          isFocused &&
                            `hover:cursor-pointer 
                            hover:bg-ca-blue/30 
                            px-3 py-2 rounded`,
                          isSelected && "bg-slate-300",
                          "font-poppins"
                        ),
                    }}
                    placeholder="Select retrofitting activities"
                    value={addressFormState.retrofittingActivities}
                    onChange={(value) =>
                      setAddressFormState((prev) => ({
                        ...prev,
                        retrofittingActivities: value as any,
                      }))
                    }

                    // isDisabled={formData.regions.length >= 5}
                    // onChange={(value) => {
                    //   if (value.length > 5) return;
                    //   setFormData((prev) => ({
                    //     ...prev,
                    //     regions: value,
                    //   }));
                    // }}
                  />
                </div>
                <div className="mt-8 mb-20">
                  <Button
                    onClick={() => setShowSelectAggregatorDialog(true)}
                    className="w-full text-white font-poppins h-12"
                  >
                    Send to Aggregators
                  </Button>
                </div>
              </form>
            </div>
          </div>
        );
      case "pending-application":
        return (
          <div className="flex justify-center bg-white/80 min-h-screen">
            <div className="max-w-[500px] px-2 flex flex-col items-center pt-10">
              <img src="/assets/graphics/pending-application.svg" />
              <p className="text-center font-poppins text-xl font-semibold px-[10%] text-black-main">
                Details successfully sent to aggregators
              </p>
              <p className="pt-4 font-poppins text-red-500">
                Awaiting approval
              </p>
              <Button
                // disabled={useIsFetching({queryKey: ["application-status"]})}
                variant="default"
                // disabled
                className="bg-white h-10 shadow px-8 flex gap-2 justify-center items-center font-poppins mt-6"
                onClick={() =>
                  // navigate({
                  //   pathname: "",
                  //   search: createSearchParams({
                  //     state: "application-approved",
                  //   }).toString(),
                  // })
                  queryClient
                    .invalidateQueries({
                      queryKey: ["application-status"],
                    })
                    .then(() => {
                      const data = queryClient.getQueryData([
                        "application-status",
                      ]);
                      if (
                        (data as any).data.data.currentAppStatus === "Approved"
                      ) {
                        navigate(
                          "/dashboard/applications/aggregator?state=application-approved"
                        );
                      }
                      if ((data as any).data.data.hasApp === false) {
                        navigate(
                          "/dashboard/applications/aggregator?state=application-rejected"
                        );
                      }
                      console.log(data);
                    })
                }
              >
                <span className="text-white">Refresh</span>
                <LuRefreshCcw
                  width={24}
                  className={cn(
                    "text-white",
                    isFetching && "anim animate-spin"
                  )}
                  color="#FFFFFF"
                />
              </Button>
              <p className="mt-10 text-blue-main text-center font-poppins italic">
                “From 1990 to 2019, the total warming effect from greenhouse
                gases added by humans to the Earth's atmosphere increased by 45
                percent. The warming effect associated with carbon dioxide alone
                increased by 36 percent.”
              </p>
            </div>
          </div>
        );
      case "application-rejected":
        return (
          <div className="flex justify-center bg-white/80 min-h-screen">
            <div className="max-w-[500px] px-2 flex flex-col items-center pt-10">
              <img src="/assets/graphics/application-rejected.svg" />
              <p className="text-center font-poppins text-xl font-medium mt-6 px-[10%] text-red-500">
                Application Rejected
              </p>
              <Button
                variant="default"
                // disabled
                className="bg-white h-10 shadow px-8 flex gap-2 justify-center items-center font-poppins mt-6"
                onClick={() =>
                  navigate({
                    pathname: "",
                    search: createSearchParams({
                      state: "aggregator-form",
                    }).toString(),
                  })
                }
              >
                <span className="text-white">Start Application</span>
                <ArrowRightIcon
                  width={24}
                  className="text-white"
                  color="#FFFFFF"
                />
              </Button>
            </div>
          </div>
        );
      case "application-approved":
        return (
          <div className="flex justify-center bg-white/80 min-h-screen">
            <div className="max-w-[500px] px-2 flex flex-col items-center pt-10">
              <img src="/assets/graphics/pending-application.svg" />
              <p className="text-center font-poppins text-xl font-medium mt-6 px-[10%] text-green-500">
                Application Approved
              </p>
              <div className="flex flex-col w-48 items-center">
                <Button
                  variant="default"
                  disabled
                  className="bg-white h-10 shadow px-8 flex gap-2 justify-center items-center font-poppins mt-6 w-full"
                  onClick={() =>
                    navigate({
                      pathname:
                        "/dashboard/applications/aggregator-applications",
                    })
                  }
                >
                  <span className="text-white">Finish Application</span>
                </Button>
                <Button
                  variant="outline"
                  // disabled
                  className="bg-transparent h-10 shadow px-8 flex gap-2 justify-center items-center font-poppins mt-6 w-full border-blue-main"
                  onClick={() => navigate("/dashboard/applications/hia")}
                >
                  <span className="text-blue-main">Apply to HIA</span>
                  <ArrowRightIcon width={24} className="text-blue-main" />
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex justify-center bg-white/80 min-h-screen">
            <div className="max-w-[500px] px-2 flex flex-col items-center pt-10">
              <img src="/assets/graphics/empty-box.svg" />
              <p className="text-center font-poppins text-lg font-semibold px-[10%] text-black-main">
                There is no created{" "}
                <span className="text-blue-main">application</span> yet on your
                account
              </p>
              <Button
                variant="default"
                // disabled
                className="bg-white h-10 shadow px-8 flex gap-4 justify-center items-center font-poppins mt-6"
                onClick={() =>
                  navigate({
                    pathname: "",
                    search: createSearchParams({
                      state: "aggregator-form",
                    }).toString(),
                  })
                }
              >
                <span className="text-white">Start Application</span>
                <ArrowRightIcon
                  width={24}
                  className="text-white"
                  color="#FFFFFF"
                />
              </Button>
              <p className="mt-10 text-blue-main text-center font-poppins italic">
                “From 1990 to 2019, the total warming effect from greenhouse
                gases added by humans to the Earth's atmosphere increased by 45
                percent. The warming effect associated with carbon dioxide alone
                increased by 36 percent.”
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-fixed bg-contain bg-bottom bg-[url(/assets/graphics/applications-bg.svg)] bg-opacity-20">
      {showSelectAggregatorDialog && (
        <DialogComponent
          isOpen={showSelectAggregatorDialog}
          onOpenChange={() => setShowSelectAggregatorDialog(false)}
        >
          <SelectAggregator
            formData={addressFormState}
            setShowSelectAggregatorDialog={setShowSelectAggregatorDialog}
          />
        </DialogComponent>
      )}
      {identifyAggregatorApplicationState()}
    </div>
  );
};

export default ApplyToAggregator;
