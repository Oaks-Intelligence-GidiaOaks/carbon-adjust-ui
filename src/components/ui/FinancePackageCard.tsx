// import calendar from "../../assets/icons/calendar.svg";
// import MoreVert from "../../assets/icons/MoreVert.svg";
// import FiLogo from "../../assets/icons/fiLogo.svg";
// import eyeIcon from "../../assets/icons/eye.svg";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { BiDotsHorizontal } from "react-icons/bi";
import axiosInstance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "./Button";
import { Oval } from "react-loader-spinner";
import { defaultPackageImage } from "@/constants";
// import { formatDate } from "../../lib/helpers.js";

const FinancePackageCard = ({
  data,
  home_owner,
  isPlaceholder = true,
}: {
  data: any;
  home_owner: any;
  isPlaceholder: boolean;
}) => {
  const queryClient = useQueryClient();

  //   const update_finance_package = useMutation({
  //     mutationKey: ["update_finance_package"],
  //     mutationFn: (obj) =>
  //       axios.put(`package/finance/${data._id}`, obj).then((res) => res.data),
  //     onSuccess: () =>
  //       queryClient.invalidateQueries({ queryKey: ["get_finance_packages"] }),
  //   });

  //   let isPublished = data.published;

  //   const handle_update_package = () => {
  //     isPublished
  //       ? update_finance_package.mutate({ published: false })
  //       : update_finance_package.mutate({ published: true });
  //   };

  //   let bg_gradient = `bg-gradient-to-r from-[#D2ECF8] from-10% via-[#F6F0F6] via-30% to-[#EAF5EF] to-90%`;

  const publishMutation = useMutation({
    mutationKey: ["publish finance package"],
    mutationFn: (id: string) =>
      axiosInstance.patch(`packages/${id}/publish`, {
        userId: id,
        status: "declined",
      }),
    onSuccess: () => {
      toast.success("Package published successfully");
      queryClient.invalidateQueries({ queryKey: ["get-finance-packages"] });
    },
    onError: () => {
      toast.error("Error publishing package");
    },
  });

  const unpublishMutation = useMutation({
    mutationKey: ["publish finance package"],
    mutationFn: (id: string) =>
      axiosInstance.patch(`packages/${id}/unpublish`, {
        userId: id,
        status: "confirmed",
      }),
    onSuccess: () => {
      toast.success("Package unpublished successfully");
      queryClient.invalidateQueries({ queryKey: ["get-finance-packages"] });
    },
    onError: () => {
      toast.error("Error unpublishing package");
    },
  });

  return !isPlaceholder ? (
    <div
      className={`relative font-titleFont font-[500] text-xs w-[403px] shrink-0`}
    >
      <div
        className={`p-4 pb-6  flex items-start gap-3 w- rounded-lg shadow-md relative border bg-cover bg-[url('/assets/graphics/financial-card-bg.svg')] `}
      >
        <div className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] bg-white rounded-full overflow-hidden">
          <img
            src={data?.coverImg ?? defaultPackageImage}
            alt="package logo"
            className="w-full rounded-full"
          />
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-[700] flex-1 mt-4 text-white font-poppins">
              {data?.name}
            </h4>
            {/* <img src={MoreVert} className="" /> */}

            <BsThreeDots size={20} fill="white" className="mt-2" />
          </div>

          <div className="my-6 text-white font-poppins">
            <p className=" text-blue-main font-poppins">
              Annual Percentage Rate: {data?.annualPercentRate}%{" "}
            </p>

            <h5 className="text-white font-poppins mt-4 text-2xl">
              <span className="text-white font-poppins font-bold">
                {data.currency}
              </span>
              {data.maxAmount}
            </h5>
          </div>

          <div>
            <h4 className="capitalize text-blue-main font-poppins">
              {data?.interestRateType} Interest Rate
            </h4>
            <h6 className="text-white font-poppins">
              Repayment under: {data?.maxRepaymentPeriod} {data.paymentPeriod}
            </h6>
          </div>

          {!home_owner && (
            <div className="col-span-1 flex items-end justify-end absolute bottom-4 right-4">
              {data?.status === "unpublish" ? (
                <Button
                  onClick={() => publishMutation.mutate(data._id)}
                  disabled={publishMutation.isPending}
                  className="w-fit text-white"
                >
                  {publishMutation.isPending ? (
                    <Oval
                      visible={publishMutation.isPending}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Publish</span>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => unpublishMutation.mutate(data._id)}
                  disabled={unpublishMutation.isPending}
                  className="w-fit text-white"
                >
                  {unpublishMutation.isPending ? (
                    <Oval
                      visible={unpublishMutation.isPending}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Unpublish</span>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-1 flex items-center justify-between">
        <p className="text-ca-blue flex items-center gap-1">
          {/* <img src={calendar} className=" text-ca-blue" /> */}
          {/* <span className="font-[700]">Date created</span>:{" "} */}
          {/* <span className="text-black ">{formatDate(data?.createdAt)}</span> */}
        </p>

        {/* <p className="flex items-center gap-1">
        <img src={eyeIcon} alt="" />

        <span>Views 1.2k</span>
      </p> */}
      </div>
    </div>
  ) : (
    <div className={`font-titleFont font-[500] text-xs w-[403px] shrink-0`}>
      <div
        className={`p-4 pb-6  flex items-start gap-3 w- rounded-lg shadow-md relative border bg-cover bg-[url('/assets/graphics/financial-card-bg.svg')] `}
      >
        <div className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] bg-white rounded-full overflow-hidden">
          <img
            src={data.logo}
            alt="package logo"
            className="w-full rounded-full"
          />
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-[700] flex-1 mt-4 text-white font-poppins">
              {data?.package_name}
            </h4>
            {/* <img src={MoreVert} className="" /> */}

            <BsThreeDots size={20} fill="white" className="mt-2" />
          </div>

          <div className="my-6 text-white font-poppins">
            <p className=" text-blue-main font-poppins">
              Annual Percentage Rate: 5%{" "}
            </p>

            <h5 className="text-white font-poppins mt-4 text-2xl">
              <span className="text-white font-poppins font-bold">£</span>
              {data.max_amount}
            </h5>
          </div>

          <div>
            <h4 className="capitalize text-blue-main font-poppins">
              {data?.interest_rate_type} Interest Rate
            </h4>
            <h6 className="text-white font-poppins">
              Repayment under: {data?.max_repayment_period} months
            </h6>
          </div>

          {!home_owner && (
            <div
              //   onClick={handle_update_package}
              className="absolute bottom-6 right-3 border hover:bg-ca-blue hover:text-white p-1 px-3 cursor-pointer rounded-md border-ca-blue text-ca-blue"
            >
              {/* <span className="text-xs">
                {update_finance_package.isLoading
                  ? "....."
                  : isPublished
                  ? "Unpublish"
                  : "Publish"}
              </span> */}
            </div>
          )}
        </div>
      </div>

      <div className="mt-1 flex items-center justify-between">
        <p className="text-ca-blue flex items-center gap-1">
          {/* <img src={calendar} className=" text-ca-blue" /> */}
          {/* <span className="font-[700]">Date created</span>:{" "} */}
          {/* <span className="text-black ">{formatDate(data?.createdAt)}</span> */}
        </p>

        {/* <p className="flex items-center gap-1">
          <img src={eyeIcon} alt="" />

          <span>Views 1.2k</span>
        </p> */}
      </div>
    </div>
  );
};

export default FinancePackageCard;
