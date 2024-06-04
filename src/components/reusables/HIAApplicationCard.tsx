import { image4 } from "@/constants";
import { HIAAppMeta } from "@/types/hia";
import { Button } from "../ui";
import { BiChevronRight, BiDownload, BiX } from "react-icons/bi";
import { HIAApplicationStatus } from "../contextual";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { cn, downloadFile } from "@/utils";

type Props = {
  data: HIAAppMeta;
};

const HIAApplicationCard = ({ data }: Props) => {
  const queryClient = useQueryClient();

  const currentApplicationDetails = queryClient.getQueryData([
    "application-status",
  ]);

  const navigate = useNavigate();

  const rejectOfferMutation = useMutation({
    mutationKey: ["reject-hia-offer"],
    mutationFn: (data: {
      packageId: string;
      offerId: string;
      status: boolean;
    }) => {
      return axiosInstance.patch(
        `applications/${
          (currentApplicationDetails as any)?.data?.data.appId
        }/ho/offer/review`,
        data
      );
    },
    onSuccess: () => {
      toast.success("Offer rejected successfully");
      queryClient.invalidateQueries({});
    },
    onError: () => {
      toast.error("Error rejecting offer");
    },
  });

  console.log(data);

  const acceptOfferMutation = useMutation({
    mutationKey: ["accept-hia-offer"],
    mutationFn: (data: {
      packageId: string;
      offerId: string;
      status: boolean;
    }) => {
      return axiosInstance.patch(
        `applications/${
          (currentApplicationDetails as any)?.data?.data.appId
        }/ho/offer/review`,
        data
      );
    },
    onSuccess: () => {
      toast.success("Offer accepted successfully");
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("Error accepting offer");
    },
  });

  const finishApplicationMutation = useMutation({
    mutationKey: ["complete-application-at-hia"],
    mutationFn: () => {
      return axiosInstance.patch(
        `applications/${
          (currentApplicationDetails as any)?.data?.data.appId
        }/ho/fulfil`
      );
    },
    onSuccess: () => {
      toast.success("Application completed successfully");
      queryClient.invalidateQueries();
      navigate("/dashboard/applications/hia-applications");
    },
    onError: () => {
      toast.error("Error completingApplication offer");
    },
  });

  const handleDownload = () => {
    if (data?.offerId && data.currentStatus === "APPROVED") {
      const file = data.media.filter(
        (file) => file.fileType === "HIA_OFFER_TO_HO"
      )[0];
      console.log(file);
      const fileUrl = file.url;
      const fileName = file.fileType;
      downloadFile(fileUrl, fileName);
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl px-10 py-6",
        data.currentStatus === "DISABLED" && "grayscale",
        data.offerStatus === "REJECTED" && "grayscale opacity-50"
      )}
    >
      <p className="font-sans text-sm text-[#FF8D31]">
        Application ID: {data.appId}
      </p>
      <div className="flex justify-between flex-wrap gap-4 mt-3">
        <div className="flex gap-2">
          <div className="size-8">
            <img src={image4} className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <div className="flex justify-between flex-1 items-center">
                <p className="font-poppins text-black text-lg brightness-0">
                  {data.hia.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <div className="flex gap-2 flex-wrap items-center">
                <p className="text-sm text-blue-main py-1 font-sans rounded">
                  {data.address.country}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 items-center">
              <div className="flex items-center">
                {/* Subcontractors logo */}
                {/* {data.subcontractors.map(
                                (subcontractor: string, i: number) => (
                                  <div
                                    style={{
                                      transform: `translateX(-${i * 10}px)`,
                                    }}
                                    className={`size-8 rounded-full overflow-hidden shadow-lg bg-white border border-gray-200`}
                                    key={i}
                                  >
                                    <img
                                      src={subcontractor}
                                      className="object-cover"
                                    />
                                  </div>
                                )
                              )} */}
              </div>
              <p
                className="text-xs font-medium font-poppins"
                style={{
                  transform: `translateX(-${
                    data.subcontractors.length === 1
                      ? 0
                      : data.subcontractors.length * 6
                  }px)`,
                }}
              >
                {data.subcontractors.length}{" "}
                {data.subcontractors.length === 1
                  ? "Subcontractor"
                  : "Subcontractors"}
              </p>
            </div>
          </div>
        </div>

        {Boolean(data.currentStatus === "APPROVED") &&
          Boolean(data?.offerStatus === "ACCEPTED") && (
            <div className="w-full max-w-[314px] flex justify-between flex-wrap gap-y-4 font-poppins">
              <Button
                onClick={() => navigate("/dashboard/applications/finance")}
                variant={"outline"}
                className="w-[145px] border-2 text-blue-main border-blue-main text-xs"
              >
                Apply for finance
              </Button>
              <Button
                onClick={() => navigate("/dashboard/applications/insurance")}
                variant={"outline"}
                className="w-[145px] border-2 text-blue-main border-blue-main text-xs"
              >
                Apply for Insurance
              </Button>
              <Button
                onClick={() => finishApplicationMutation.mutate()}
                className="flex items-center gap-x-2 text-white w-[145px] flex-1 text-xs"
              >
                {finishApplicationMutation.isPending ? (
                  <Oval
                    visible={finishApplicationMutation.isPending}
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <>
                    <span>Finish Application</span>
                    <BiChevronRight size={18} />
                  </>
                )}
              </Button>
            </div>
          )}
        {Boolean(data.currentStatus === "DISABLED") && (
          <div className="w-full max-w-[314px] grayscale flex justify-between flex-wrap gap-y-4 font-poppins">
            {/* <Button
            variant={"outline"}
            className="w-[145px] border-2 text-blue-main border-blue-main text-xs flex gap-x-2 items-center"
          >
            <span className="font-normal">Download offer</span>
            <BiDownload size={16} />
          </Button> */}
          </div>
        )}

        {Boolean(data?.offerStatus === "REJECTED") && (
          <div className="w-full max-w-[314px] flex justify-between flex-wrap gap-y-4 font-poppins">
            {/* <Button
              variant={"outline"}
              className="w-[145px] border-2 text-blue-main border-blue-main text-xs flex gap-x-2 items-center"
            >
              <span className="font-normal">Download offer</span>
              <BiDownload size={16} />
            </Button> */}
            <p className="flex-1 text-end">You rejected this offer.</p>
          </div>
        )}
        {/* {console.log(data)} */}
        {Boolean(data.currentStatus === "APPROVED") &&
          Boolean(data?.offerStatus === "ISSUED") && (
            <div className="w-full max-w-[314px] flex justify-between flex-wrap gap-y-4 font-poppins">
              {/* <Button
              variant={"outline"}
              className="w-[145px] border-2 text-blue-main border-blue-main text-xs flex gap-x-2 items-center"
            >
              <span className="font-normal">Download offer</span>
              <BiDownload size={16} />
            </Button> */}
              <Button
                variant={"outline"}
                className="flex bg-white border-red-500 text-red-500 items-center gap-x-2 w-[145px] text-xs"
                onClick={() =>
                  rejectOfferMutation.mutate({
                    packageId: data.packageId,
                    offerId: data.offerId,
                    status: false,
                  })
                }
              >
                {rejectOfferMutation.isPending ? (
                  <Oval
                    visible={rejectOfferMutation.isPending}
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <>
                    <span>Reject offer</span>
                    <BiX size={18} />
                  </>
                )}
              </Button>
              <Button
                disabled={acceptOfferMutation.isPending}
                variant={"outline"}
                className="flex bg-white border-ca-blue text-ca-blue items-center gap-x-2 w-[145px] text-xs"
                onClick={() =>
                  acceptOfferMutation.mutate({
                    packageId: data.packageId,
                    offerId: data.offerId,
                    status: true,
                  })
                }
              >
                {acceptOfferMutation.isPending ? (
                  <Oval
                    visible={acceptOfferMutation.isPending}
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <>
                    <span>Accept offer</span>
                    <BiChevronRight size={18} />
                  </>
                )}
              </Button>
            </div>
          )}
      </div>
      <div className="mt-9 flex justify-between gap-4 items-center">
        <HIAApplicationStatus status={data.currentStatus} />
        {(Boolean(data.currentStatus === "APPROVED") ||
          Boolean(data.offerStatus === "ACCEPTED")) && (
          <Button
            onClick={handleDownload}
            variant={"link"}
            className="flex items-center gap-2 font-poppins text-sm p-0"
          >
            <span className="font-normal">Download offer</span>
            <BiDownload size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HIAApplicationCard;
