import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { BsArrowUp, BsDatabase } from "react-icons/bs";
import { Button } from "@/components/ui";
import { cn } from "@/utils";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import CarbonCreditChart from "../../components/charts/CarbonCreditChart";

const CarbonCreditAccount = () => {
  const [eyeState, setEyeState] = useState(false);

  const [currentTab, setCurrentTab] = useState("history");

  const tabs = ["1M", "3M", "6M", "9M", "1Y", "All"];

  // const [startDate, setStartDate] = useState(new Date());

  const toggleEye = () => {
    setEyeState((prev) => !prev);
  };

  return (
    <div className="px-6">
      <p className="font-poppins text-2xl mt-10 text-blue-950">
        Carbon credit wallet
      </p>
      <div className="flex items-center gap-10 mt-10">
        <div>
          <h1 className="text-[15px] leading-[19.53px] font-medium font-poppins text-[#139EEC]">
            Wallet Number
          </h1>
          <span className="text-[#212121] leading-[19.53px] font-normal font-poppins text-[14px]">
            34572753638
          </span>
        </div>
        <div>
          <h1 className="text-[15px] leading-[19.53px] font-medium font-poppins text-[#139EEC]">
            Name
          </h1>
          <span className="text-[#212121] leading-[19.53px] font-normal font-poppins text-[14px]">
            Jeffery Cooper
          </span>
        </div>
      </div>

      <div className="mt-10 flex justify-between flex-wrap">
        <div className="w-[350px] border border-[#DEDEDE] rounded-lg p-6 px-4 mt-2 bg-blue-dark flex shadow-md">
          <div className="flex-1">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <BsDatabase
                    fill="white"
                    size={18}
                    color={"white"}
                    className="text-white"
                  />
                  <span className="text-base font-poppins text-white leading-[20.31px]">
                    Estimated Balance
                  </span>
                </div>
              </div>
              {eyeState ? (
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-2xl leading-[20px] font-poppins font-medium text-white">
                    320,780 tCO2e
                  </span>
                </div>
              ) : (
                <div className="text-2xl leading-5 flex items-center gap-2 mt-6">
                  <span className="text-white">**********</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-10">
              <p className="flex items-center">
                <BsArrowUp width={14} className="fill-green-500" />
                <span className="text-green-500 font-poppins text-sm">15%</span>
                <p className="text-white font-poppins font-extralight pl-2 text-sm ">
                  last month
                </p>
              </p>
              <img src="/assets/graphics/chart.svg" className="mt-4" />
            </div>
          </div>
          <div className="flex items-center pl-4">
            <button onClick={toggleEye} className="text-[#4C5563]">
              {eyeState ? (
                <FaEye size={20} fill="white" />
              ) : (
                <FaEyeSlash size={20} fill="white" />
              )}
            </button>
          </div>
        </div>
        <div className="w-[350px] border border-[#DEDEDE] rounded-lg p-6 px-4 mt-2 bg-transparent flex shadow-md">
          <div className="flex-1">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <BsDatabase fill="#8F6E4B" size={18} />
                  <span className="text-base font-poppins leading-[20.31px]">
                    Available Carbon Credit
                  </span>
                </div>
              </div>
              {eyeState ? (
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-2xl leading-[20px] font-poppins font-medium">
                    320,780 tCO2e
                  </span>
                </div>
              ) : (
                <div className="text-2xl leading-5 flex items-center gap-2 mt-6">
                  <span className="">**********</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center pl-4">
            <button onClick={toggleEye} className="text-[#4C5563]">
              {eyeState ? (
                <FaEye size={20} fill="white" />
              ) : (
                <FaEyeSlash size={20} fill="white" />
              )}
            </button>
          </div>
        </div>
        <div className="w-[350px] border border-[#DEDEDE] rounded-lg p-6 px-4 mt-2 bg-transparent flex shadow-md">
          <div className="flex-1">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <BsDatabase fill="#8F6E4B" size={18} />
                  <span className="text-base font-poppins leading-[20.31px]">
                    Ledger Balance
                  </span>
                </div>
              </div>
              {eyeState ? (
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-2xl text-m leading-[20px] font-poppins font-medium">
                    320,780 tCO2e
                  </span>
                </div>
              ) : (
                <div className="text-2xl leading-5 flex items-center gap-2 mt-6">
                  <span className="">**********</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center pl-4">
            <button onClick={toggleEye} className="text-[#4C5563]">
              {eyeState ? (
                <FaEye size={20} fill="white" />
              ) : (
                <FaEyeSlash size={20} fill="white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* <CarbonCreditChart /> */}
      <>
        <div className="mt-10 h-[250px] border rounded-lg p-4">
          <div className="flex gap-3 items-center">
            <h1 className="text-[16px] leading-[19.53px] font-medium font-poppins text-[#139EEC] px-2">
              Carbon Credit Overview
            </h1>
            <div className="flex justify-between flex-1">
              <Button
                variant={currentTab === "history" ? "default" : "outline"}
                onClick={() => setCurrentTab("history")}
                className={cn(
                  "font-poppins font-normal h-[31px] hover:bg-gray-100",
                  currentTab === "history" ? "text-white" : ""
                )}
              >
                History
              </Button>
              <div className="flex gap-x-2">
                {tabs.map((tab, i) => (
                  <Button
                    key={i}
                    variant={currentTab === tab ? "default" : "outline"}
                    onClick={() => setCurrentTab(tab)}
                    className={cn(
                      "font-poppins font-normal h-[31px] hover:bg-gray-100 px-2",
                      currentTab === tab ? "text-white" : ""
                    )}
                  >
                    {tab}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default CarbonCreditAccount;
