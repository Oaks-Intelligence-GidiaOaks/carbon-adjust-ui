import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

type Props = {
  setShowApplicationSuccessDialog: (value: boolean) => void;
  setShowInsuranceSheet: Dispatch<SetStateAction<boolean>>;
  //   setShowInsurancePackagesSheet?: Dispatch<SetStateAction<boolean>>;
};

const MainFinanceApplicationSuccess = ({
  setShowApplicationSuccessDialog,
}: // setShowInsuranceSheet,
Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const currentApplicationDetails = queryClient.getQueryData([
    "application-status",
  ]);

  const endApplication = useMutation({
    mutationKey: ["complete-app"],
    mutationFn: () =>
      axiosInstance.patch(
        `/applications/${
          (currentApplicationDetails as any)?.data?.data.appId
        }/ho/fulfil`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ type: "all" });
      toast.success("Application completed successfully");
      setShowApplicationSuccessDialog(false);
      navigate("/dashboard/applications/finance-applications");
    },
    onError: () => {
      toast.error("Error completing application");
      // navigate("/dashboard/applications/finance-applications");
    },
  });

  return (
    <div className="w-screen max-w-[806px] bg-white h-fit rounded-md pt-6 mt-[10vh] relative">
      <div className="max-w-[630px] w-full mx-auto px-2 sm:px-6 relative">
        <div className="mx-auto pt-20 pb-[10vh]">
          <div className="mx-auto max-w-[379px]">
            <div className="mb-5 flex justify-center items-center">
              <img
                src={"/assets/graphics/finance-successful-application.svg"}
                className=""
              />
            </div>
            <p className="text-[#2879C5] font-poppins text-center text-xl font-semibold uppercase">
              Application
            </p>
            <p className="text-black-main mt-4 font-poppins text-center">
              Would you like to proceed without applying for insurance
            </p>
            <div className="mt-10 flex gap-x-4">
              <Button
                onClick={() => {
                  endApplication.mutate();
                }}
                variant={"outline"}
                className="w-full text-[#2879C5] font-poppins h-12 border-[#2879C5]"
              >
                {endApplication.isPending ? (
                  <Oval
                    visible={endApplication.isPending}
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <span>Proceed without applying</span>
                )}
              </Button>
              <Button
                onClick={() => {
                  // setShowInsuranceSheet(true);
                  // setShowApplicationSuccessDialog(false);
                  navigate("/dashboard/applications/insurance");
                }}
                variant={"outline"}
                className="w-full text-white font-poppins h-12 bg-[#2879C5]"
              >
                Apply for Insurance
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog.Close asChild>
        <button
          className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-7 right-6 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          <GrClose />
        </button>
      </Dialog.Close>
    </div>
  );
};

export default MainFinanceApplicationSuccess;
