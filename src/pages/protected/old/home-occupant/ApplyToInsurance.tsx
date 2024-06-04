import { FinanceApplicationSuccess } from "@/components/dialogs";
import DialogComponent from "@/components/reusables/Dialog";
import FlyoutSidebar from "@/components/reusables/FlyoutSidebar";
import InsuranceCard from "@/components/reusables/InsuranceCard";
// import SelectedPackagesSummaryCard from "@/components/reusables/SelectedPackagesSummaryCard";
// import SubContractorCard from "@/components/reusables/SubContractorCard";
import { Button, Dropdown, Input, Label } from "@/components/ui";
import * as Slider from "@radix-ui/react-slider";
// import {
//   insuranceOptions,
//   placeholderHIAPackages,
//   subContractors,
// } from "@/constants";
import {
  //   applyToFinance,
  applyToInsurance,
  applyToInsuranceFromHIA,
  //   fetchFinancePackages,
  fetchInsurancePackages,
} from "@/services/homeOccupant";
import {
  cn,
  convertFormattedStringToNumber,
  formatNumberWithCommas,
  generateUserCurrency,
} from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
// import { FaChevronRight } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import {
  //   createSearchParams,
  useNavigate,
  //   useSearchParams,
} from "react-router-dom";
import { maximumRepaymentOptions } from "@/constants";
import Loading from "@/components/reusables/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

type Props = {};

