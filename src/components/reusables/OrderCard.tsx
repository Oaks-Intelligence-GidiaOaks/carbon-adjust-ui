import { IOrderActivity, IPackageOrder } from "@/interfaces/order.interface";
import { formatDate } from "@/lib/utils";
import { IComponentMap } from "@/types/general";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useState } from "react";

import { FaTimesCircle } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import AddReviewModal from "./AddReview";
import AcceptGrantModal from "./AcceptGrant";
import RejectGrantModal from "./RejectGrant";
import toast from "react-hot-toast";
import { Dot } from "lucide-react";

type AProps = {
  activities: IOrderActivity[];
};

const OrderCard = (props: IPackageOrder) => {
  // const cleanedUrl = props.aiOrderResponse?.replace(/^"|"$/g, "").trim();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      <span className="text-[15px] p-0 font-[400] text-[#4C5563]">
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

  const [isAcceptModalOpen, setAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);

  const handleOpenModal = () => {
    setAcceptModalOpen(true);
  };

  const handleCloseModal = () => {
    setAcceptModalOpen(false);
  };

  const handleAccept = () => {
    // Logic to handle successful grant acceptance, like updating UI or data
    console.log("Grant accepted successfully");
  };

  const handleOpenRejectModal = () => {
    setRejectModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setRejectModalOpen(false);
  };

  const handleReject = () => {
    // Perform any additional reject logic here (e.g., API call)
  };

  const renderGrantButtons = () => {
    const isGrantPackage = props?.domain === "Grant_Package";

    // If it's a grant package, render the buttons
    if (isGrantPackage) {
      if (props?.grantStatus === "approved") {
        return (
          <div className="flex gap-3 flex-col justify-end items-end">
            <span className="bg-[#ECFDF3] pr-3 rounded-2xl font-poppins text-[#027A48] w-fit text-sm flex items-center justify-center">
              {" "}
              <Dot className="size-7" /> Approved
            </span>
            <button
              onClick={handleOpenModal}
              className="px-4 py-2 bg-[#257FCA] text-white rounded-2xl hover:bg-blue-700"
            >
              Accept Grant
            </button>
            <button
              onClick={handleOpenRejectModal}
              className="px-4 py-2 border-2 border-[#EC2222] text-[#EC2222] rounded-2xl"
            >
              Reject Grant
            </button>
            <AcceptGrantModal
              isOpen={isAcceptModalOpen}
              onClose={handleCloseModal}
              onAccept={handleAccept}
              applicationId={props._id}
            />
            <RejectGrantModal
              isOpen={isRejectModalOpen}
              onClose={handleCloseRejectModal}
              onReject={handleReject}
              applicationId={props._id}
            />
          </div>
        );
      } else if (props?.grantStatus === "accepted") {
        return (
          <div className="flex gap-3 flex-col justify-end items-end">
            <span className="bg-[#ECFDF3] pr-3 rounded-2xl font-poppins text-[#027A48] w-fit text-sm flex items-center justify-center">
              {" "}
              <Dot className="size-7" /> Approved
            </span>
            <button className="px-4 py-2 bg-[#257FCA] text-white rounded-2xl">
              Proceed to Marketplace
            </button>
          </div>
        );
      } else if (props?.grantStatus === "applied") {
        return (
          <div className="flex gap-3 flex-col justify-end items-end">
            <span className="">
              {props?.package?.currency}
              {props?.price}
            </span>
            <button
              onClick={() => {
                // Logic to cancel the application
                console.log("Application cancelled");
              }}
              className="px-4 py-2 bg-[#257FCA] text-white rounded-2xl"
            >
              Cancel
            </button>
          </div>
        );
      } else if (props?.grantStatus === "rejected") {
        return (
          <div className="flex gap-3 flex-col justify-end items-end">
            <span className="bg-[#FFE7E7] pr-3 rounded-2xl font-poppins text-[#EC2222] w-fit flex items-center justify-center">
              {" "}
              <Dot className="size-7" /> Rejected
            </span>
            <button
              onClick={() => {
                // Logic to reapply for the grant
                console.log("Reapplication initiated");
              }}
              className="px-4 py-2 bg-[#257FCA] text-white rounded-2xl"
            >
              Reapply
            </button>
          </div>
        );
      } else if (props?.grantStatus === "declined") {
        return (
          <div className="flex gap-3 flex-col justify-end items-end">
            <span className="bg-[#FFE7E7] pr-3 rounded-2xl font-poppins text-[#EC2222] w-fit flex items-center justify-center">
              {" "}
              <Dot className="size-7" /> Declined
            </span>
          </div>
        );
      }
    }

    return null;
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
              <h2 className="text-xl font-[600] font-poppins">
                {props?.package?.title}
              </h2>

              <div className="flex-center gap-[10px]">
                {/* Grant Package rendering */}
                {props?.domain === "Grant_Package" ? (
                  <>
                    <ListTile
                      text={`Applied Date: ${formatDate(props?.createdAt)} `}
                      key={1}
                      isBorder={true}
                    />

                    <ListTile
                      text={`${props?.package?.title || ""} (${
                        props?.package?.currency}${props?.package?.minAmount || "N/A"
                      } - ${props?.package?.currency}${props?.package?.maxAmount || "N/A"})`}
                      key={2}
                      isBorder={true}
                    />

                    <ListTile
                      text={props?.package?.country}
                      key={3}
                      isBorder={true}
                    />
                  </>
                ) : (
                  /* Non-Grant Package rendering */
                  <>
                    <ListTile
                      text={`Applied Date: ${formatDate(props?.createdAt)} `}
                      key={1}
                      isBorder={true}
                    />

                    <ListTile
                      text={`${props?.package?.title || ""}`}
                      key={2}
                      isBorder={true}
                    />

                    <ListTile
                      text={props?.package?.country}
                      key={3}
                      isBorder={true}
                    />
                  </>
                )}
              </div>


              <button
                onClick={openModal}
                className=" text-blue-400 text-[10px] text-start cursor-pointer"
              >
                Review service
              </button>
              <AddReviewModal
                isOpen={isModalOpen}
                onClose={closeModal}
                packageId={props?.package?._id}
                image={
                  props.package?.attachments?.[0] ||
                  "/assets/graphics/user1.svg"
                }
              />

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
            {props?.domain === "Grant_Package" ? (
              // Render grant-specific buttons
              renderGrantButtons()
            ) : (
              // Default button for non-grant packages
              <div className="flex flex-col gap-3">
                <h2 className="text-base font-[600] ">{` ${
                  props?.package?.currency ?? "£"
                } ${props.price}`}</h2>

                <button
                  className={`${getStatusBg(
                    props.status
                  )}  font-dm-sans px-4 py-2 rounded-2xl grid place-items-center text-white font-[400] text-xs`}
                >
                  <span>{props?.status}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <hr className="mt-[35px]" />

        <div className="hidden md:flex flex-center md:flex-center gap-[] py-3 font-dm-sans text-sm text-[#A5A5A5]">
  {/* Check if the package is a grant package */}
  {props?.domain === "Grant_Package" ? (
    <>
      {/* Grant Package Logic */}
      {props?.grantStatus === "approved" && (
        <div className="flex flex-col gap-3">
          <ActivityItems activities={props.orderActivities} />

          <div className="flex-center gap-2">
            <span className="font-[500] text-[blue]">Approved Grant: {props?.approvedGrant}</span>
            <span className="font-[500] text-[#2B2A2A]">Approved Date: {formatDate(props?.updatedAt)}</span>

            {props.hasContractDoc === true && (
              <a target="__blank" href={props.grantContractDoc}>
                <GoDownload color="#575757" size={18} />
              </a>
            )}
          </div>
        </div>
      )}

      {props?.grantStatus === "declined" && (
        <div className="flex flex-col gap-3">
          <ActivityItems activities={props.orderActivities} />

          <div className="flex-center gap-2">
            <span className="font-[500] text-[#2B2A2A]">Declined Date: {formatDate(props?.updatedAt)}</span>

            {props.hasContractDoc === true && (
              <a target="__blank" href={props.grantContractDoc}>
                <GoDownload color="#575757" size={18} />
              </a>
            )}
          </div>
        </div>
      )}

      {props?.grantStatus === "rejected" && (
        <div className="flex flex-col gap-3">
          <ActivityItems activities={props.orderActivities} />

          <div className="flex-center gap-2">
            <span className="font-[500] text-[#2B2A2A]">Rejected Date: {formatDate(props?.updatedAt)}</span>

            {props.hasContractDoc === true && (
              <a target="__blank" href={props.grantContractDoc}>
                <GoDownload color="#575757" size={18} />
              </a>
            )}
          </div>
        </div>
      )}

      {props?.grantStatus === "applied" && (
        <div className="flex flex-col gap-3">
          <ActivityItems activities={props.orderActivities} />

          <div className="flex-center gap-2">
            <span className="font-[500] text-[#2B2A2A]">Scheduled Date: {''}</span>
            <span className="font-[500] text-[#2B2A2A]">Call: {''}</span>
            <span className="font-[500] text-[#2B2A2A]">Payment Status: {props?.paymentStatus?.toUpperCase()}</span>

            {paymentStatusIcon(props?.paymentStatus)}

            {props.hasContractDoc === true && (
              <a target="__blank" href={props.grantContractDoc}>
                <GoDownload color="#575757" size={18} />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  ) : (
    <>
      {/* Non-Grant Package Logic */}
      <ActivityItems activities={props.orderActivities} />

      <div className="flex-center gap-2">
        <span className="font-[500] text-[#2B2A2A]">Payment: {props?.paymentStatus?.toUpperCase()}</span>

        {paymentStatusIcon(props?.paymentStatus)}

        {props.hasContractDoc === true && (
              <a target="__blank" href={props.grantContractDoc}>
                <GoDownload color="#575757" size={18} />
              </a>
            )}
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
    </>
  )}
</div>

      </div>
    </div>
  );
};

export default OrderCard;
