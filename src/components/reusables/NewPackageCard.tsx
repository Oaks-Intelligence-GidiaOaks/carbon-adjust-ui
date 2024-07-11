import { Package } from "@/types/product";
// import { FaStar } from "react-icons/fa";
import { Button } from "../ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishPackage, unPublishPackage } from "@/services/merchantService";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { formatNumberWithCommas } from "@/utils";

const NewPackageCard = (
  props: Package & { attachments?: string[]; isMerchant?: boolean }
) => {
  const queryClient = useQueryClient();

  const publishMutation = useMutation({
    mutationKey: ["publish-package"],
    mutationFn: (packageId: string) => publishPackage(packageId),
    onSuccess: () => {
      toast.success("Package published successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-packages"],
      });
    },
    onError: () => {
      toast.error("Error publishing package");
    },
  });

  const unPublishMutation = useMutation({
    mutationKey: ["unpublish-package"],
    mutationFn: (packageId: string) => unPublishPackage(packageId),
    onSuccess: () => {
      toast.success("Package unpublished successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-packages"],
      });
    },
    onError: () => {
      toast.error("Error unpublishing package");
    },
  });

  const handlePublishPackage = (packageId: string) => {
    publishMutation.mutate(packageId);
  };

  const handleUnPublishPackage = (packageId: string) => {
    unPublishMutation.mutate(packageId);
  };
  return (
    <div className="min-w-[200px] max-w-[240px] flex flex-col bg-white shrink-0">
      <div className="bg-[#F3F5F7] grid place-items-center h-[300px]  ">
        {props.isMerchant ? (
          <div className="w-full h-full overflow-hidden relative">
            <img
              src={
                props?.attachments
                  ? props?.attachments[0]
                  : "/assets/graphics/pkg-1.png}"
              }
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <img
            src={
              props?.attachments
                ? props?.attachments[0]
                : "/assets/graphics/pkg-1.png}"
            }
            alt=""
            className="w-full h-full"
          />
        )}
      </div>

      <div className="flex flex-col gap-1 mt-3">
        {/* <div className="flex-center gap-1">
          {Array.from({ length: props?.rating || 0 }, (_, i) => (
            <FaStar size={13.94} key={i} color="#0E89F7" />
          ))}
        </div> */}

        <h2 className="text-xs font-[600]">{props.title}</h2>
        <h2 className="text-xs font-[600]">
          £{formatNumberWithCommas(props.price)}
        </h2>

        <Button
          onClick={() => {
            if (props.status === "publish") {
              handleUnPublishPackage(props._id);
            } else {
              handlePublishPackage(props._id);
            }
          }}
          disabled={publishMutation.isPending || unPublishMutation.isPending}
          className="font-[500] capitalize mt-1 text-white text-xs bg-[#139EEC] h-[32px] max-w-[90px] rounded-[16px] text-center grid place-items-center"
        >
          {publishMutation.isPending || unPublishMutation.isPending ? (
            <Oval
              visible={publishMutation.isPending || unPublishMutation.isPending}
              height="20"
              width="20"
              color="#ffffff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <span>{props.status === "publish" ? "Unpublish" : "Publish"}</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewPackageCard;
