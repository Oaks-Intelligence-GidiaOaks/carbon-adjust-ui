// import { StarIcon } from "@heroicons/react/20/solid";
import { Button } from "../ui";
import { defaultPackageImage } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { FiMoreHorizontal } from "react-icons/fi";

type Props = {
  data: {
    _id: string;
    name: string;
    status: string;
    createdBy: {
      _id: string;
      name: string;
    };
    logo: string;
    coverImg: string;
    currency: string;
    maxInsuranceAmount: number;
    insurancePercent: number;
    createdAt: string;
  };
};

const InsurancePackage = ({ data }: Props) => {
  const queryClient = useQueryClient();

  const publishMutation = useMutation({
    mutationKey: ["publish insurance package"],
    mutationFn: (id: string) => axiosInstance.patch(`packages/${id}/publish`),
    onSuccess: () => {
      toast.success("Package published successfully");
      queryClient.invalidateQueries({ queryKey: ["get-insurance-packages"] });
    },
    onError: () => {
      toast.error("Error publishing package");
    },
  });

  const unpublishMutation = useMutation({
    mutationKey: ["publish finance package"],
    mutationFn: (id: string) => axiosInstance.patch(`packages/${id}/unpublish`),
    onSuccess: () => {
      toast.success("Package unpublished successfully");
      queryClient.invalidateQueries({ queryKey: ["get-insurance-packages"] });
    },
    onError: () => {
      toast.error("Error unpublishing package");
    },
  });

  return (
    <div className="w-full group flex gap-x-4 hover:shadow-lg transition-all min-w-[270px] sm:min-w-[380px] overflow-hidden bg-white border border-gray-300 relative rounded-xl pt-4 pb-4 px-2 sm:px-6 bg-no-repeat bg-right-top">
      <div className="size-8 sm:size-12 rounded-full overflow-hidden border border-gray-300">
        <img
          src={data.coverImg ?? defaultPackageImage}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-x-2 relative">
          <div className="flex justify-between flex-1 items-center">
            <p className="font-poppins mt-3 font-medium text-black-main text-lg text-ellipsis line-clamp-1">
              {data.name}
            </p>
          </div>
          <FiMoreHorizontal
            className="absolute right-0 top-4 text-main rounded-full hover:bg-main/10 cursor-pointer"
            role="button"
          />
        </div>

        <div className="mt-2 flex flex-col justify-between items-start">
          <p className="text-ca-blue text-xs font-poppins">
            Insurance percentage: {data.insurancePercent}%
          </p>
          <p className="font-sans mt-3 font-semibold text-black-main text-lg">
            {data.currency}
            {data.maxInsuranceAmount}
          </p>
          {/* <Button
            variant={"link"}
            className="font-poppins font-light underline bg-transparent text-xs px-0"
            >
            Reviews
        </Button> */}
        </div>
        <div className="flex items-center justify-start mt-4">
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
      </div>
    </div>
  );
};

export default InsurancePackage;
