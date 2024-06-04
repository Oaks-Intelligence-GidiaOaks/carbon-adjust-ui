import { UserCircleIcon } from "@heroicons/react/24/outline";
import AccountSetupProgressIndicator from "./AccountSetupProgressIndicator";
import {
  AccountSetupScribbleLeft,
  AccountSetupScribbleRight,
  JottingHand,
} from "@/assets/icons";
import { AccountSetupPropsSteps } from "@/types/general";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const AccountSetupInfo = ({
  currentStep = 1,
  accountType,
}: AccountSetupPropsSteps) => {
  const userData = useSelector((state: RootState) => state.user.user);

  const figureStepBasedOnAccountType = (step: number) => {
    if (userData?.roles[0] === "HOME_OCCUPANT") {
      return step >= 4 ? 4 : step;
    }

    return step >= 3 ? 3 : step;
  };

  return (
    <div className="p-6 flex justify-center bg-gradient-to-r z-50 sticky top-[64px] overflow-hidden from-[hsla(224,76%,18%,1)] from-80% to-[hsla(224,76%,41%,1)]">
      <AccountSetupScribbleLeft className="absolute top-0 left-0" />
      <AccountSetupScribbleRight className="absolute bottom-0 right-0" />
      <JottingHand className="absolute hidden md:block -bottom-3 left-10" />
      <div className="max-w-[820px] w-full mx-auto">
        <div className="flex justify-between w-full gap-x-6 flex-wrap items-center">
          <div className="flex justify-between gap-x-3">
            <div className="bg-white w-12 h-12 rounded-full flex justify-center items-center">
              <UserCircleIcon className="h-10 w-10" />
            </div>
            <div className="text-white">
              <p className="font-medium font-poppins text-scheme-white">
                {userData?.name}
              </p>
              <p className="text-sm font-poppins text-scheme-white">
                {userData?.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-blue-main font-poppins font-medium">
              Account Set-up
            </p>
            <p className="text-scheme-white text-xs mt-2 font-poppins">
              {figureStepBasedOnAccountType(currentStep ?? 1)} out of{" "}
              {accountType !== "home-occupant" ? 3 : 4}
            </p>
          </div>
        </div>
        <div className="mt-14 mb-4">
          <AccountSetupProgressIndicator
            accountType={userData?.roles[0]}
            currentStep={currentStep}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSetupInfo;
