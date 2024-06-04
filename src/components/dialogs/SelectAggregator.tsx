import { Country, State } from "country-state-city";
import { Button, CountryRegionDropdown, Dropdown } from "../ui";
import * as Dialog from "@radix-ui/react-dialog";
import { GrClose } from "react-icons/gr";
import { createSearchParams, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { aggregatorTypes } from "@/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyToAgg, fetchAggregators } from "@/services/homeOccupant";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { DropdownOption } from "@/types/general";

type Props = {
  setShowSelectAggregatorDialog: (value: boolean) => void;
  formData: {
    country: {
      label: string;
      value: string;
    };
    cityOrProvince: {
      label: string;
      value: string;
    };
    firstLineAddress: string;
    zipcode: string;
    retrofittingActivities: DropdownOption[];
  };
};

const SelectAggregator = ({
  setShowSelectAggregatorDialog,
  formData,
}: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [aggFilterFormState, setAggFilterFormState] = useState({
    country: {
      label: "",
      value: "",
    },
    cityOrProvince: {
      label: "",
      value: "",
    },
    aggregatorType: {
      label: "",
      value: "",
    },
    aggregatorName: {
      label: "",
      value: "",
    },
    aggId: "",
  });

  const aggregators = useQuery({
    queryKey: [
      "fetch-aggregators",
      aggFilterFormState.aggregatorType.value,
      aggFilterFormState.cityOrProvince.value,
      aggFilterFormState.country.value,
    ],
    queryFn: () =>
      fetchAggregators(
        aggFilterFormState.country.value,
        aggFilterFormState.cityOrProvince.value,
        aggFilterFormState.aggregatorType.value
      ),
    enabled: Boolean(
      aggFilterFormState.country.value.length > 0 &&
        aggFilterFormState.cityOrProvince.value.length > 0 &&
        aggFilterFormState.aggregatorType.value.length > 0
    ),
  });

  const applyToAggregator = useMutation({
    mutationKey: ["apply-to-aggregator"],
    mutationFn: () =>
      applyToAgg({
        retrofittingType: formData.retrofittingActivities.map(
          (act) => act.value
        ),
        aggId: aggFilterFormState.aggId,
        address: {
          cityOrProvince: formData.cityOrProvince.label,
          country: formData.country.label,
          zipcode: formData.zipcode,
          firstLineAddress: formData.firstLineAddress,
        },
      }),
    onSuccess: () => {
      toast.success("Application to aggregator submitted successfully");
      queryClient.invalidateQueries({ type: "all" });
      setShowSelectAggregatorDialog(false);
      navigate({
        pathname: "",
        search: createSearchParams({
          state: "pending-application",
        }).toString(),
      });
    },
    onError: () => {
      toast.error("Error sending application to aggregator");
      setShowSelectAggregatorDialog(false);
    },
  });

  console.log(aggregators.data?.data);

  useEffect(() => {
    if (aggregators.isError) {
      toast.error("Error fetching aggregators.");
    }
    if (aggregators.isSuccess) {
      if (aggregators.data?.data.data.length <= 0) {
        toast.error("No aggregator found");
      }
    }
  }, [aggregators.isSuccess, aggregators.isError]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    applyToAggregator.mutate();
  };

  let countryData = Country.getAllCountries();
  return (
    <div className="w-screen max-w-[806px] bg-white h-fit rounded-md pt-6 mt-[10vh] relative">
      <div className="max-w-[630px] w-full mx-auto px-2 sm:px-6 relative">
        <div className="mx-auto pb-[10vh]">
          <p className="font-semibold text-blue-main text-lg text-center font-poppins">
            SELECT AGGREGATOR
          </p>
          <form onSubmit={handleSubmit} className="mt-10 mx-auto">
            <div className="mt-6 relative z-[99999999999]">
              <CountryRegionDropdown
                name="country"
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
                value={aggFilterFormState.country}
                countryChange={(value) => {
                  if (value.label !== aggFilterFormState.country.label)
                    setAggFilterFormState((prev) => ({
                      ...prev,
                      cityOrProvince: { label: "", value: "" },
                    }));
                  setAggFilterFormState((prev) => ({
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
                  aggFilterFormState.country.value
                ).map((state) => ({
                  label: state.name,
                  value: state.isoCode,
                }))}
                searchable={true}
                label="City/State/Province"
                wrapperClassName="bg-gray-100 w-full font-poppins"
                placeholder="Select city/state/province"
                value={aggFilterFormState.cityOrProvince}
                cityChange={(value) =>
                  setAggFilterFormState((prev) => ({
                    ...prev,
                    cityOrProvince: value,
                  }))
                }
              />
            </div>
            <div className="mt-6">
              <Dropdown
                name="AggregatorType"
                labelClassName="mb-4 text-[#000000_!important] font-poppins"
                options={aggregatorTypes}
                label="Aggregator type"
                wrapperClassName="bg-gray-100 w-full font-poppins"
                placeholder="Select aggregator type"
                value={aggFilterFormState!.aggregatorType}
                onOptionChange={(value) =>
                  setAggFilterFormState!((prev) => ({
                    ...prev,
                    aggregatorType: value,
                  }))
                }
              />
            </div>
            <div className="mt-6">
              <Dropdown
                name="AggregatorName"
                labelClassName="mb-4 text-[#000000_!important] font-poppins"
                options={
                  aggregators.data?.data.data.length > 0
                    ? aggregators.data?.data.data.map((agg: any) => ({
                        label: agg.name,
                        value: agg._id,
                      }))
                    : []
                }
                label="Aggregator Name"
                wrapperClassName="bg-gray-100 w-full font-poppins"
                placeholder="Select aggregator name"
                isLoading={aggregators.isLoading}
                loadingText="Searching for Aggregators"
                value={aggFilterFormState!.aggregatorName}
                onOptionChange={(value) =>
                  setAggFilterFormState!((prev) => ({
                    ...prev,
                    aggregatorName: value,
                    aggId: value.value,
                  }))
                }
              />
            </div>
            <div className="mt-10">
              <Button
                disabled={applyToAggregator.isPending}
                className="rounded-lg text-white mt-4 w-full h-11 flex justify-center items-center"
              >
                {applyToAggregator.isPending ? (
                  <Oval
                    visible={applyToAggregator.isPending}
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <span>Send</span>
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

export default SelectAggregator;
