// import DemandChart from "../../components/charts/DemandChart";
// import Filter from "../../components/reuseable/Filter";
// import YearDropDown from "../../components/reuseable/YearDropDown";
// import FinancialInstitutionGrid from "../../components/grid/FinancialInstitutionGrid";
// import pieChartPlaceholder from "../../assets/epc-rating.svg";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import FinancePackageCard from "@/components/ui/FinancePackageCard";
// import Card from "@/components/ui/Card";
// import HiaPackageCard from "@/components/ui/HiaPackageCard";
import TopHiaCard from "@/components/ui/TopHiaCard";
// import { ProgressBar } from "@/components/ui";
import {
  chartEPCRatings,
  // columns,
  // dummyHiaPackages,
  epcColors,
  // financeColumns,
  financeIcon,
  finImage1,
  finImage2,
  finImage3,
  finImage4,
  hiaIcon,
  image1,
  // image2,
  // image3,
  // image4,
  insuranceIcon,
  // insuranceOptions,
  // placeholderHIAPackages,
  subContractors,
  subContractorsIcon,
} from "@/constants";
import PackageCard from "@/components/reusables/PackageCard";
import { Finance } from "@/types/general";
// import { DataTable } from "@/components/tables/DataTable";
import { useEffect, useState } from "react";
import { EpcRatingChart } from "@/components/charts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { PiArrowUpRight } from "react-icons/pi";
import { FiChevronDown } from "react-icons/fi";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  cn,
  getLastFiveYears,
  // getCurrentMonthAbbreviation,
  // getLastFiveYears,
  // getLastTwelveMonths,
} from "@/utils";
import InsuranceCard from "@/components/reusables/InsuranceCard";
import SubContractorCard from "@/components/reusables/SubContractorCard";
// import { Dropdown } from "@/components/ui";
import {
  RetrofittingAnalyticsProps,
  VerticalBarChart,
} from "@/components/charts/VerticalBarChart";
import {
  DashboardDoughnutChart,
  TopActivityProps,
} from "@/components/charts/DashboardDoughnutChart";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Loading from "@/components/reusables/Loading";
import { Dropdown } from "@/components/ui";

