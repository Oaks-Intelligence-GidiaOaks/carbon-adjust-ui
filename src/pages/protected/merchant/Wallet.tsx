import { FC, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { BsArrowUp, BsDatabase } from "react-icons/bs";

// import { useSelector } from "react-redux";
// import { RootState } from "@/app/store";

const Wallet: FC = () => {
  const [eyeState, setEyeState] = useState(false);

  const toggleEye = () => {
    setEyeState((prev) => !prev);
  };

  // const userData = useSelector((state: RootState) => state.user.user);

  return (
    <div className="px-6">
      <p className="font-poppins text-2xl mt-10 text-blue-950">Wallet</p>
      <div className="flex items-center gap-10 mt-2">
        <h2 className="text-[#212121] leading-[19.53px] font-normal font-poppins text-[14px]">
          Manage your payments and transactions
        </h2>
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
                    0 tCO2e
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
                    0 tCO2e
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
                    0 tCO2e
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
    </div>
  );
};

export default Wallet;
