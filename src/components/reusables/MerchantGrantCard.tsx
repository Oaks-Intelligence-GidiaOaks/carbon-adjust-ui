import { FunctionComponent, SVGProps, useRef, useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { UserIcon, DeleteIcon, EditIcon, GrantPkgIcon } from "@/assets/icons";
import { Button } from "../ui";
import { Package } from "@/types/general";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishPackage, unPublishPackage } from "@/services/merchantService";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";

const MerchantGrantCard = (
  props: Package & {
    attachments?: string[];
    minAmount: number;
    maxAmount: number;
  }
) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const closerRef = useRef<HTMLDivElement | null>(null);
  useOutsideCloser(closerRef, showPopup, setShowPopup);

  const queryClient = useQueryClient();

  const publishMutation = useMutation({
    mutationKey: ["publish-package"],
    mutationFn: (packageId: string) => publishPackage(packageId),
    onSuccess: () => {
      toast.success("Package published successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-grant-packages"],
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

  const ListTile = (props: {
    Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    text: string;
  }) => {
    return (
      <div className="flex-center gap-2 px-5 py-4 border-b">
        {/* @ts-ignore */}
        <props.Icon size={16} />

        <span className="text-[#4F4F4F] text-sm font-[400] whitespace-nowrap">
          {props?.text}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-[#F3F5F7] w-[262px] border rounded-xl flex flex-col shrink-0">
      <div className="relative h-[249.88px]">
        <div className="relative ml-auto w-fit p-3 z-[30]">
          <div className="cursor-pointer" onClick={() => setShowPopup(true)}>
            <MdMoreVert size={24} />
          </div>

          {showPopup && (
            <div
              ref={closerRef}
              className=" absolute z-[20] right-[80%] flex flex-col border  bg-white shadow-md"
            >
              <ListTile Icon={UserIcon} text="View applications" />
              <ListTile Icon={EditIcon} text="Edit package" />
              <ListTile Icon={DeleteIcon} text="Remove package" />
            </div>
          )}
        </div>

        <div className="absolute z-[10] top-0 left-0 w-full overflow-hidden  h-full grid place-items-center">
          {props.attachments[0] ? (
            <img src={props?.attachments[0]} alt="" className="w-full h-auto" />
          ) : (
            <GrantPkgIcon className="w-[178px] h-auto mx-auto my-6" />
          )}
        </div>
      </div>

      <div className="bg-white flex flex-col gap-3 p-4">
        <h4 className="text-[#141718] font-[500] text-sm">{props?.title}</h4>

        <div className="flex-center text-[#A5A5A5] font-[400] text-xs">
          <span className=""> Min. £{props.minAmount} </span>{" "}
          <span className="px-2">-</span>
          <span className=""> Max £{props.maxAmount} </span>
        </div>

        <Button
          onClick={() => {
            if (props.status === "publish") {
              handleUnPublishPackage(props._id);
            } else {
              handlePublishPackage(props._id);
            }
          }}
          disabled={publishMutation.isPending || unPublishMutation.isPending}
          size={"sm"}
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

export default MerchantGrantCard;