const Dashboard = () => {
  const [yearSelector, setYearSelector] = useState({
    label: new Date().getFullYear(),
    value: new Date().getFullYear(),
  });

  const dashboardData = useQuery({
    queryKey: ["get-dashboard-data"],
    queryFn: () => axiosInstance.get(`/users/ho/home`),
  });
  const barChartData = useQuery({
    queryKey: ["get-barChart-data", yearSelector.value],
    queryFn: () =>
      axiosInstance.get(`/users/ho/home?year=${yearSelector.value}`),
  });

  console.log(dashboardData);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userData = useSelector((state: RootState) => state.user.user);

  const tab = searchParams.get("view");

  const [_, setCurrentTab] = useState(tab);

  // const [monthSelector, setMonthSelector] = useState({
  //   label: getCurrentMonthAbbreviation(),
  //   value: getCurrentMonthAbbreviation(),
  // });
  // const get_hia_packages = useQuery({
  //   queryKey: ["get_hia_packagess"],
  //   queryFn: () => axios.get("package/hia").then((res) => res.data),
  // });

  // const get_finance_packages = useQuery({
  //   queryKey: ["get_finance_packages"],
  //   queryFn: () => axios.get("package/finance").then((res) => res.data.data),
  // });

  // function getCurrentYear() {
  //   return new Date().getFullYear();
  // }

  console.log(dashboardData);

  const [__, setTableData] = useState<Finance[]>([]);

  async function getData(): Promise<Finance[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        logo: finImage1,
        name: "Bank of Carbon Credit",
        apr: "12%",
        loanTerm: "10 years",
        MaxLoanAmount: "£23,000",
      },
      {
        id: "728ed52f",
        logo: finImage4,
        name: "Citibank",
        apr: "12%",
        loanTerm: "10 years",
        MaxLoanAmount: "£23,000",
      },
      {
        id: "728ed52f",
        logo: finImage2,
        name: "Chase Bank",
        apr: "12%",
        loanTerm: "10 years",
        MaxLoanAmount: "£23,000",
      },
      {
        id: "728ed52f",
        logo: finImage3,
        name: "Berkshare Holdings",
        apr: "12%",
        loanTerm: "10 years",
        MaxLoanAmount: "£23,000",
      },
      // ...
    ];
  }

  const generateRoute = (tab: string) => {
    if (tab === "finance") return "/dashboard/finance";
    if (tab === "insurance") return "/dashboard/insurance";
    if (tab === "hia") return "/dashboard/hia";
    if (tab === "subcontractor") return "/dashboard/subcontractor";
    return "";
  };

  useEffect(() => {
    getData().then((data) => {
      setTableData(data);
    });
  }, []);

  return (
    <>
      {dashboardData.isLoading && (
        <div className="mt-20 mx-auto">
          <Loading message="" />
        </div>
      )}

      {dashboardData.isSuccess && (
        <div className="pt-6 px-0 sm:px-6  pb-20 bg-white min-h-screen">
          {/* New bar chart */}
          <div className="rounded-lg mb-6">
            <div className="flex justify-between flex-col min-[510px]:flex-row min-[1440px]:flex-row gap-6">
              <div className="flex-1 min-[510px]:flex-[0.6] w-[100%] min-[510px]:w-[60%] rounded-lg shadow-lg p-4 border border-grey-swatch-300">
                <div className="flex justify-between">
                  <div>
                    <p className="text-grey-swatch-90000 font-thin">Activity</p>
                    <p className="font-bold text-xl">Retrofitting Analytics</p>
                  </div>
                  <div className="flex gap-x-4">
                    <Dropdown
                      name="yearSelector"
                      wrapperClassName={"w-20 border border-gray-500 shadow-lg"}
                      value={yearSelector}
                      onOptionChange={(value) => setYearSelector(value)}
                      options={getLastFiveYears()}
                    />
                    {/* <Dropdown
                      name="monthSelector"
                      wrapperClassName={"w-20 border border-gray-500 shadow-lg"}
                      value={monthSelector}
                      onOptionChange={(value) => setMonthSelector(value)}
                      options={getLastTwelveMonths()}
                    /> */}
                  </div>
                </div>
                <div
                  style={{
                    height: "fit-content",
                    position: "relative",
                    marginBottom: "1%",
                    padding: "1%",
                  }}
                  className="mt-6 relative w-full"
                >
                  <VerticalBarChart
                    {...(barChartData.data?.data.data
                      .retrofitting_analytics as RetrofittingAnalyticsProps)}
                  />
                </div>
              </div>
              <div className="flex-1 min-[510px]:flex-[0.4] w-[100%] min-[510px]:w-[40%] rounded-lg shadow-lg p-4 border border-grey-swatch-300">
                <div>
                  <span className="font-bold text-lg">Top Activity </span>
                  <span className="text-grey-swatch-90000 font-thin text-sm">
                    last month
                  </span>
                </div>
                <div
                  style={{
                    height: "fit-content",
                    position: "relative",
                    marginBottom: "1%",
                    padding: "1%",
                  }}
                >
                  <DashboardDoughnutChart
                    {...(dashboardData.data?.data.data
                      .top_activity as TopActivityProps)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-auto overflow-scroll">
            <div className="w-0 overflow-visible">
              {/* categories section */}
              <div className="w-full min-w-[1080px]">
                <div className="h-[167px] flex flex-nowrap gap-x-6 rounded-lg border border-grey-swatch-300 mb-10">
                  {/* Finance */}
                  <div className="font-poppins p-5 pb-0 flex-1 relative after:absolute after:w-[1px] after:h-[80px] after:top-1/2 after:-translate-y-1/2 after:content('hello') after:right-0 after:bg-grey-swatch-400">
                    <p className="text-xs">Finance</p>
                    <div className="flex gap-8 items-center mt-4">
                      <div>
                        <p className="font-semibold text-4xl">
                          {dashboardData.data?.data.data.fin_packages.total}
                        </p>
                        <p className="text-xs">Total packages</p>
                      </div>
                      <div className="w-[47px] h-[41px] rounded-lg shadow-md flex justify-center items-center">
                        <img className="" src={financeIcon} />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-grey-swatch-600 opacity-0">
                      <PiArrowUpRight className="text-green-500 text-xs" />
                      <span className="text-[10px] inline-block ml-2">3%</span>
                      <span className="text-[10px] inline-block ml-2">
                        +12 packages this week
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        if (tab === "finance") {
                          setCurrentTab("");
                          navigate({
                            pathname: "./",
                          });
                        } else if (
                          tab === "" ||
                          tab === null ||
                          tab !== "finance"
                        ) {
                          navigate({
                            pathname: "",
                            search: createSearchParams({
                              view: "finance",
                            }).toString(),
                          });
                        }
                      }}
                      className={cn(
                        "cursor-pointer py-1 flex gap-x-2 mx-auto items-center justify-center h-[18px] mt-3 bg-[url('/assets/graphics/see-more-btn.svg')] bg-no-repeat bg-contain bg-center",
                        tab === "finance" &&
                          "bg-[url('/assets/graphics/see-more-btn-active.svg')]"
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs whitespace-nowrap",
                          tab === "finance" && "text-white"
                        )}
                      >
                        See more
                      </span>
                      <FiChevronDown
                        className={cn(
                          "text-base transition-all",
                          tab === "finance" &&
                            "text-white rotate-180 transition-all"
                        )}
                      />
                    </div>
                  </div>
                  {/* Insurance */}
                  <div className="font-poppins p-5 pb-0 flex-1 relative after:absolute after:w-[1px] after:h-[80px] after:top-1/2 after:-translate-y-1/2 after:content('hello') after:right-0 after:bg-grey-swatch-400">
                    <p className="text-xs">Insurance</p>
                    <div className="flex gap-8 items-center mt-4">
                      <div>
                        <p className="font-semibold text-4xl">
                          {dashboardData.data?.data.data.ins_packages.total}
                        </p>
                        <p className="text-xs">Total packages</p>
                      </div>
                      <div className="w-[47px] h-[41px] rounded-lg shadow-md flex justify-center items-center">
                        <img className="" src={insuranceIcon} />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-grey-swatch-600 opacity-0">
                      <PiArrowUpRight className="text-green-500 text-xs" />
                      <span className="text-[10px] inline-block ml-2">3%</span>
                      <span className="text-[10px] inline-block ml-2">
                        +12 packages this week
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        if (tab === "insurance") {
                          setCurrentTab("");
                          navigate({
                            pathname: "./",
                          });
                        } else if (
                          tab === "" ||
                          tab === null ||
                          tab !== "insurance"
                        ) {
                          navigate({
                            pathname: "",
                            search: createSearchParams({
                              view: "insurance",
                            }).toString(),
                          });
                        }
                      }}
                      className={cn(
                        "cursor-pointer py-1 flex gap-x-2 mx-auto items-center justify-center h-[18px] mt-3 bg-[url('/assets/graphics/see-more-btn.svg')] bg-no-repeat bg-contain bg-center",
                        tab === "insurance" &&
                          "bg-[url('/assets/graphics/see-more-btn-active.svg')]"
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs whitespace-nowrap",
                          tab === "insurance" && "text-white"
                        )}
                      >
                        See more
                      </span>
                      <FiChevronDown
                        className={cn(
                          "text-base transition-all",
                          tab === "insurance" &&
                            "text-white rotate-180 transition-all"
                        )}
                      />
                    </div>
                  </div>
                  {/* HIA */}
                  <div className="font-poppins p-5 pb-0 flex-1 relative after:absolute after:w-[1px] after:h-[80px] after:top-1/2 after:-translate-y-1/2 after:content('hello') after:right-0 after:bg-grey-swatch-400">
                    <p className="text-xs">Home Improvement Agency</p>
                    <div className="flex gap-8 items-center mt-4">
                      <div>
                        <p className="font-semibold text-4xl">
                          {dashboardData.data?.data.data.hia_packages.total}
                        </p>
                        <p className="text-xs">Total packages</p>
                      </div>
                      <div className="w-[47px] h-[41px] rounded-lg shadow-md flex justify-center items-center">
                        <img className="" src={hiaIcon} />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-grey-swatch-600 opacity-0">
                      <PiArrowUpRight className="text-green-500 text-xs" />
                      <span className="text-[10px] inline-block ml-2">3%</span>
                      <span className="text-[10px] inline-block ml-2">
                        +12 packages this week
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        if (tab === "hia") {
                          setCurrentTab("");
                          navigate({
                            pathname: "./",
                          });
                        } else if (
                          tab === "" ||
                          tab === null ||
                          tab !== "hia"
                        ) {
                          navigate({
                            pathname: "",
                            search: createSearchParams({
                              view: "hia",
                            }).toString(),
                          });
                        }
                      }}
                      className={cn(
                        "cursor-pointer py-1 flex gap-x-2 mx-auto items-center justify-center h-[18px] mt-3 bg-[url('/assets/graphics/see-more-btn.svg')] bg-no-repeat bg-contain bg-center",
                        tab === "hia" &&
                          "bg-[url('/assets/graphics/see-more-btn-active.svg')]"
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs whitespace-nowrap",
                          tab === "hia" && "text-white"
                        )}
                      >
                        See more
                      </span>
                      <FiChevronDown
                        className={cn(
                          "text-base transition-all",
                          tab === "hia" &&
                            "text-white rotate-180 transition-all"
                        )}
                      />
                    </div>
                  </div>
                  {/* Subcontractor */}
                  <div className="font-poppins p-5 pb-0 flex-1">
                    <p className="text-xs">Subcontractors</p>
                    <div className="flex gap-8 items-center mt-4">
                      <div>
                        <p className="font-semibold text-4xl">
                          {dashboardData.data?.data.data.total_subcontractors}
                        </p>
                        <p className="text-xs">Total subcontractors</p>
                      </div>
                      <div className="w-[47px] h-[41px] rounded-lg shadow-md flex justify-center items-center">
                        <img className="" src={subContractorsIcon} />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-grey-swatch-600 opacity-0">
                      <PiArrowUpRight className="text-green-500 text-xs" />
                      <span className="text-[10px] inline-block ml-2">3%</span>
                      <span className="text-[10px] inline-block ml-2">
                        +12 packages this week
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        if (tab === "subcontractor") {
                          setCurrentTab("");
                          navigate({
                            pathname: "./",
                          });
                        } else if (
                          tab === "" ||
                          tab === null ||
                          tab !== "subcontractor"
                        ) {
                          navigate({
                            pathname: "",
                            search: createSearchParams({
                              view: "subcontractor",
                            }).toString(),
                          });
                        }
                      }}
                      className={cn(
                        "cursor-pointer opacity-0 py-1 flex gap-x-2 mx-auto items-center justify-center h-[18px] mt-3 bg-[url('/assets/graphics/see-more-btn.svg')] bg-no-repeat bg-contain bg-center",
                        tab === "subcontractor" &&
                          "bg-[url('/assets/graphics/see-more-btn-active.svg')]"
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs whitespace-nowrap",
                          tab === "subcontractor" && "text-white"
                        )}
                      >
                        See more
                      </span>
                      <FiChevronDown
                        className={cn(
                          "text-base transition-all",
                          tab === "subcontractor" &&
                            "text-white rotate-180 transition-all"
                        )}
                      />
                    </div>
                  </div>
                </div>
                {tab === "finance" && (
                  <>
                    <div className="mt-6">
                      <div className="py-3">
                        <p className="text-lg font-medium font-poppins">
                          Recently created packages
                        </p>
                      </div>

                      <div className="flex items-center overflow-x-scroll gap-3 scrollbar-horizontal">
                        <div className="max-w-[50vw] flex gap-x-3">
                          {dashboardData.data?.data.data.fin_packages.recent.map(
                            (pkg: any) => (
                              <FinancePackageCard
                                isPlaceholder={false}
                                data={pkg}
                                home_owner
                                key={pkg._id}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {tab === "insurance" && (
                  <>
                    <div className="mt-6">
                      <div className="py-3">
                        <p className="text-lg font-medium font-poppins">
                          Recently created packages
                        </p>
                      </div>

                      <div className="flex items-center overflow-x-scroll gap-3 scrollbar-horizontal">
                        <div className="max-w-[50vw] flex gap-x-3">
                          {dashboardData.data?.data.data.ins_packages.recent.map(
                            (insurance: any, i: number) => (
                              <InsuranceCard
                                data={insurance as any}
                                isLive
                                key={i}
                                hideCheckBox={true}
                                // setShowSheet={setShowSheet}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {tab === "hia" && (
                  <>
                    <div className="mt-6">
                      <div className="py-3">
                        <p className="text-lg font-medium font-poppins">
                          Recently created packages
                        </p>
                      </div>

                      <div className="flex items-center overflow-x-scroll h-fit gap-3 scrollbar-horizontal">
                        <div className="max-w-[50vw] h-fit flex gap-x-3">
                          {/* {dummyHiaPackages.map((pkg: any) => (
              <HiaPackageCard data={pkg} key={pkg._id} />
            ))} */}
                          {dashboardData.data?.data.data.ins_packages.recent.map(
                            (hiaPackage: any, i: number) => (
                              <div key={i} className="min-w-[403px]">
                                <PackageCard
                                  data={hiaPackage}
                                  hideOverlay
                                  key={i}
                                  setShowSheet={() => {}}
                                  isSelected={false}
                                  type="hia"
                                  liveData
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {tab === "subcontractor" && (
                  <>
                    <div className="mt-6">
                      <div className="py-3">
                        <p className="text-lg font-medium font-poppins">
                          Recently added subcontractors
                        </p>
                      </div>

                      <div className="flex items-center overflow-x-scroll h-fit gap-3 scrollbar-horizontal">
                        <div className="max-w-[50vw] h-fit flex gap-x-3">
                          {/* {dummyHiaPackages.map((pkg: any) => (
              <HiaPackageCard data={pkg} key={pkg._id} />
            ))} */}
                          {subContractors.map((subcontractor, i) => (
                            <SubContractorCard
                              data={subcontractor}
                              key={i}
                              hideCheckbox
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {tab !== "" && tab !== null && (
                  <div className="w-full flex justify-end items-center opacity-0">
                    <Link
                      to={generateRoute(tab)}
                      className="font-poppins hover:text-ca-blue hover:underline text-sm mt-4"
                    >
                      See more
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col min-[1100px]:grid grid-cols-5 gap-y-6 mt-10">
            <div className="col-span-3 flex flex-col h-full">
              {/* <span className="text-[18px] flex-1 leading-[20px] font-medium font-poppins text-sub-header ">
            EPC Performance Rating
          </span> */}
              <div className="relative bg-white shadow-md shadow-blue-main/20 p-4 mt-4 rounded-xl flex flex-col min-[720px]:flex-row h-full">
                <img
                  src="/assets/graphics/epc-bg-left.svg"
                  className="absolute bottom-0 left-0"
                />
                <img
                  src="/assets/graphics/epc-bg-right.svg"
                  className="absolute bottom-0 right-0"
                />
                <div className="min-[720px]:w-[40%] pt-4 h-full font-poppins text-4xl font-medium">
                  <p className="text-center min-[720px]:text-left">
                    Your EPC Rating is{" "}
                    <span className="text-blue-main font-semibold text-5xl">
                      {userData?.epcRating}
                    </span>
                  </p>
                  <p className="relative text-xl font-normal mx-5 pt-6 min-[720px]:w-1/2 text-center min-[720px]:text-left">
                    How you compare to other users
                    <img
                      src="/assets/graphics/gold-arrow.svg"
                      alt="arrow"
                      className="absolute right-1/2 top-20 min-[720px]:top-1/2 min-[720px]:-right-12 rotate-90 min-[720px]:rotate-0"
                    />
                  </p>
                </div>
                <div className="flex-1 h-full flex justify-center items-center">
                  {/* Chart goes here */}
                  {/* <img
                src="/assets/graphics/epc-chart-placeholder.svg"
                className="block w-[200%]"
              /> */}
                  <div className="flex flex-col min-[816px]:flex-row mt-16 min-[720px]:mt-0">
                    <div className="flex-1 sm:flex-[0.7] flex flex-col items-center min-[770px]:flex-row justify-center bg-white">
                      <EpcRatingChart
                        chart={dashboardData.data?.data?.data?.epc.chart}
                      />
                    </div>
                    <div className="w-full flex items-end min-[816px]:w-[clamp(100px,10%,160px)]">
                      <div className="p-2 w-full flex flex-wrap justify-center gap-x-3 gap-y-2 flex-row min-[816px]:flex-col">
                        {Object.entries(epcColors).map((color, i) => (
                          <div
                            key={i}
                            className="flex gap-x-1 items-center h-fit"
                          >
                            <div
                              style={{ background: color[1] }}
                              className={`w-4 h-4 rounded-full flex items-center justify-center`}
                            >
                              <span className="text-sm text-white">
                                {color[0]}
                              </span>
                            </div>
                            <span className="text-sm text-main whitespace-nowrap">
                              {
                                chartEPCRatings[
                                  color[0] as keyof typeof chartEPCRatings
                                ]
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2 min-[1100px]:px-3">
              <div className="flex flex-col pt-2">
                <div className="flex items-center justify-between ">
                  <span className="text-[16px] leading-[20px] font-medium font-poppins text-sub-header">
                    Top Aggregators
                  </span>
                  <button className="text-[14px] opacity-0 leading-[12px] font-normal font-poppins text-main">
                    See More
                  </button>
                </div>

                <div className="p-2 h-full rounded-lg flex flex-col gap-[1px] mt-4 overflow-hidden bg-gray-100">
                  {dashboardData.data?.data?.data?.top_aggregators.length >
                  0 ? (
                    dashboardData.data?.data?.data?.top_aggregators.map(
                      (agg: any) => (
                        <TopHiaCard
                          name={agg.name}
                          image={image1}
                          retrofitCount="0"
                          className="rounded-t"
                        />
                      )
                    )
                  ) : (
                    <p className="px-2 py-8 text-center text-black-main font-poppins">
                      No Aggregator to display
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
