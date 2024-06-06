import { FC } from "react";

import { CiCalendar } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";

const OrderDetails: FC = () => {
  const dummy = [
    { title: "NAME OF CUSTOMER", details: "John Murphy Doe" },
    { title: "PHONE NUMBER", details: "+44 7709 787489" },
    { title: "EMAIL ADDRESS", details: "johndoe92@gmail.com" },
  ];

  const pkgDummy = [
    { title: "PACKAGE ID", details: "#DR20904045" },
    { title: "ORDER ID", details: "#00001" },
    {
      title: "SERVICES/PRODUCTS",
      details: "Smart Home Energy Management System",
    },
    { title: "QUANTITY", details: "2" },
  ];

  const paymentDummy = [
    { title: "AMOUNT PAID", details: "$96 (5%)" },
    { title: "PAYMENT TYPE", details: "Part Payment" },
    {
      title: "AMOUNT TO BALANCE",
      details: "$36",
    },
    { title: "PAYMENT DATE", details: "25-06-24" },
    { title: "TRANSACTION REF", details: "#OO1FY70E" },
  ];

  const PackageInfo = (props: { title: string; details: string }) => (
    <div className="flex flex-col text-[#333333] text-xs gap-2">
      <h2 className=" font-[600] text-[#838383]  uppercase">{props.title}</h2>

      <h3 className="font-[400] ">{props.details}</h3>
    </div>
  );

  return (
    <div className=" xl:w-[90%] mx-auto rounded-[20px] bg-white drop-shadow-md pb-[34px] text-[#333333]">
      <div className="border-b py-6 px-7 flex-center ">
        <MdKeyboardArrowLeft />
        <h2 className="pl-4 text-base font-[600]">Order details</h2>

        <span className="ml-auto">
          <IoMdClose />
        </span>
      </div>

      <div className="px-9 space-y-[35px]">
        <div className="flex-center mt-[34px]">
          <CiCalendar />
          <span className="font-[400] text-sm pl-2">17-04-2024 2:33PM</span>

          <div className="text-[#15294B] ml-2 text-xs font-[500] bg-[#F2F2F2] p-1  px-2 rounded-xl flex-center">
            <GoDotFill />

            <span>Pending</span>
          </div>
        </div>

        <div className="flex flex-col gap-[32px]">
          <h2 className="font-[600]  text-base">Customer details</h2>
          <div className="flex-center gap-[32px]">
            {dummy.map((it, i) => (
              <PackageInfo {...it} key={i} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[32px]">
          <h2 className="font-[600]  text-base">Package details</h2>
          <div className="flex-center gap-[32px] justify-between">
            {pkgDummy.map((it, i) => (
              <PackageInfo {...it} key={i} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[22px]">
          <h2 className="font-[600]  text-base">Quote</h2>

          <div>
            <h3 className="text-[#838383] font-[400] text-sm">Sent 28-05-24</h3>

            <div className="h-[47px] mt-2 rounded-[8px] bg-[#FAFAFA] flex-center w-[220px] px-4">
              <FaRegFileAlt color="#0E89F7" />

              <span className="font-[400] text-sm ml-3">Quote.pdf</span>

              <MdOutlineFileDownload className="ml-auto" />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="flex flex-col gap-[32px]">
          <h2 className="font-[600]  text-base">Payment details</h2>
          <div className="flex-center gap-[32px] justify-between">
            {paymentDummy.map((it, i) => (
              <PackageInfo {...it} key={i} />
            ))}
          </div>
        </div>

        <div className="ml-auto w-fit gap-3 flex-center">
          <button
            className="text-[#F15046] h-[40px] w-[98px] border border-[#F15046] rounded-[12px]
            grid place-items-center"
          >
            <span>Reject</span>
          </button>

          <button
            className="text-white h-[40px]  px-3 blue-gradient hover:bg-gradient-to-t rounded-[12px]
            grid place-items-center"
          >
            <span>Process application</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
