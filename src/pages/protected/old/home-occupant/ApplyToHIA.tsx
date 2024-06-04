import { Button, CountryRegionDropdown, Input } from "@/components/ui";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Country, State } from "country-state-city";
import { useState } from "react";
// import { BiEdit } from "react-icons/bi";
import Map from "@/components/reusables/Map";
// import {
//   image1,
//   image2,
//   image3,
//   image4,
//   // pendingApplications,
//   // placeholderHIAPackages,
//   // subContractors,
// } from "@/constants";
import PackageCard from "@/components/reusables/PackageCard";
// import TopHiaCard from "@/components/ui/TopHiaCard";
import FlyoutSidebar from "@/components/reusables/FlyoutSidebar";
import SubContractorCard from "@/components/reusables/SubContractorCard";
// import SelectedPackagesSummaryCard from "@/components/reusables/SelectedPackagesSummaryCard";
import { FaChevronRight } from "react-icons/fa";
import DialogComponent from "@/components/reusables/Dialog";
import { HIAApplicationSuccess } from "@/components/dialogs";
// import { HIAApplicationStatus } from "@/components/contextual";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
// import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { BsArrowLeft } from "react-icons/bs";
import {
  useIsFetching,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  applyToHIA,
  fetchHIAApps,
  fetchHIAPackages,
  getSingleHOApp,
} from "@/services/homeOccupant";
import Loading from "@/components/reusables/Loading";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { HIAAppMeta } from "@/types/hia";
import HIAApplicationCard from "@/components/reusables/HIAApplicationCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import axiosInstance from "@/api/axiosInstance";
import { LuRefreshCcw } from "react-icons/lu";
import { cn } from "@/utils";

type Props = {};

