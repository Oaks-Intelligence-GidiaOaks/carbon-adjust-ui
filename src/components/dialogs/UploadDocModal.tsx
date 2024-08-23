import { Dispatch, SetStateAction, useRef, useState } from "react";
import Modal from "./Modal";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import FormDocumentUpload from "../ui/FormDocumentUpload";
import { UploadStates } from "@/interfaces/order.interface";
import { Button } from "../ui";
import { Oval } from "react-loader-spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadReport } from "@/services/merchantService";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { UserRole } from "@/interfaces/user.interface";

const UploadDocModal = (props: {
  rowId: string | null;
  showUploadDocModal: boolean;
  setShowUploadDocModal: Dispatch<SetStateAction<boolean>>;
  params?: {
    page: number;
    limit: number;
  };
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  // @ts-ignore
  const isStaffAdmin = user?.roles.includes(UserRole.ADMIN_STAFF);

  // @ts-ignore
  const isReportMerchant = user?.roles.includes(UserRole.REPORT_MERCHANT);

  const ref = useRef(null);
  useOutsideCloser(ref, props.showUploadDocModal, props.setShowUploadDocModal);

  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState<UploadStates>(
    UploadStates.default
  );

  const UploadReport = useMutation({
    mutationKey: ["upload-report"],
    mutationFn: (args: any) =>
      uploadReport(args.orderId as string, args.formData as FormData),
    onSuccess: () => {
      toast.success("Uploaded Report Successfully");
    },
    onError: (ex: any) => {
      toast.error(ex.response?.data?.message || "Error Uploading Report");
    },
    onSettled: () => {
      props.setShowUploadDocModal(false);

      if (isStaffAdmin) {
        queryClient.invalidateQueries({
          queryKey: ["get-orders-sa"],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["get-applications"],
        });
      }
    },
  });

  const handleSubmit = () => {
    if (!file) {
      toast.error(`Please add a document`);
      return;
    }

    const formData = new FormData();

    formData.append("file", file as File);
    UploadReport.mutate({ orderId: props.rowId as string, formData });
  };

  return (
    <Modal>
      <div
        ref={ref}
        className="w-[95%] sm:w-1/2 max-w-[513px] min-w-[240px] h-[clamp(400px,80%,688px)] flex flex-col gap-4 bg-white shadow-lg rounded-xl overflow-scroll p-2 lg:px-5"
      >
        <h2 className="text-center font-[600] text-base text-gray-800 pt-3">
          Upload Report
        </h2>

        {/* Upload Doc slider and icon with name */}
        <FormDocumentUpload
          file={file}
          setFile={setFile}
          coverImage="/assets/graphics/OBJECTS.svg"
          previewUrl={""}
          setPreviewUrl={() => {}}
          setUploading={setUploading}
          uploading={uploading}
        />

        {/* textarea for description */}

        {/* <textarea
          placeholder="Report description"
          name=""
          rows={5}
          className="w-full border rounded-md gradient-border outline-none p-3 text-sm placeholder:text-sm"
          id=""
        ></textarea> */}

        <Button
          onClick={handleSubmit}
          isLoading={UploadReport.isPending}
          variant={"default"}
          className="grid place-items-center mt-4"
        >
          {UploadReport.isPending ? (
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
            <span className="text-center">Submit</span>
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default UploadDocModal;
