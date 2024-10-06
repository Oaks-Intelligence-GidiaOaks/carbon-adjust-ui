import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { GrClose } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Oval } from "react-loader-spinner";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  approveGrantApplication,
  rejectGrantApplication,
} from "@/services/merchantService";
import { formatNumberWithCommas } from "@/utils";
import { MdDownload } from "react-icons/md";

const ViewGrantApplicationModal = (props: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showGrantModal: boolean;
  rowData: any;
}) => {
  const [approvedAmount, setApprovedAmount] = useState<string>(
    props?.rowData?.approvedGrant || ""
  );

  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const doc = e.target.files![0];

    if (doc) {
      setFile(doc);
    }
  }, []);

  const ApproveGrant = useMutation({
    mutationKey: ["approve-grant"],
    mutationFn: (inputData: FormData) => approveGrantApplication(inputData),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
      props.setShowModal(false);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-grant-applications"] });
    },
  });

  const RejectGrant = useMutation({
    mutationKey: ["reject-grant"],
    mutationFn: (inputData: FormData) => rejectGrantApplication(inputData),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
      props.setShowModal(false);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-grant-applications"] });
    },
  });

  const handleSubmit = (type: "approve" | "reject") => {
    const formData = new FormData();

    // vaidate document exists
    if (file === null) {
      toast.error(`Please upload a contract documnet`);
      return;
    }

    formData.append("file", file);
    formData.append("applicationId", props?.rowData._id);

    if (type === "approve") {
      // validate input
      if (!Boolean(approvedAmount.length)) {
        toast.error(`Please add an approved amount`);
        return;
      }

      formData.append("approvedAmount", approvedAmount);
      ApproveGrant.mutateAsync(formData);
    } else {
      RejectGrant.mutateAsync(formData);
    }
  };

  console.log(props.rowData, "row data");

  return (
    <Modal>
      <div className="w-full bg-transparent">
        <div className="md:w-[380px] mx-aut md:ml-auto border bg-white overflow-y-scroll scrollbar-hide  h-[100vh]">
          <div className="flex-center font-poppins justify-between w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
            <div className="flex-center gap-[13px]">
              <IoIosArrowRoundBack onClick={() => props.setShowModal(false)} />
              <h2 className="font-[600] text-lg">Details</h2>
            </div>

            <span onClick={() => props.setShowModal(false)}>
              <GrClose />
            </span>
          </div>

          <div className="flex flex-col gap-[22px] px-5 mx-auto pb-8">
            <h2 className="font-[600] text-lg mt-3">Order Summary</h2>

            <div className="flex-start">
              <span className="font-[600] text-sm w-1/2">
                {" "}
                Package Name (£):{" "}
              </span>
              <span className="font-[400] text-sm w-1/2 pl-2">
                {props?.rowData.package.title}
              </span>
            </div>

            <div className="flex-start">
              <span className="font-[600] text-sm w-1/2 ">
                {" "}
                Grant Amount :{" "}
              </span>
              <span className="font-[400] text-sm w-1/2 pl-2">
                £{formatNumberWithCommas(props.rowData.package.minAmount)} - £
                {formatNumberWithCommas(props.rowData.package.maxAmount)}
              </span>
            </div>

            <div className="flex-start">
              <span className="font-[600] text-sm w-1/2">
                Approved amount £:
              </span>

              <span className="font-[400] text-sm w-1/2 pl-2">
                <input
                  value={approvedAmount}
                  onChange={(e) => setApprovedAmount(e.target.value)}
                  type="number"
                  name=""
                  id=""
                  className="border rounded-md p-1 text-xs px-3"
                />
              </span>
            </div>

            <div className="flex-start">
              <span className="font-[600] text-sm w-1/2">Name:</span>
              <span className="font-[400] text-sm w-1/2 pl-2">
                {props?.rowData?.customer.name}
              </span>
            </div>

            <div className="flex-start">
              <span className="font-[600] text-sm w-1/2">
                Reason for grant request:{" "}
              </span>
              <span className="font-[400] text-sm w-1/2 pl-2">
                Please provide the below details to enable us complete your
                order for this product.
              </span>
            </div>

            <div className="flex-start">
              <span className="font-[600] text-sm w-1/2">
                {" "}
                Residential Address:{" "}
              </span>

              <span className="font-[400] text-sm  truncate w-1/2 pl-2">
                {props.rowData?.customerAddress.firstLineAddress}
              </span>
            </div>

            <div className="flex-start">
              <span className="font-[600] text-sm w-1/2">Phone Number: </span>
              <span className="font-[400] text-sm w-1/2 pl-2">
                {props?.rowData?.customerPhone}
              </span>
            </div>

            {/* Custom  Package Question Resonses - Map and Display */}
            <div className="flex-start">
              <span className="font-[600] text-sm w-1/2">
                Will you need any other product?:
              </span>
              <span className="font-[400] text-sm w-1/2 pl-2">Yes</span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex-start">
                <span className="font-[600] text-sm w-1/2">
                  How much are you willing to spend on your retrofit journey in
                  the next year?:
                </span>

                <span className="font-[400] text-sm w-1/2 pl-2 truncate"></span>
              </div>
            </div>

            <div className="space-y-4" key={10}>
              <label className="" htmlFor="">
                Contract (*pdf)
              </label>

              {props?.rowData?.grantContractDoc ? (
                <div className="border rounded-md px-4 p-2 cursor-pointer flex-center gap-3 w-fit">
                  <a href={props.rowData.grantContractDoc} target="__blank">
                    Contract Doc
                  </a>

                  <MdDownload />
                </div>
              ) : (
                <input
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  name="file"
                  id=""
                  onChange={handleFileChange}
                />
              )}
            </div>

            {!props?.rowData?.approvedGrant && (
              <>
                <button
                  disabled={false}
                  onClick={() => handleSubmit("approve")}
                  className={`${
                    false ? "bg-gray-300" : "blue-gradient"
                  } rounded-[12px] mt-[40px] font-poppins w-full  hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px] grid place-items-center`}
                >
                  {false ? (
                    <Oval
                      visible={true}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Approve</span>
                  )}
                </button>

                <button
                  disabled={false}
                  onClick={() => handleSubmit("reject")}
                  className={`${
                    false ? "bg-gray-300" : "blue-gradient"
                  } rounded-[12px] font-poppins w-full  text-center text-white border-red-300 h-[46px] grid place-items-center`}
                >
                  {false ? (
                    <Oval
                      visible={true}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Reject</span>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewGrantApplicationModal;
