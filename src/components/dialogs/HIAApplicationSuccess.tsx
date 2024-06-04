import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui";
import { GrClose } from "react-icons/gr";
import { createSearchParams, useNavigate } from "react-router-dom";

type Props = {
  setShowApplicationSuccessDialog: (value: boolean) => void;
};

const HIAApplicationSuccess = ({ setShowApplicationSuccessDialog }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="w-screen max-w-[806px] bg-white h-fit rounded-md pt-6 mt-[10vh] relative">
      <div className="max-w-[630px] w-full mx-auto px-2 sm:px-6 relative">
        <div className="mx-auto pt-20 pb-[10vh]">
          <div className="mx-auto max-w-[379px]">
            <div className="mb-7 flex justify-center items-center">
              <img
                src={"/assets/graphics/successful-application.svg"}
                className=""
              />
            </div>
            <p className="text-green-500 font-poppins text-center">
              Application to HIA is successful
            </p>
            <p className="text-black-main mt-4 font-poppins text-center">
              Your application will be reviewed and you will receive feedback
            </p>
            <div className="mt-10">
              <Button
                onClick={() => {
                  setShowApplicationSuccessDialog(false);
                  navigate({
                    pathname: "",
                    search: createSearchParams({
                      state: "pending-applications",
                    }).toString(),
                  });
                }}
                className="w-full text-white font-poppins h-12"
              >
                Okay
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

export default HIAApplicationSuccess;
