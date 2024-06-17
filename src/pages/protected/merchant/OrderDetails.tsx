import { FC, useState } from "react";

import { CiCalendar } from "react-icons/ci";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import ProcessApplicationModal from "@/components/reusables/ProcessApplicationModal";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "@/services/merchantService";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui";
import { cn, formatDateString } from "@/utils";
import { Order } from "@/types/general";
import Responses from "@/components/merchants/Responses";

const OrderDetails: FC = () => {
  const navigate = useNavigate();
  const [showActivities, setShowActivities] = useState(false);
  const { orderId } = useParams<{ orderId: string }>();

  const orderDetails = useQuery({
    queryKey: ["order-details"],
    queryFn: () => getOrderDetails(orderId as string),
  });

  console.log(orderDetails);

  const dummy = [
    {
      title: "NAME OF CUSTOMER",
      details:
        (orderDetails.data?.data.order as Order)?.customer?.name ?? "N/A",
    },
    {
      title: "PHONE NUMBER",
      details: (orderDetails.data?.data.order as Order)?.customerPhone ?? "N/A",
    },
    {
      title: "EMAIL ADDRESS",
      details: (orderDetails.data?.data.order as Order)?.customerEmail ?? "N/A",
    },
  ];

  const pkgDummy = [
    {
      title: "PACKAGE ID",
      details: (orderDetails.data?.data.order as Order)?.package._id ?? "N/A",
    },
    {
      title: "ORDER ID",
      details: (orderDetails.data?.data.order as Order)?._id ?? "N/A",
    },
    {
      title: "SERVICES/PRODUCTS",
      details:
        (orderDetails.data?.data.order as Order)?.package.category ?? "N/A",
    },
    {
      title: "QUANTITY",
      details:
        (orderDetails.data?.data.order as Order)?.quantity.toString() ?? "N/A",
    },
  ];

  const paymentDummy = [
    {
      title: "AMOUNT PAID",
      details: `£${(orderDetails.data?.data.order as Order)?.price}` ?? "N/A",
    },
    {
      title: "PAYMENT STATUS",
      details: (orderDetails.data?.data.order as Order)?.paymentStatus ?? "N/A",
    },
    // {
    //   title: "AMOUNT TO BALANCE",
    //   details: (orderDetails.data?.data.order as Order)?.package ?? "N/A",
    // },
    {
      title: "PAYMENT DATE",
      details: formatDateString(
        (orderDetails.data?.data.order as Order)?.createdAt ?? ""
      ),
    },
    {
      title: "TRANSACTION REF",
      details: (orderDetails.data?.data.order as Order)?._id,
    },
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
        <Button
          variant={"ghost"}
          className="px-2"
          onClick={() => navigate("/merchant/applications")}
        >
          <MdKeyboardArrowLeft />
          <h2 className="pl-4 text-base font-[600]">Details</h2>
        </Button>
      </div>

      <div className="px-9 space-y-[35px]">
        <div className="flex-center mt-[34px]">
          <CiCalendar />
          <span className="font-[400] text-sm pl-2">
            {formatDateString(
              (orderDetails.data?.data.order as Order)?.createdAt ?? ""
            )}
          </span>

          <div
            className={cn(
              "text-[#15294B] ml-2 text-xs font-[500] p-1  px-2 rounded-xl flex-center",
              (orderDetails.data?.data.order as Order)?.status === "pending" &&
                "bg-[#F2F2F2]",
              (orderDetails.data?.data.order as Order)?.status ===
                "cancelled" && "bg-red-100",
              (orderDetails.data?.data.order as Order)?.status ===
                "completed" && "bg-green-100"
            )}
          >
            <GoDotFill />

            <span
              className={cn(
                (orderDetails.data?.data.order as Order)?.status ===
                  "pending" && "text-black-main",
                (orderDetails.data?.data.order as Order)?.status ===
                  "cancelled" && "text-red-500",
                (orderDetails.data?.data.order as Order)?.status ===
                  "completed" && "text-green-500"
              )}
            >
              Pending
            </span>
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

        {(orderDetails.data?.data.order as Order)?.responses.length && (
          <div className="gap-2 flex flex-col">
            <h2 className="font-[600] uppercase">Order Responses</h2>
            <p className="text-gray-500">
              These are the responses for the questions you created for this
              package.
            </p>
            <div className="mt-2">
              {Boolean(
                (orderDetails.data?.data.order as Order)?.responses.length
              ) && (
                <Responses
                  responses={
                    (orderDetails.data?.data.order as Order)?.responses
                  }
                />
              )}
            </div>
          </div>
        )}

        <div className="ml-auto w-fit gap-3 flex-center">
          <button
            className="text-ca-green h-[40px] w-fit px-3 border border-ca-green rounded-[12px]
            grid place-items-center"
          >
            <span>Complete Application</span>
          </button>

          <button
            className="text-white h-[40px]  px-3 blue-gradient hover:bg-gradient-to-t rounded-[12px]
            grid place-items-center"
            onClick={() => setShowActivities(true)}
          >
            <span>View Activities</span>
          </button>
        </div>
      </div>

      {showActivities && (
        <ProcessApplicationModal
          setShowActivities={setShowActivities}
          order={orderDetails.data?.data.order as Order}
        />
      )}
    </div>
  );
};

export default OrderDetails;
