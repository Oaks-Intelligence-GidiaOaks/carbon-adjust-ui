import { GrClose } from "react-icons/gr";
import SelectInput from "../ui/SelectInput";
import Backdrop from "./Backdrop";
import { FaChevronDown } from "react-icons/fa";
import { Order } from "@/types/general";
import { cn, formatAccountType } from "@/utils";
import { Button } from "../ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { sendActivityQuery, sendQuoteQuery } from "@/services/merchant";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { MdDone, MdMoreVert, MdPending } from "react-icons/md";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const ProcessApplicationModal = (props: {
  order: Order;
  setShowActivities: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const { orderId } = useParams<{ orderId: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completeActivityMutation = useMutation({
    mutationKey: ["complete-activity"],
    mutationFn: (data: { activityId: string; status: string }) =>
      sendActivityQuery(orderId, data),
    onSuccess: () => {
      toast.success("Activity updated successfully");
      queryClient.invalidateQueries({ queryKey: ["order-details"] });
    },
    onError: () => {
      toast.error("Encountered error while sending updating order activity");
    },
  });

  const sendQuoteMutation = useMutation({
    mutationKey: ["send-quote"],
    mutationFn: (data: FormData) => sendQuoteQuery(orderId, data),
    onSuccess: () => {
      toast.success("Quote sent successfully");
      queryClient.invalidateQueries({ queryKey: ["order-details"] });
    },
    onError: () => {
      toast.error("Encountered error while sending quote successfully");
    },
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    actId: string
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("activityId", actId);

    sendQuoteMutation.mutate(formData);
  };

  const Step = (props: {
    step: string;
    name: string;
    status: string;
    actId: string;
  }) => (
    <div className="flex flex-row gap-3">
      <div className="flex-center gap-4 w-full">
        <div
          className={cn(
            "!size-6 min-w-6 rounded-full bg-[#ECFDF3] flex justify-center items-center",
            props.status === "pending" && "bg-yellow-500",
            props.status === "completed" && "bg-green-500"
          )}
        >
          {props.status === "completed" && <MdDone className="text-white" />}
          {props.status === "pending" && <MdPending className="text-white" />}
        </div>

        <div className="flex justify-between items-center w-full">
          <div>
            <span className="flex flex-col gap-1 font-[400] text-[#838383]">
              Step {props.step}
            </span>
            <span>{formatAccountType(props.name)}</span>
          </div>
          {props.name !== "REQUEST_QUOTE" && props.status === "pending" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="rounded-full size-8 inline-flex items-center justify-center text-violet11 bg-white outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
                  aria-label="Customise options"
                >
                  <MdMoreVert />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[120px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-10 bg-white rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                  sideOffset={5}
                >
                  {/* <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                  New Tab{' '}
                  <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                    ⌘+T
                  </div>
                </DropdownMenu.Item> */}

                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="group text-[13px] hover:bg-gray-100 cursor-pointer leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1">
                      Update Status
                      <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                        <ChevronRightIcon className="text-black-main size-4" />
                      </div>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.SubContent
                        className="min-w-[120px] z-20 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                        sideOffset={7}
                        alignOffset={-5}
                      >
                        <DropdownMenu.Item
                          onClick={() =>
                            completeActivityMutation.mutate({
                              activityId: props.actId,
                              status: "completed",
                            })
                          }
                          className="group text-[13px] hover:bg-gray-100 cursor-pointer leading-none text-green-500 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-violet1"
                        >
                          Completed
                          <div className="ml-auto pl-[20px] group-data-[highlighted]:text-green-500 ">
                            <MdDone />
                          </div>
                        </DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Sub>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}

          {props.name === "REQUEST_QUOTE" && props.status === "pending" && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e, props.actId)}
                className="hidden"
              />
              <Button
                onClick={handleButtonClick}
                className="h-6 px-2 text-xs font-normal"
                disabled={sendQuoteMutation.isPending}
              >
                {sendQuoteMutation.isPending ? (
                  <Oval
                    visible={true}
                    height="14"
                    width="14"
                    color="#ffffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <span>Send quote</span>
                )}
              </Button>
            </>
          )}
          {props.name === "REQUEST_QUOTE" && props.status === "completed" && (
            <Button className="h-6 px-2 text-xs font-normal" disabled>
              Quote sent
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const Next = () => (
    <div className="w-fit flex flex-col items-center pl-1">
      <div className="h-2 w-2 rounded-full bg-[#DCDCDC]" />
      <div className="h-6 border-l border-[#DCDCDC]" />
      <FaChevronDown color="#DCDCDC" className="-mt-1" />
    </div>
  );

  return (
    <Backdrop classnames="grid place-items-center px-2" show setShow={() => {}}>
      <div className="flex flex-col  gap-3 border p-10 w-fit rounded-xl bg-white max-w-[440px]">
        {/*  */}
        <div className="flex-center justify-between w-full  border-b pb-2 sticky top-0 z-20 bg-white">
          <h2 className="font-[600] text-lg">Process application</h2>

          <span
            className="cursor-pointer"
            onClick={() => {
              props.setShowActivities(false);
            }}
          >
            <GrClose />
          </span>
        </div>

        {/*  */}
        <h2 className="text-sm text-[#333333]">
          To process this application, select the order in which you want your
          customers to purchase this product{" "}
        </h2>

        <SelectInput options={[]} onChange={() => {}} />

        {/* steps */}
        <div className="flex flex-col text-xs my-6">
          {props.order.orderActivities.map((o, i, arr) => (
            <>
              <Step
                key={o._id}
                name={o.activity}
                step={(i + 1).toString()}
                status={o.status}
                actId={o._id}
              />
              {i !== arr.length - 1 && <Next />}
            </>
          ))}
        </div>

        <button
          onClick={() => {
            props.setShowActivities(false);
          }}
          className="blue-gradient grid place-items-center rounded-lg py-2 text-white text-sm"
        >
          <span>Done</span>
        </button>
      </div>
    </Backdrop>
  );
};

export default ProcessApplicationModal;