const ApplyToHIA = (_: Props) => {
  const queryClient = useQueryClient();
  let countryData = Country.getAllCountries();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userData = useSelector((state: RootState) => state.user.user);
  console.log(userData);

  const tab = searchParams.get("state");

  const [showSheet, setShowSheet] = useState(false);
  const [showSelectedPackagesSheet, setShowSelectedPackagesSheet] =
    useState(false);
  const [showApplicationSuccessDialog, setShowApplicationSuccessDialog] =
    useState(false);

  // const selectedPackages = [0, 1];

  const [addressFormState] = useState({
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
    retrofittingActivity: "",
  });

  const [details, setDetails] = useState({
    houseHoldIncome: "",
    otherIncome: "",
    houseHoldMonthlyExpenses: "",
    otherMonthlyExpense: "",
    noOfDependents: "",
  });

  const [selectedPackages] = useState([]);

  const [currentHIA, setCurrentHIA] = useState();

  const [packages, setPackages] = useState([]);

  const currentApplicationDetails = queryClient.getQueryData([
    "application-status",
  ]);
  const singleHOApp = useQuery({
    queryKey: ["fetch-single-HO-app-details", tab],
    queryFn: () =>
      getSingleHOApp((currentApplicationDetails as any)?.data?.data.appId),
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });

  const hiaMutation = useMutation({
    mutationKey: ["apply-to-hia"],
    mutationFn: (data) =>
      applyToHIA(data, (currentApplicationDetails as any)?.data?.data.appId),
    onSuccess: () => {
      toast.success("Application to HIA successful");
      setPackages([]);
      queryClient.invalidateQueries({
        // queryKey: ["fetch-single-HO-app-details", "application-status"],
        type: "all",
      });
      setShowSelectedPackagesSheet(false);
      setShowApplicationSuccessDialog(true);
    },
    onError: () => {
      toast.error("Error sending application to HIA");
    },
  });

  const HIAPackages = useQuery({
    queryKey: [
      "fetch-HIA-packages",
      (currentApplicationDetails as any)?.data?.data.appId,
      (currentApplicationDetails as any)?.data?.data.currentAppStage,
    ],
    queryFn: () =>
      fetchHIAPackages(
        (currentApplicationDetails as any)?.data?.data.appId,
        (currentApplicationDetails as any)?.data?.data.currentAppStage
      ),
    enabled: tab === "packages",
  });

  console.log(singleHOApp.data?.data.data);

  const HIAApplications = useQuery({
    queryKey: ["fetch-HIA-apps"],
    queryFn: () => fetchHIAApps(),
    enabled: tab === "pending-applications",
  });

  const cancelApplicationMutation = useMutation({
    mutationKey: ["cancel-application-at-insurance"],
    mutationFn: () => {
      return axiosInstance.patch(
        `applications/${
          (currentApplicationDetails as any)?.data?.data.appId
        }/ho/cancel`
      );
    },
    onSuccess: () => {
      toast.success("Application canceled successfully");
      queryClient.invalidateQueries({
        type: "all",
      });
      navigate("/dashboard/applications/hia-applications");
    },
    onError: () => {
      toast.error("Error canceling application");
    },
  });

  const isFetching = useIsFetching({
    queryKey: ["fetch-single-HO-app-details"],
  });

  console.log(HIAPackages.data?.data.data);
  console.log(HIAApplications.data?.data.data);

  const identifyAggregatorApplicationState = () => {
    switch (tab) {
      case "details":
        return (
          <div className="flex justify-center text-black-main bg-white/80 min-h-screen py-10 px-6">
            <div className="max-w-[706px] w-full">
              <div className="my-4 mb-10">
                <Button
                  variant={"ghost"}
                  className="flex items-center justify-center gap-x-2 px-0 font-poppins hover:bg-transparent hover:text-ca-blue"
                  onClick={() => {
                    navigate({
                      pathname: "",
                    });
                  }}
                >
                  <BsArrowLeft className="text-black-main" />
                  <span>Back</span>
                </Button>
              </div>
              <div className="flex justify-between items-center gap-x-4">
                <p className="font-semibold font-poppins text-xl">Details</p>
                {/* <Button
                  variant={"link"}
                  className="flex items-center gap-x-1 font-poppins font-normal text-black-main px-0"
                >
                  <span>Edit details</span>
                  <BiEdit />
                </Button> */}
              </div>

              <form className="mt-10">
                <div>
                  <Input
                    name="annualHouseHoldIncome"
                    label="What is your annual household Income?"
                    labelClassName="mb-4 font-poppins text-black-main"
                    inputClassName="bg-gray-100 font-poppins"
                    placeholder="Your annual household income"
                    type="number"
                    value={details.houseHoldIncome}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        houseHoldIncome: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mt-6">
                  <Input
                    name="otherIncome"
                    label="Other income (Spouse, additional employment, etc.)"
                    required
                    labelClassName="mb-4 font-poppins text-black-main"
                    inputClassName="bg-gray-100 font-poppins"
                    placeholder="Other income"
                    type="number"
                    value={details.otherIncome}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        otherIncome: e.target.value,
                      }))
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
                    placeholder="Household monthly expenses"
                    type="number"
                    value={details.houseHoldMonthlyExpenses}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        houseHoldMonthlyExpenses: e.target.value,
                      }))
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
                    type="number"
                    value={details.otherMonthlyExpense}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        otherMonthlyExpense: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mt-6">
                  <Input
                    name="numberOfDependents"
                    label="Number of dependents"
                    required
                    labelClassName="mb-4 font-poppins text-black-main"
                    inputClassName="bg-gray-100 font-poppins"
                    placeholder="Number of dependents"
                    type="number"
                    value={details.noOfDependents}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        noOfDependents: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mt-8">
                  <Button
                    onClick={() =>
                      navigate({
                        pathname: "",
                        search: createSearchParams({
                          state: "packages",
                        }).toString(),
                      })
                    }
                    className="w-full text-white font-poppins h-12"
                  >
                    Find
                  </Button>
                </div>
              </form>
            </div>
          </div>
        );
      case "packages":
        return HIAPackages.isLoading ? (
          <div className="mt-20">
            <Loading message="Finding packages" />
          </div>
        ) : (
          <>
            {/* Select Packages sub contractors Sheet */}
            <FlyoutSidebar isOpen={showSheet} onOpenChange={setShowSheet}>
              <div className="font-poppins relative">
                <div className="px-2 sm:px-6 min-h-screen">
                  <div>
                    <p className="font-semibold text-2xl text-black-main">
                      Choose Subcontractors
                    </p>
                    <p className="text-gray-500 mt-1">
                      Select from a list of sub contractors to continue
                    </p>
                  </div>
                  <div>
                    {(currentHIA !== null || currentHIA !== undefined) ?? (
                      <p className="font-medium text-green-600 mt-6">
                        {(
                          packages.find(
                            (p: any) =>
                              p.package !== (currentHIA as any).package
                          ) as any
                        )?.subcontractors?.length ?? 0}
                        /{(currentHIA as any)?.subcontractors.length}{" "}
                        {(currentHIA as any)?.subcontractors.length > 1
                          ? "Subcontractors"
                          : "Subcontractor"}{" "}
                        Selected
                      </p>
                    )}
                  </div>
                  <div className="mt-6 flex flex-col gap-y-4">
                    {(currentHIA as any)?.subcontractors.map(
                      (subcontractor: any, i: number) => (
                        <SubContractorCard
                          data={subcontractor}
                          hiaDetails={currentHIA}
                          packages={packages}
                          setPackages={setPackages}
                          key={i}
                          isLiveData={true}
                          setShowSheet={setShowSheet}
                        />
                      )
                    )}
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
            </FlyoutSidebar>

            {/* View Selected Packages Sheet */}
            <FlyoutSidebar
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
                      {packages.length} Package(s) selected
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col gap-y-4 min-h-screen">
                    {HIAPackages.data?.data.data
                      .filter((d: any) =>
                        packages.map((p: any) => p.package).includes(d._id)
                      )
                      .map((hiaPackage: any, i: number) => (
                        <>
                          <PackageCard
                            data={hiaPackage}
                            hideOverlay={true}
                            key={i}
                            setShowSheet={setShowSheet}
                            setCurrentHIA={setCurrentHIA}
                            isSelected={(selectedPackages as any).includes(i)}
                            type="hia"
                            liveData={true}
                          />
                        </>
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
                    disabled={hiaMutation.isPending}
                    onClick={
                      () => {
                        const payload = {
                          packages: packages,
                        };
                        hiaMutation.mutate(payload as any);
                      }
                      // navigate({
                      //   pathname: "",
                      //   search: createSearchParams({
                      //     state: "pending-applications",
                      //   }).toString(),
                      // })
                    }
                    className="text-white max-w-[192px] w-full min-w-[120px] gap-3"
                  >
                    {hiaMutation.isPending ? (
                      <Oval
                        visible={hiaMutation.isPending}
                        height="20"
                        width="20"
                        color="#ffffff"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    ) : (
                      <span>Apply now</span>
                    )}

                    <FaChevronRight />
                  </Button>
                </div>
              </div>
            </FlyoutSidebar>

            <div className="flex justify-between items-center gap-x-4 py-10 px-6">
              <p className="font-semibold font-poppins text-xl text-black-main">
                Available HIA Packages (HIAs)
              </p>
              {/* hide search input for now */}
              {/* <Input
                name="firstLineOfAddress"
                inputClassName="bg-white font-poppins h-10"
                wrapperClassName="max-w-[400px_!important] rounded-lg border border-black-main/70"
                placeholder="Search here"
                prependIcon={<BiSearch color="grey" size={18} />}
              /> */}
            </div>
            <div className="flex justify-center text-black-main bg-white/80 min-h-screen px-6">
              <div className="w-full flex justify-center gap-x-6">
                <div className="flex-[0.5] h-full">
                  <div className="flex justify-between items-center gap-x-5 flex-wrap">
                    <p className="font-poppins text-blue-main text-base">
                      {packages.length}/{HIAPackages.data?.data.data.length}{" "}
                      Packages selected
                    </p>
                    <Button
                      disabled={packages.length < 1}
                      onClick={() => setShowSelectedPackagesSheet(true)}
                      className="font-poppins text-white font-normal"
                    >
                      View selected Packages
                    </Button>
                  </div>
                  <div className="mt-6 flex flex-col gap-y-5">
                    {HIAPackages.data?.data.data.map(
                      (hiaPackage: any, i: number) => (
                        <>
                          <PackageCard
                            data={hiaPackage}
                            key={i}
                            setShowSheet={setShowSheet}
                            setCurrentHIA={setCurrentHIA}
                            isSelected={(
                              packages.map((p: any) => p.package) as any
                            ).includes(hiaPackage._id)}
                            type="hia"
                            liveData={true}
                          />
                        </>
                      )
                    )}
                    {HIAPackages.data?.data.data.length <= 0 && (
                      <p className="px-4 text-center mt-10 font-poppins">
                        No packages found.
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex-[0.5] h-full flex flex-col sticky top-0">
                  <div className="w-full h-3/5 max-h-[390px]">
                    <Map />
                  </div>

                  {/* <div className="flex flex-col pt-2 mt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[16px] leading-[20px] font-medium font-poppins text-sub-header">
                        Top Home Improvement Agencies
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
                  </div> */}
                </div>
              </div>
            </div>
          </>
        );
      case "pending-applications":
        return (
          <div className="flex justify-center text-black-main bg-gray-100 min-h-screen py-10 px-6">
            <div className="max-w-[885px] w-full">
              <div className="flex justify-between items-center gap-x-4">
                <p className="font-semibold font-poppins text-xl">
                  Application Status
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 flex-wrap mt-6">
                <Button
                  onClick={() => {
                    queryClient.invalidateQueries({
                      queryKey: ["fetch-HIA-packages"],
                    });
                    navigate("/dashboard/applications/hia?state=packages");
                  }}
                  variant={"outline"}
                  className="bg-gradient-to-r h-10 gap-x-2 from-[#139EEC] to-[#3465AF] border-0 rounded-xl"
                >
                  <span className="text-white font-poppins">Add new</span>
                  <div className="bg-[#17A5E6] size-6 rounded-full flex justify-center items-center">
                    <PlusIcon className="text-white size-5" />
                  </div>
                </Button>
                <div className="flex gap-x-3 items-center justify-between">
                  <Button
                    // disabled={useIsFetching({queryKey: ["application-status"]})}
                    variant="default"
                    // disabled
                    className="bg-white rounded-xl h-10 shadow px-8 flex gap-2 justify-center items-center font-poppins"
                    onClick={() =>
                      // navigate({
                      //   pathname: "",
                      //   search: createSearchParams({
                      //     state: "application-approved",
                      //   }).toString(),
                      // })
                      queryClient.invalidateQueries({
                        queryKey: ["fetch-single-HO-app-details"],
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
                  {/* HIA declines all application */}
                  {singleHOApp.data?.data.data.every(
                    (app: any) => app.currentStatus === "DECLINED"
                  ) && (
                    <Button
                      disabled={cancelApplicationMutation.isPending}
                      variant={"outline"}
                      className="border-red-500 rounded-xl"
                      onClick={() => cancelApplicationMutation.mutate()}
                    >
                      {cancelApplicationMutation.isPending ? (
                        <Oval
                          visible={cancelApplicationMutation.isPending}
                          height="20"
                          width="20"
                          color="#ffffff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        <span className="text-red-500 font-poppins">
                          Cancel Application
                        </span>
                      )}
                    </Button>
                  )}
                  {/* User rejected all offers */}
                  {singleHOApp.data?.data.data.every(
                    (app: any) => app.offerStatus === "REJECTED"
                  ) && (
                    <Button
                      disabled={cancelApplicationMutation.isPending}
                      variant={"outline"}
                      className="border-red-500 rounded-xl"
                      onClick={() => cancelApplicationMutation.mutate()}
                    >
                      {cancelApplicationMutation.isPending ? (
                        <Oval
                          visible={cancelApplicationMutation.isPending}
                          height="20"
                          width="20"
                          color="#ffffff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        <span className="text-red-500 font-poppins">
                          Cancel Application
                        </span>
                      )}
                    </Button>
                  )}
                  {/* User has no application to proceed probably because all applications or offers have been declined or rejected respectively */}
                  {/* {singleHOApp.data?.data.data.some(
                    (app: any) => app.offerStatus !== "ISSUED"
                  ) && (
                    <Button
                      disabled={cancelApplicationMutation.isPending}
                      variant={"outline"}
                      className="border-red-500 rounded-xl"
                      onClick={() => cancelApplicationMutation.mutate()}
                    >
                      {cancelApplicationMutation.isPending ? (
                        <Oval
                          visible={cancelApplicationMutation.isPending}
                          height="20"
                          width="20"
                          color="#ffffff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        <span className="text-red-500 font-poppins">
                          Cancel Application
                        </span>
                      )}
                    </Button>
                  )} */}
                </div>
              </div>

              {/* {console.log("Error here: ", singleHOApp.data)} */}
              <div className="flex flex-col gap-y-6 mt-8">
                {/* HIA applications status loading */}
                {singleHOApp.isLoading &&
                  ((app: any) => app.currentStatus === "DECLINED") && (
                    <div className="pt-10 flex justify-center items-center">
                      <Loading message="Fetching HIA applications status" />
                    </div>
                  )}
                {/* HIA applications status successfully loaded */}
                {singleHOApp.isSuccess &&
                  singleHOApp?.data?.data?.data?.map(
                    (data: HIAAppMeta, i: number) => (
                      <HIAApplicationCard data={data} key={i} />
                    )
                  )}
              </div>
            </div>
          </div>
        );
      default:
        return singleHOApp.isLoading ? (
          <div className="mt-20">
            <Loading message="Fetching Application details" />
          </div>
        ) : (
          <div className="flex justify-center text-black-main bg-white/80 min-h-screen py-10 px-6">
            <div className="max-w-[706px] w-full">
              <div className="flex justify-between items-center gap-x-4">
                <p className="font-semibold font-poppins text-xl">Details</p>
                {/* <Button
                  variant={"link"}
                  className="flex items-center gap-x-1 font-poppins font-normal text-black-main px-0"
                >
                  <span>Edit details</span>
                  <BiEdit />
                </Button> */}
              </div>

              <form className="mt-10">
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
                    label="Select country of residence"
                    wrapperClassName="bg-gray-100 w-full font-poppins"
                    placeholder="Select country"
                    disabled
                    value={{
                      label: singleHOApp.data?.data.data.address.country,
                      value: singleHOApp.data?.data.data.address.country,
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
                    label=" Select city/state/province"
                    wrapperClassName="bg-gray-100 w-full font-poppins"
                    placeholder="Select city/state/province"
                    disabled
                    value={{
                      label: singleHOApp.data?.data.data.address.cityOrProvince,
                      value: singleHOApp.data?.data.data.address.cityOrProvince,
                    }}
                  />
                </div>
                <div className="mt-6">
                  <Input
                    name="firstLineOfAddress"
                    label="First line of home address"
                    labelClassName="mb-4 font-poppins text-black-main"
                    inputClassName="bg-gray-100 font-poppins"
                    placeholder="Enter address"
                    readOnly
                    value={singleHOApp.data?.data.data.address.firstLineAddress}
                  />
                </div>
                <div className="mt-6">
                  <Input
                    name="postCode/zipCode"
                    label="Post code (home address)"
                    required
                    labelClassName="mb-4 font-poppins text-black-main"
                    inputClassName="bg-gray-100 font-poppins"
                    placeholder="Enter post/zip code"
                    readOnly
                    value={singleHOApp.data?.data.data.address.zipcode}
                  />
                </div>
                <div className="mt-8">
                  <Button
                    onClick={() =>
                      navigate({
                        pathname: "",
                        search: createSearchParams({
                          state: "packages",
                        }).toString(),
                      })
                    }
                    className="w-full text-white font-poppins h-12"
                  >
                    Proceed
                  </Button>
                </div>
              </form>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-fixed bg-contain bg-bottom bg-[url(/assets/graphics/applications-bg.svg)] bg-opacity-20">
      <DialogComponent
        isOpen={showApplicationSuccessDialog}
        onOpenChange={() =>
          navigate("/dashboard/applications/hia-applications")
        }
      >
        <HIAApplicationSuccess
          setShowApplicationSuccessDialog={setShowApplicationSuccessDialog}
        />
      </DialogComponent>

      {identifyAggregatorApplicationState()}
    </div>
  );
};

export default ApplyToHIA;