const ApplyToInsurance = (_: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user.user);
  //   const [searchParams] = useSearchParams();

  const [, setShowSheet] = useState(true);
  const [showInsuranceSheet, setShowInsuranceSheet] = useState(true);
  const [showInsurancePackagesSheet, setShowInsurancePackagesSheet] =
    useState(false);
  //   const [showSelectedPackagesSheet, setShowSelectedPackagesSheet] =
  //     useState(true);
  const [showApplicationSuccessDialog, setShowApplicationSuccessDialog] =
    useState(false);

  const currentApplicationDetails = queryClient.getQueryData([
    "application-status",
  ]);

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const insurancePackages = useQuery({
    queryKey: ["fetch-insurance-packages"],
    queryFn: () =>
      fetchInsurancePackages(
        (currentApplicationDetails as any)?.data?.data.appId
      ),
    enabled: showInsurancePackagesSheet,
  });

  console.log((currentApplicationDetails as any)?.data?.data);
  console.log((insurancePackages as any)?.data?.data);

  const hiaInsuranceMutation = useMutation({
    mutationKey: ["apply-to-insurance"],
    mutationFn: () =>
      applyToInsuranceFromHIA(
        {
          packageId: selectedPackage,
          carbonCredit: convertFormattedStringToNumber(details.carbonCredit),
          loanAmt: convertFormattedStringToNumber(details.loanAmount),
          durationOfCC: parseInt(details.durationOfCC.value),
          percentOfIns: parseInt(details.percentageOfInsurance[0].toString()),
          appStage: (currentApplicationDetails as any)?.data?.data
            .currentAppStage,
          annHouseholdIncome: convertFormattedStringToNumber(
            details.houseHoldIncome
          ),
          otherIncome: convertFormattedStringToNumber(details.otherIncome),
          moHouseholdExp: convertFormattedStringToNumber(
            details.houseHoldMonthlyExpenses
          ),
          othMonthlyExp: convertFormattedStringToNumber(
            details.otherMonthlyExpense
          ),
          dependants: convertFormattedStringToNumber(details.noOfDependents),
        },
        (currentApplicationDetails as any)?.data?.data.appId
      ),
    onSuccess: () => {
      toast.success("Application to Insurance Institution successful");
      queryClient.invalidateQueries({ type: "all" });
      setShowApplicationSuccessDialog(true);
      navigate("/dashboard/applications/insurance-applications");
    },
    onError: () => {
      toast.error("Error sending application to Insurance Institution");
    },
  });
  const insuranceMutation = useMutation({
    mutationKey: ["apply-to-insurance"],
    mutationFn: () =>
      applyToInsurance(
        {
          packageId: selectedPackage,
          carbonCredit: convertFormattedStringToNumber(details.carbonCredit),
          loanAmt: convertFormattedStringToNumber(details.loanAmount),
          durationOfCC: parseInt(details.durationOfCC.value),
          percentOfIns: parseInt(details.percentageOfInsurance[0].toString()),
          appStage: (currentApplicationDetails as any)?.data?.data
            .currentAppStage,
        },
        (currentApplicationDetails as any)?.data?.data.appId
      ),
    onSuccess: () => {
      toast.success("Application to Insurance Institution successful");
      queryClient.invalidateQueries({ type: "all" });
      setShowApplicationSuccessDialog(true);
      navigate("/dashboard/applications/insurance-applications");
    },
    onError: () => {
      toast.error("Error sending application to Insurance Institution");
    },
  });

  //   const tab = searchParams.get("state");

  const [details, setDetails] = useState({
    carbonCredit: "",
    loanAmount: "",
    firstLineOfAddress: "",
    houseHoldIncome: "",
    otherIncome: "",
    houseHoldMonthlyExpenses: "",
    otherMonthlyExpense: "",
    noOfDependents: "",
    percentageOfInsurance: [20],
    durationOfCC: {
      label: "",
      value: "",
    },
  });

  //   const identifyInsuranceApplicationState = () => {
  //     switch (tab) {
  //       default:
  //         <></>;
  //     }
  //   };

  return (
    <div className="min-h-screen bg-no-repeat bg-fixed bg-contain bg-bottom bg-[url(/assets/graphics/applications-bg.svg)] bg-opacity-20">
      {/* If user chooses to apply for insurance */}
      <DialogComponent
        isOpen={showApplicationSuccessDialog}
        onOpenChange={() =>
          navigate("/dashboard/applications/hia-applications")
        }
      >
        <FinanceApplicationSuccess
          setShowApplicationSuccessDialog={setShowApplicationSuccessDialog}
        />
      </DialogComponent>
      {/* {identifyInsuranceApplicationState()} */}
      <>
        {/* Select Packages sub contractors Sheet */}
        {/* <FlyoutSidebar isOpen={showSheet} onOpenChange={setShowSheet}>
          <div className="font-poppins relative h-full">
            <div className="px-2 sm:px-6">
              <div>
                <p className="font-semibold text-2xl text-black-main">
                  Choose Subcontractors
                </p>
                <p className="text-gray-500 mt-1">
                  Select from a list of sub contractors to continue
                </p>
              </div>
              <div>
                <p className="font-medium text-green-600 mt-6">
                  4/8 Subcontractors Selected
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-y-4">
                {subContractors.map((subcontractor, i) => (
                  <SubContractorCard
                    data={subcontractor}
                    key={i}
                    setShowSheet={setShowSheet}
                  />
                ))}
              </div>
            </div>
            <div className="sticky bottom-0 mt-20 bg-white left-0 p-4 flex justify-around gap-2 flex-wrap font-poppins border w-full border-t-black-main/50 z-50">
              <Button
                onClick={() => setShowSheet(false)}
                variant={"outline"}
                className="border-black-main text-black-main max-w-[192px] w-full min-w-[120px]"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowSheet(false)}
                className="text-white max-w-[192px] w-full min-w-[120px]"
              >
                Save selection
              </Button>
            </div>
          </div>
        </FlyoutSidebar> */}

        {/* View Selected Packages Sheet */}
        {/* <FlyoutSidebar
          isOpen={showSelectedPackagesSheet}
          onOpenChange={setShowSelectedPackagesSheet}
        >
          <div className="font-poppins relative h-full">
            <div className="px-2 sm:px-6">
              <div>
                <p className="font-semibold text-2xl text-black-main">
                  Summary
                </p>
              </div>
              <div>
                <p className="font-medium text-green-600 mt-6">
                  2/8 Packages selected
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-y-4 min-h-screen">
                {placeholderHIAPackages.slice(0, 1).map((packageData, i) => (
                  <SelectedPackagesSummaryCard
                    key={i}
                    packageData={packageData}
                    setShowSelectedPackagesSheet={setShowSelectedPackagesSheet}
                    setShowSheet={setShowSheet}
                    subContractorData={subContractors.slice(0, 2)}
                  />
                ))}
              </div>
            </div>
            <div className="sticky bottom-0 mt-20 bg-white left-0 p-4 flex justify-around gap-2 flex-wrap font-poppins border w-full border-t-black-main/50 z-50">
              <Button
                onClick={() => setShowSelectedPackagesSheet(false)}
                variant={"outline"}
                className="border-black-main text-black-main max-w-[192px] w-full min-w-[120px]"
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  navigate({
                    pathname: "",
                    search: createSearchParams({
                      state: "pending-applications",
                    }).toString(),
                  })
                }
                className="text-white max-w-[192px] w-full min-w-[120px] gap-3"
              >
                <span>Apply now</span>
                <FaChevronRight />
              </Button>
            </div>
          </div>
        </FlyoutSidebar> */}

        {/* Show insurance form*/}
        <FlyoutSidebar
          isOpen={showInsuranceSheet}
          onOpenChange={(value) => {
            setShowInsuranceSheet(value);
            navigate("/dashboard/applications/insurance-applications");
          }}
        >
          <div className="font-poppins relative h-full">
            <div className="px-2 sm:px-6">
              <div>
                <p className="font-semibold text-2xl text-black-main">
                  Apply for Insurance
                </p>
              </div>
              <form className="mt-10 min-h-screen">
                <div className="mt-6">
                  <Input
                    name="valueOfCarbonCredit"
                    label="Value of Carbon Credit"
                    labelClassName="mb-4 font-poppins text-black-main"
                    inputClassName="bg-gray-100 font-poppins"
                    placeholder="Value of Carbon Credit that will be generated"
                    appendIcon={<p className="font-medium pl-2">tCo2e</p>}
                    value={details!.carbonCredit}
                    onChange={(e) =>
                      setDetails!((prev) => {
                        // const newValue = e.target.value.replace(/[^0-9]/g, "");
                        return {
                          ...prev,
                          carbonCredit: formatNumberWithCommas(e.target.value),
                        };
                      })
                    }
                  />
                </div>
                <div className="mt-6">
                  <Input
                    name="loanAmount"
                    label="Loan amount"
                    labelClassName="mb-4 font-poppins text-black-main"
                    inputClassName="bg-gray-100 font-poppins"
                    placeholder="How much loan are you requesting for ?"
                    prependIcon={
                      <p className="bg-gray-200 p-2 py-1 rounded-sm">
                        {generateUserCurrency(userData?.address.country!)}
                      </p>
                    }
                    value={details!.loanAmount}
                    onChange={(e) =>
                      setDetails!((prev) => {
                        return {
                          ...prev,
                          loanAmount: formatNumberWithCommas(e.target.value),
                        };
                      })
                    }
                  />
                </div>
                <div className="mt-6">
                  <Label
                    // htmlFor={props.id}
                    className={cn(
                      `mb-1 block text-[#888888] group-valid:text-[#171717] group-has-[:valid]:text-[#171717]`,
                      "mb-1 font-poppins text-black-main"
                    )}
                  >
                    Percentage of Insurance
                  </Label>
                  <p className="text-xs text-grey-swatch-600">
                    What % of the retrofit cost do you want to protect ?
                  </p>
                  <div className="flex gap-2">
                    <Slider.Root
                      className="relative flex items-center justify-between select-none touch-none w-full h-5 mt-2"
                      value={details!.percentageOfInsurance}
                      onValueChange={(val) =>
                        setDetails!((prev) => {
                          // const newValue = e.target.value.replace(/[^0-9]/g, "");
                          return {
                            ...prev,
                            percentageOfInsurance: val,
                          };
                        })
                      }
                      max={100}
                      step={0.1}
                    >
                      <Slider.Track className="bg-[#6750A430] relative grow rounded-full h-[5px]">
                        <Slider.Range className="absolute bg-[#6750A4] rounded-full h-full" />
                      </Slider.Track>
                      <Slider.Thumb
                        className="block w-5 h-5 bg-[#6750A4] shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-[#6750A420]"
                        aria-label="percentage"
                      />
                    </Slider.Root>
                    <p className="px-1 w-16 text-right">
                      {details.percentageOfInsurance[0]}%
                    </p>
                  </div>
                </div>
                <div className="mt-6 w-full">
                  {/* <Input
                    name="durationOfCarbonCredit"
                    label="Duration of Carbon Credit"
                    labelClassName="mb-4 font-poppins text-black-main"
                    inputClassName="bg-gray-100 font-poppins"
                    placeholder="How long will the Carbon Credit be generated for?"
                    value={details.durationOfCC}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        durationOfCC: e.target.value,
                      }))
                    }
                  /> */}
                  <Dropdown
                    labelClassName="mb-4 font-poppins text-black-main"
                    placeholder={`Select`}
                    label="Duration of Carbon Credit"
                    name="durationOfCC"
                    options={maximumRepaymentOptions}
                    wrapperClassName={
                      "bg-[#E4E7E863] bg-opacity-30 text-xs text-black-main !font-[400] w-full " +
                      `w-full text-sm`
                    }
                    optionClassName={``}
                    value={details.durationOfCC}
                    onOptionChange={(value) =>
                      setDetails!((prev) => ({
                        ...prev,
                        durationOfCC: value,
                      }))
                    }
                  />
                </div>

                {(currentApplicationDetails as any)?.data?.data
                  .currentAppStage === 2 && (
                  <>
                    <div className="mt-6">
                      <Input
                        name="annualIncome"
                        label="What is your annual household Income?"
                        labelClassName="mb-4 font-poppins text-black-main"
                        inputClassName="bg-gray-100 font-poppins"
                        placeholder="Your annual household income"
                        value={details.houseHoldIncome}
                        prependIcon={
                          <p className="bg-gray-200 p-2 py-1 rounded-sm">
                            {generateUserCurrency(userData?.address.country!)}
                          </p>
                        }
                        onChange={(e) =>
                          setDetails!((prev) => {
                            return {
                              ...prev,
                              houseHoldIncome: formatNumberWithCommas(
                                e.target.value
                              ),
                            };
                          })
                        }
                      />
                    </div>
                    <div className="mt-6">
                      <Input
                        name="otherIncome"
                        label="Other income (Spouse, additional employment, etc. *"
                        required
                        labelClassName="mb-4 font-poppins text-black-main"
                        inputClassName="bg-gray-100 font-poppins"
                        placeholder="Other income"
                        value={details.otherIncome}
                        prependIcon={
                          <p className="bg-gray-200 p-2 py-1 rounded-sm">
                            {generateUserCurrency(userData?.address.country!)}
                          </p>
                        }
                        onChange={(e) =>
                          setDetails!((prev) => {
                            return {
                              ...prev,
                              otherIncome: formatNumberWithCommas(
                                e.target.value
                              ),
                            };
                          })
                        }
                      />
                    </div>
                    <div className="mt-6">
                      <Input
                        name="householdMonthlyExpenses"
                        label="Household monthly expenses (excluding loans, credit card, etc)"
                        required
                        labelClassName="mb-4 font-poppins text-black-main"
                        inputClassName="bg-gray-100 font-poppins"
                        placeholder=""
                        value={details.houseHoldMonthlyExpenses}
                        prependIcon={
                          <p className="bg-gray-200 p-2 py-1 rounded-sm">
                            {generateUserCurrency(userData?.address.country!)}
                          </p>
                        }
                        onChange={(e) =>
                          setDetails!((prev) => {
                            return {
                              ...prev,
                              houseHoldMonthlyExpenses: formatNumberWithCommas(
                                e.target.value
                              ),
                            };
                          })
                        }
                      />
                    </div>
                    <div className="mt-6">
                      <Input
                        name="otherMonthlyExpenses"
                        label="Other monthly expenses"
                        required
                        labelClassName="mb-4 font-poppins text-black-main"
                        inputClassName="bg-gray-100 font-poppins"
                        placeholder="Other monthly expenses"
                        prependIcon={
                          <p className="bg-gray-200 p-2 py-1 rounded-sm">
                            {generateUserCurrency(userData?.address.country!)}
                          </p>
                        }
                        value={details.otherMonthlyExpense}
                        onChange={(e) =>
                          setDetails!((prev) => {
                            return {
                              ...prev,
                              otherMonthlyExpense: formatNumberWithCommas(
                                e.target.value
                              ),
                            };
                          })
                        }
                      />
                    </div>
                    <div className="mt-6">
                      <Input
                        name="noOfDeps"
                        label="Number of dependents"
                        required
                        labelClassName="mb-4 font-poppins text-black-main"
                        inputClassName="bg-gray-100 font-poppins"
                        placeholder="Number of dependents"
                        value={details.noOfDependents}
                        onChange={(e) =>
                          setDetails!((prev) => {
                            return {
                              ...prev,
                              noOfDependents: formatNumberWithCommas(
                                e.target.value
                              ),
                            };
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
            <div className="sticky bottom-0 mt-20 bg-white left-0 p-4 flex justify-around gap-2 flex-wrap font-poppins border w-full border-t-black-main/50 z-50">
              <Button
                // disabled={Object.values(details).some((val) => val === "")}
                onClick={() => {
                  setShowInsurancePackagesSheet(true);
                  setShowInsuranceSheet(false);
                }}
                className="w-full text-white font-poppins h-12"
              >
                Continue
              </Button>
            </div>
          </div>
        </FlyoutSidebar>

        {/* Select Insurance Packages */}
        <FlyoutSidebar
          isOpen={showInsurancePackagesSheet}
          onOpenChange={setShowInsurancePackagesSheet}
        >
          <div className="font-poppins relative h-full">
            <p
              role="button"
              onClick={() => {
                setShowInsurancePackagesSheet(false);
                setShowInsuranceSheet(true);
              }}
              className="flex gap-x-2 items-center justify-center absolute left-6 -top-10"
            >
              <BiArrowBack className="text-main" />
              <p className="text-main">Back</p>
            </p>
            <div className="px-2 sm:px-6 min-h-screen">
              <div>
                <p className="font-semibold text-2xl text-black-main">
                  Insurance Institutions
                </p>
                <p className="text-gray-500 mt-1">
                  Select an insurance package
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-y-4">
                {insurancePackages.isLoading && (
                  <div className="mt-20">
                    <Loading message="Finding packages" />
                  </div>
                )}
                {(insurancePackages as any)?.data?.data.data.map(
                  (insurance: any, i: number) => (
                    <InsuranceCard
                      selectedPackage={selectedPackage}
                      setSelectedPackage={setSelectedPackage}
                      isLive
                      data={insurance}
                      key={i}
                      setShowSheet={setShowSheet}
                    />
                  )
                )}
              </div>
            </div>
            <div className="sticky bottom-0 mt-20 bg-white left-0 p-4 flex justify-around gap-2 flex-wrap font-poppins border w-full border-t-black-main/50 z-50">
              <Button
                onClick={() => {
                  if (
                    (currentApplicationDetails as any)?.data?.data
                      .currentAppStage === 2
                  ) {
                    hiaInsuranceMutation.mutate();
                  } else {
                    insuranceMutation.mutate();
                  }
                }}
                className="text-white w-full min-w-[120px]"
              >
                {insuranceMutation.isPending ||
                hiaInsuranceMutation.isPending ? (
                  <Oval
                    visible={
                      insuranceMutation.isPending ||
                      hiaInsuranceMutation.isPending
                    }
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <span>Apply</span>
                )}
              </Button>
            </div>
          </div>
        </FlyoutSidebar>

        {/* <div className="flex justify-between items-center gap-x-4 py-10 px-6">
                  <p className="font-semibold font-poppins text-xl text-black-main">
                    Financing options
                  </p>
                  <Input
                    name="search"
                    inputClassName="bg-white font-poppins h-10"
                    wrapperClassName="max-w-[400px_!important] rounded-lg border border-black-main/70"
                    placeholder="Search here"
                    prependIcon={<BiSearch color="grey" size={18} />}
                  />
                </div>
                <div className="flex justify-center text-black-main bg-white/80 min-h-screen px-6">
                  <div className="w-full flex justify-center gap-x-6">
                    <div className="flex-[0.5] h-full">
                      <div className="mt-6 flex flex-col gap-y-5">
                        {financePackages.data?.data.data.map(
                          (financePackage: any, i: number) => (
                            <FinanceOptionCard
                              data={financePackage}
                              key={i}
                              liveData={true}
                              setShowInsuranceSheet={setShowInsuranceSheet}
                              setShowInsurancePackagesSheet={
                                setShowInsurancePackagesSheet
                              }
                              mutation={financeMutation}
                              isSelected={selectedPackages.includes(i)}
                              className="bg-[#DBEEF8]"
                              type="finance"
                            />
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex-[0.5] h-full flex flex-col sticky top-0">
                      <div className="w-full h-3/5 max-h-[390px]">
                        <Map />
                      </div>
    
                      <div className="flex flex-col pt-2 mt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-[16px] leading-[20px] font-medium font-poppins text-sub-header">
                            Top Financial Institutions
                          </span>
                          <button className="text-[14px] leading-[12px] font-normal font-poppins text-[#2196F3]">
                            See More
                          </button>
                        </div>
    
                        <div className="p-2 h-full rounded-lg flex flex-col gap-[1px] mt-4 overflow-hidden bg-gray-100">
                          <TopHiaCard
                            name="Microsoft Corporation"
                            image={image1}
                            retrofitCount="267,502"
                            className="rounded-t"
                          />
                          <TopHiaCard
                            name="Apple Inc."
                            image={image2}
                            retrofitCount="217,034"
                          />
                          <TopHiaCard
                            name="Tesla Inc."
                            image={image3}
                            retrofitCount="193,205"
                          />
                          <TopHiaCard
                            name="Real Madrid CF"
                            image={image4}
                            retrofitCount="154,005"
                            className="rounded-b"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
      </>
    </div>
  );
};

export default ApplyToInsurance;
