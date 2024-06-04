import { UserCircleIcon } from "@heroicons/react/24/outline";
import {
  AccountSetupScribbleLeft,
  AccountSetupScribbleRight,
} from "@/assets/icons";
import { AccountSetupProps } from "@/types/general";

const ProfileInfo = ({ currentStep }: AccountSetupProps) => {
  return (
    <div className="p-6 pb-10 flex justify-center bg-gradient-to-r z-50 sticky top-0 overflow-hidden from-[hsla(224,76%,18%,1)] from-80% to-[hsla(224,76%,41%,1)]">
      <AccountSetupScribbleLeft className="absolute top-0 left-0" />
      <AccountSetupScribbleRight className="absolute bottom-0 right-0" />
      {/* <JottingHand className="absolute -bottom-3 left-10" /> */}
      <div className="max-w-[820px] w-full mx-auto">
        <div className="flex justify-between w-full gap-x-6 flex-wrap items-center">
          <div className="flex justify-between gap-x-3">
            <div className="bg-white w-12 h-12 rounded-full flex justify-center items-center">
              <UserCircleIcon className="h-10 w-10" />
            </div>
            <div className="text-white">
              <p className="font-medium font-poppins text-scheme-white">
                Jeffrey Cooper
              </p>
              <p className="text-sm font-poppins text-scheme-white">
                jeffreycooper@gmail.com
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-blue-main font-poppins font-medium">
              Account Set-up
            </p>
            <p className="text-scheme-white text-xs mt-2 font-poppins">
              {currentStep} out of 4
            </p>
          </div>
        </div>
        <div className="mt-14 mb-4">
          {/* <AccountSetupProgressIndicator
                accountType={accountType}
                currentStep={currentStep}
              /> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
