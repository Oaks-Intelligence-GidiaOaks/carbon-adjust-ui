import { AccountSetupProgressIndicatorProps } from "@/types/general";
import { cn } from "@/utils";

const AccountSetupProgressIndicator = ({
  accountType,
  currentStep = 1,
}: AccountSetupProgressIndicatorProps) => {
  switch (accountType) {
    case "HOME_OCCUPANT":
      return (
        <div className="h-[6px] w-full bg-gray-400 rounded-full relative flex justify-between">
          <div
            className={cn(
              "w-full h-full transition-all duration-500 bg-green-500 rounded-full absolute left-0",
              currentStep === 1 ? "w-0" : "",
              currentStep === 2 ? "w-1/3" : "",
              currentStep === 3 ? "w-2/3" : "",
              currentStep === 4 ? "w-full" : ""
            )}
          />
          <div
            className={cn(
              "border-[3px] w-5 h-5 rounded-full border-gray-400 bg-white -translate-y-1.5 relative",
              currentStep >= 1
                ? "border-green-500 transition-all delay-500 border-[6px]"
                : ""
            )}
          >
            <p className="text-gray-400 font-medium font-poppins whitespace-nowrap absolute -top-7 text-sm">
              Bio Data
            </p>
          </div>
          <div
            className={cn(
              "border-[3px] w-5 h-5 rounded-full border-gray-400 bg-white -translate-y-1.5 relative",
              currentStep >= 2
                ? "border-green-500 transition-all delay-500 border-[6px]"
                : ""
            )}
          >
            <p className="text-gray-400 font-medium font-poppins whitespace-nowrap absolute -top-7 text-sm left-0 -translate-x-[calc(50%-5px)]">
              Address
            </p>
          </div>
          <div
            className={cn(
              "border-[3px] w-5 h-5 rounded-full border-gray-400 bg-white -translate-y-1.5 relative",
              currentStep >= 3
                ? "border-green-500 transition-all delay-500 border-[6px]"
                : ""
            )}
          >
            <p className="text-gray-400 font-medium font-poppins whitespace-nowrap absolute -top-7 text-sm left-0 -translate-x-[calc(50%-5px)]">
              Home Information
            </p>
          </div>
          <div
            className={cn(
              "border-[3px] w-5 h-5 rounded-full border-gray-400 bg-white -translate-y-1.5 relative",
              currentStep >= 4
                ? "border-green-500 transition-all delay-500 border-[6px]"
                : ""
            )}
          >
            <p className="text-gray-400 font-medium font-poppins whitespace-nowrap absolute -top-7 right-0 text-sm">
              Documentation
            </p>
          </div>
        </div>
      );
    default:
      return (
        <div className="h-[6px] w-full bg-gray-400 rounded-full relative flex justify-between">
          <div
            className={cn(
              "w-full h-full transition-all duration-500 bg-green-500 rounded-full absolute left-0",
              currentStep === 1 ? "w-0" : "",
              currentStep === 2 ? "w-1/2" : "",
              currentStep === 3 ? "w-full" : ""
            )}
          />
          <div
            className={cn(
              "border-[3px] w-5 h-5 rounded-full border-gray-400 bg-white -translate-y-1.5 relative",
              currentStep >= 1
                ? "border-green-500 transition-all delay-500 border-[6px]"
                : ""
            )}
          >
            <p className="text-gray-400 font-medium font-poppins whitespace-nowrap absolute -top-7 text-sm">
              Bio Data
            </p>
          </div>
          <div
            className={cn(
              "border-[3px] w-5 h-5 rounded-full border-gray-400 bg-white -translate-y-1.5 relative",
              currentStep >= 2
                ? "border-green-500 transition-all delay-500 border-[6px]"
                : ""
            )}
          >
            <p className="text-gray-400 font-medium font-poppins whitespace-nowrap absolute -top-7 text-sm left-0 -translate-x-[calc(50%-5px)]">
              Address
            </p>
          </div>
          <div
            className={cn(
              "border-[3px] w-5 h-5 rounded-full border-gray-400 bg-white -translate-y-1.5 relative",
              currentStep >= 3
                ? "border-green-500 transition-all delay-500 border-[6px]"
                : ""
            )}
          >
            <p className="text-gray-400 font-medium font-poppins whitespace-nowrap absolute -top-7 right-0 text-sm">
              Documentation
            </p>
          </div>
        </div>
      );
      break;
  }
};

export default AccountSetupProgressIndicator;
