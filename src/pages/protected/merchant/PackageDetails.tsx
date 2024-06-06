// import React from 'react'

import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";

type Props = {};

const PackageDetails = (_: Props) => {
  const dummy = [
    { title: "PACKAGE ID", details: "#DR20904045" },
    { title: "PACKAGE ID", details: "#DR20904045" },
    { title: "PACKAGE ID", details: "#DR20904045" },
    { title: "AVAILABILITY", details: "No scheduling" },
  ];

  const PackageInfo = (props: { title: string; details: string }) => (
    <div className="flex flex-col text-[#333333] text-xs gap-2">
      <h2 className=" font-[600]  uppercase">{props.title}</h2>

      <h3 className="font-[400] ">{props.details}</h3>
    </div>
  );

  return (
    <div className=" xl:w-[90%] mx-auto rounded-[20px] bg-white drop-shadow-md pb-[34px] text-[#333333]">
      <div className="border-b py-6 px-7 flex-center ">
        <MdKeyboardArrowLeft />
        <h2 className="pl-4 text-base font-[600]">Details</h2>

        <span className="ml-auto">
          <IoMdClose />
        </span>
      </div>

      <div className="px-9 space-y-[35px]">
        <div className="flex-center mt-[34px]">
          <CiCalendar />
          <span className="font-[400] text-sm pl-2">17-04-2024 2:33PM</span>
        </div>

        <div className="flex-center justify-between">
          {dummy.map((it, i) => (
            <PackageInfo {...it} key={i} />
          ))}
        </div>

        <div className="gap-2 flex flex-col">
          <h2 className="font-[600] uppercase text-sm">PACKAGE DESCRIPTION</h2>

          <div>
            <p className="text-sm font-[400]">
              Our Company offers Smart Home Energy Management services. We deal
              with all forms of Solar energy and smart home equipment. We have
              contributed to the success of building over 250 homes. We offer
            </p>

            <ul className="text-sm font-[400]  mt-1  list-disc ml-4">
              <li>Solar Energy Panels</li>
              <li>Smart Sound</li>
              <li>Smart doors</li>
            </ul>
          </div>
        </div>

        <div className="flex-center gap-[60px]">
          {dummy.map((it, i) => (
            <PackageInfo {...it} key={i} />
          ))}
        </div>

        <div className="gap-2 flex flex-col">
          <h2 className="font-[600] uppercase text-sm">ATTACHMENT</h2>

          <div className="flex-center gap-4">
            <img src="/assets/graphics/pkg-img-01.svg" alt="" />
            <img src="/assets/graphics/pkg-img-01.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
