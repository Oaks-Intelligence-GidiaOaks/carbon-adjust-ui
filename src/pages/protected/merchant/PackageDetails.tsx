// import React from 'react'

import { MdKeyboardArrowLeft } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getPackageDetails,
  getPackageSchedules,
} from "@/services/merchantService";
import { Package } from "@/types/general";
import { formatDateString, formatNumberWithCommas } from "@/utils";
import ScheduleTabs from "@/components/merchants/ScheduleTabs";
import Questions from "@/components/merchants/Questions";
import { Button } from "@/components/ui";
import { TbClockQuestion } from "react-icons/tb";
import Loading from "@/components/reusables/Loading";
import { IoImageOutline } from "react-icons/io5";
import MediaViewer from "@/components/merchants/MediaViewer";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

type Props = {};

const PackageDetails = (_: Props) => {
  const navigate = useNavigate();
  const { packageId } = useParams<{ packageId: string }>();

  const packageDetails = useQuery({
    queryKey: ["package-details"],
    queryFn: () => getPackageDetails(packageId as string),
  });

  const packageSchedules = useQuery({
    queryKey: ["package-schedules"],
    queryFn: () => getPackageSchedules(packageId as string),
  });

  console.log(packageDetails.data?.data.package);
  console.log(packageSchedules.data?.data);

  const detail = [
    {
      title: "PACKAGE ID",
      details: (packageDetails.data?.data.package as Package)?._id ?? "",
    },
    {
      title: "SERVICES/PRODUCTS",
      details:
        (packageDetails.data?.data.package as Package)?.category.name ?? "",
    },
    {
      title: "COVERAGE REGION",
      details: (packageDetails.data?.data.package as Package)?.country ?? "",
    },
    {
      title: "AVAILABILITY",
      details: (packageDetails.data?.data.package as Package)?.hasSchedule
        ? "Scheduling available"
        : "No scheduling",
    },
  ];

  const detail2 = [
    {
      title: "PART PAYMENT",
      details: (packageDetails.data?.data.package as Package)?.allowPartPayment
        ? `Allowed ${
            (packageDetails.data?.data.package as Package)?.percentPayment
          }`
        : `Not Allowed`,
    },
    {
      title: "REQUEST FOR QUOTE",
      details: (packageDetails.data?.data.package as Package)?.askPurchaserQuote
        ? "Yes"
        : "No",
    },
    {
      title: "AMOUNT",
      details: (packageDetails.data?.data.package as Package)?.price
        ? `${
            (packageDetails.data?.data.package as Package)?.currency
          } ${formatNumberWithCommas(
            (packageDetails.data?.data.package as Package)?.price ?? "0"
          )}`
        : `${(packageDetails.data?.data.package as Package)?.currency} 0`,
    },
    {
      title: "DISCOUNT AVAILABLE",
      details: (packageDetails.data?.data.package as Package)?.discount
        ? `${(packageDetails.data?.data.package as Package)?.discount}%`
        : "Not available",
    },
  ];

  const PackageInfo = (props: { title: string; details: string }) => (
    <div className="flex flex-col text-[#333333] text-sm gap-2">
      <h2 className=" font-[600]  uppercase">{props.title}</h2>

      <h3 className="font-[400] ">{props.details}</h3>
    </div>
  );

  return (
    <>
      {(packageDetails.isLoading || packageSchedules.isLoading) && (
        <div className="mt-6">
          <Loading message="" />
        </div>
      )}
      {packageDetails.isSuccess && packageSchedules.isSuccess && (
        <div className=" xl:w-[90%] mx-auto rounded-[20px] border border-border/60 bg-white drop-shadow-md pb-[34px] text-[#333333]">
          <div className="border-b py-6 px-7 flex-center ">
            <Button
              variant={"ghost"}
              className="px-2"
              onClick={() => navigate("/merchant/packages")}
            >
              <MdKeyboardArrowLeft />
              <h2 className="pl-4 text-base font-[600]">Details</h2>
            </Button>

            {/* <span className="ml-auto">
          <IoMdClose />
        </span> */}
          </div>

          <div className="px-9 space-y-[35px]">
            <div className="flex-center mt-[34px]">
              <CiCalendar />
              <span className="font-[400]  pl-2">
                {formatDateString(
                  (packageDetails.data?.data.package as Package)?.createdAt ??
                    ""
                )}
              </span>
            </div>

            <div className="flex-center justify-between">
              {detail.map((it, i) => (
                <PackageInfo {...it} key={i} />
              ))}
            </div>

            <div className="gap-2 flex flex-col">
              <h2 className="font-[600] uppercase ">PACKAGE DESCRIPTION</h2>

              <div>
                <p className="text-gray-500 text-sm font-[400]">
                  {packageDetails.data?.data.package.description}
                </p>

                {/* <ul className=" font-[400]  mt-1  list-disc ml-4">
              <li>Solar Energy Panels</li>
              <li>Smart Sound</li>
              <li>Smart doors</li>
            </ul> */}
              </div>
            </div>

            <div className="flex-center gap-[60px]">
              {detail2.map((it, i) => (
                <PackageInfo {...it} key={i} />
              ))}
            </div>

            <div className="gap-2 flex flex-col">
              <h2 className="font-[600] uppercase ">ATTACHMENTS</h2>
              <div className="flex-center gap-4">
                {Boolean(
                  (packageDetails.data?.data.package as Package)?.attachments
                    .length
                ) ? (
                  (
                    packageDetails.data?.data.package as Package
                  )?.attachments.map((att, i) => (
                    <div className="relative w-[180px] h-[240px]">
                      <img
                        src={att}
                        alt="attachment"
                        key={i}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col justify-center gap-y-6 items-center w-full mb-4 bg-gray-50 rounded-xl py-4 border border-border">
                    <IoImageOutline className="size-20 text-gray-500" />
                    <p className="text-gray-500 ">
                      No attachments found in this package
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="gap-2 flex flex-col">
              <h2 className="font-[600] uppercase">PACKAGE QUESTIONS</h2>
              <p className="text-gray-500">
                These are the custom questions you created for this package.
              </p>
              <div className="mt-2">
                {Boolean(
                  (packageDetails.data?.data.package as Package)?.questions
                    .length
                ) && (
                  <Questions
                    questions={packageDetails.data?.data.package?.questions}
                  />
                )}
              </div>
            </div>

            <div className="gap-2 flex flex-col">
              <h2 className="font-[600] uppercase">Downloadable File</h2>
              <p className="text-gray-500">
                This is the file you uploaded while creating this package
              </p>
              <div className="mt-2">
                {Boolean(
                  (packageDetails.data?.data.package as Package).media.length
                ) ? (
                  <MediaViewer
                    media={(packageDetails.data?.data.package as Package).media}
                  />
                ) : (
                  <div className="flex flex-col justify-center gap-y-6 items-center w-full mb-4 bg-gray-50 rounded-xl py-4 border border-border">
                    <DocumentArrowDownIcon className="size-20 text-gray-500" />
                    <p className="text-gray-500">
                      No downloadable file available for this package
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="gap-2 flex flex-col">
              <h2 className="font-[600] uppercase">PACKAGE SCHEDULE</h2>
              <p className="text-gray-500">
                Available time slots you created for booking with clients.
              </p>
              <div className="mt-2">
                {Boolean(packageSchedules.data?.data.length) ? (
                  <ScheduleTabs schedules={packageSchedules.data?.data} />
                ) : (
                  <div className="flex flex-col justify-center gap-y-6 items-center w-full mb-4 bg-gray-50 rounded-xl py-4 border border-border">
                    <TbClockQuestion className="size-20 text-gray-500" />
                    <p className="text-gray-500">
                      No scheduling available or created for this package
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageDetails;
