import React from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

type Props = {};

const DashboardBanner = (props: Props) => {
  return (
    <div
      style={{
        backgroundImage: "url('/assets/graphics/bannerImg2.svg')",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
      className="h-[80vh] grid place-items-center font-poppins"
    >
      <div className="lg:min-h-[406px] justify-around text-white flex items-stretch border py-[31px] bg-[#1C3D6D] bg-opacity-[0.85] rounded-[10px] mx-auto w-5/6 xl:gap-[60px] xl:justify-center">
        <div className="flex-[0.45] flex-col flex gap-y-[15px] my-auto ">
          <h2 className="font-[700] text-[20px] ">
            ARE YOU SPENDING TOO MUCH ON YOUR HOME ENERGY BILLS ?
          </h2>

          <h4 className="font-[400] text-[18px]">
            With our FREE energy health check tool, you can get a personalised
            energy cost (carbon-footprint) and compare that to look alike homes
            in your region.
          </h4>

          <button className="uppercase font-[700] text-base rounded-[24px] w-[194px] blue-gradient py-[14px]">
            See More
          </button>
        </div>

        <div className="flex-[0.45] grid place-items-center border-l border-[#A5A5A5] rounded-[10px] pl-[32px]">
          <div className="flex items-end">
            <img src="/assets/graphics/bannerImg.svg" alt="" />

            <div className="flex flex-col gap-1 pl-[5px]">
              <div className="flex-center text-[7px] font-[600]">
                <FaStar color="#E99C1B" />
                <FaStar color="#E99C1B" />
                <FaStar color="#E99C1B" />
                <FaStar color="#E99C1B" />
                <FaStar color="#575757" />
              </div>

              <h4>Skullcandy - Rail True Wireless Earbuds</h4>
              <h4>$79.99</h4>

              <button className="grid place-items-center w-[70px] h-[21px] text-[6px] rounded-[9px] blue-gradient">
                <span>Apply</span>
              </button>
            </div>
          </div>

          <div className="flex-center w-fit mx-auto gap-2">
            {/* dots */}
            <div className={`bg-[#3D3D3D] w-[8px] h-[8px] rounded-full`} />
            <div className={`bg-[#D9D9D9] w-[8px] h-[8px] rounded-full`} />
            <div className={`bg-[#3D3D3D] w-[8px] h-[8px] rounded-full`} />
          </div>

          <div className="hover:border-b hover:border-white">
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-center gap-[2.67px]"
            >
              <span className="text-[10px]">View more</span>
              <FaArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
