import { IOrderActivity, IPackageOrder } from "@/interfaces/order.interface";
import { formatDate } from "@/lib/utils";
import { IComponentMap } from "@/types/general";
import { IoIosCheckmarkCircle } from "react-icons/io";

import { FaTimesCircle } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
// import toast from "react-hot-toast";

type AProps = {
  activities: IOrderActivity[];
};

const OrderCard = (props: IPackageOrder) => {
  // const cleanedUrl = props.aiOrderResponse?.replace(/^"|"$/g, "").trim();

  const cleanedUrl = props.aiOrderResponse
    ?.replace(/^"+|"+$/g, "") // Remove leading/trailing quotes
    .replace(/\\/g, "") // Remove backslashes
    .replace(/"/g, "");

  const ListTile = (props: { text: string; isBorder?: boolean }) => (
    <div
      className={`${
        props.isBorder && "border-l pl-[10px] border-[#4C5563]"
      } p-0 `}
    >
      <span className="text-xs p-0 font-[400] text-[#4C5563]">
        {props.text}
      </span>
    </div>
  );

  const ActivityItems = (aProps: AProps) => {
    return (
      <div className="text-xs flex-center gap-1 font-poppins">
        {aProps.activities.map((item) => (
          <div className="flex-center gap-2">
            <div className="flex-center gap-3">
              <span className="blue-gradient inline-block bg-clip-text text-transparent font-[600] text-xs">
                {item.activity}:
              </span>

              <span className={` ${getStatusText(item.status)}  truncate w-12`}>
                {item.status}
              </span>
            </div>

            {item.activity === "REQUEST_QUOTE" && item.response && (
              <a href={item.response}>
                <GoDownload color="#575757" size={18} />
              </a>
            )}
            <div className="px-[10px] text-[#4C5563]">|</div>
          </div>
        ))}
      </div>
    );
  };

  const getStatusBg = (status: string) => {
    const colors: any = {
      pending: "bg-[#FFA500]",
      processing: "bg-[#FFA500]",
      completed: "bg-[#4CAF50]",
      cancelled: "bg-[#F44336]",
    };

    return colors[status];
  };

  const getStatusText = (status: string) => {
    const colors: any = {
      pending: "text-[#FFA500]",
      completed: "text-[#4CAF50]",
      cancelled: "text-[#F44336]",
    };

    return colors[status];
  };

  const paymentStatusIcon = (status: string) => {
    const item: IComponentMap = {
      paid: <IoIosCheckmarkCircle color="#4CAF50" />,
      unpaid: <FaTimesCircle color="#F44336" />,
    };

    return item[status];
  };

  return (
    <div>
      <div className="flex flex-col text-sm">
        <div className="flex items-stretch gap-3  flex-col md:flex-row">
          <div className="flex items-stretch gap-2 ">
            <div className=" hidden md:px-4 bg-[#F3F5F7] w-[100px] h-[100px] md:grid place-items-center rounded-lg">
              <img
                src={
                  props.package?.attachments?.[0] ||
                  "/assets/graphics/user1.svg"
                }
                alt=""
                className="object-fit rounded-lg w-[100px] max-h-[100px]"
              />
            </div>

            {/*  */}
            <div className="flex flex-col justify-between pl-4">
              <h2 className="text-lg font-[600] font-poppins">
                {props?.package?.title}
              </h2>

              <div className="flex-center gap-[10px]">
                <ListTile
                  text={`Applied Date: ${formatDate(props?.createdAt)} `}
                  key={1}
                  isBorder={true}
                />

                <ListTile
                  text={`${props?.package?.title || ""}`}
                  key={1}
                  isBorder={true}
                />

                <ListTile
                  text={props?.package?.country}
                  key={1}
                  isBorder={true}
                />
              </div>

              <div className="flex-center gap-6">
                {/* <span className="text-xs font-[400] text-[#4C5563]">
                  4.7k Homes Retrofitted | 2022
                </span> */}

                {/* <div className="flex-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar size={13.94} key={i} color="#E99C1B" />
                  ))}
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[17px] md:w-auto ml-auto ">
            <h2 className="text-sm font-[600] ">{` ${
              props?.package?.currency ?? "£"
            } ${props.price}`}</h2>

            <button
              className={`${getStatusBg(
                props.status
              )}  font-dm-sans rounded-[26px] h-[22px] w-[97px] grid place-items-center text-white font-[400] text-xs`}
            >
              <span>{props?.status}</span>
            </button>
          </div>
        </div>

        <hr className="mt-[35px]" />

        <div className="hidden md:flex flex-center md:flex-center gap-[] py-3 font-dm-sans text-sm text-[#A5A5A5]">
          {/* stop here */}
          <ActivityItems activities={props.orderActivities} />

          {/* <div className="px-[10px] text-[#4C5563]">|</div> */}

          <div className="flex-center gap-2">
            <span className="font-[500] text-[#2B2A2A]">
              Payment: {props?.paymentStatus?.toUpperCase()}
            </span>

            {paymentStatusIcon(props?.paymentStatus)}

            <div>
              {/* downloadable icon */}
              {props.package?.media && props.package.media?.length > 0 && (
                <a target="__blank" href={props.package?.media?.[0]}>
                  <GoDownload color="#575757" size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="ml-auto w-fit flex-center gap-6">
            {props.adminReport?.length && (
              <a
                target="__blank"
                href={props.adminReport}
                rel="noopener noreferrer"
                className="flex-center gap-1 cursor-pointer p-1 rounded border bg-teal-50"
              >
                <span>
                  <GoDownload color="#4CAF50" size={18} />
                </span>

                <span className="text-gray-600">Download Report</span>
              </a>
            )}

            {cleanedUrl && cleanedUrl.length > 0 && (
              <a
                target="__blank"
                href={cleanedUrl}
                rel="noopener noreferrer"
                className="flex-center gap-1  cursor-pointer rounded border bg-teal-50 p-1"
              >
                <span>
                  <GoDownload color="#4CAF50" size={18} />
                </span>

                <span className="text-gray-600">Download AI Package</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
