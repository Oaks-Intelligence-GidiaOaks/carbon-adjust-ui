import { FC } from "react";
import { Button } from "../ui";

type Props = {};

type choiceProps = {
  text: string;
  isActive: boolean;
};

const ChooseVerification: FC<choiceProps> = ({ text, isActive }) => {
  return (
    <div
      className={`flex-center gap-[25px] h-[56px] border px-3 rounded-xl  ${
        isActive && "bg-[#E1EFF7]"
      }`}
    >
      <input
        type="radio"
        name=""
        id=""
        checked={isActive}
        className={`w-[15px] h-[15px] rounded-full active:bg-[#139EEC] `}
      />

      <span className="font-[400] text-sm text-[#495057]">{text}</span>
    </div>
  );
};

const ProfileSetting: FC<Props> = ({}) => {
  return (
    <div className="font-poppins">
      <h2 className="text-[#495057] text-base font-[700]">Security</h2>

      <h3 className="mt-5 text-[495057] text-base">Two factor verification</h3>

      <div className="mt-[47px]">
        <h4 className="text-center">Choose Verification method</h4>

        <div className="space-y-[37px] mt-[10px]">
          <ChooseVerification isActive={true} text="Google authenticator" />

          <ChooseVerification isActive={false} text="SMS" />
        </div>

        <Button className="text-center w-full mt-[32px]">
          <span className="text-white">Next</span>
        </Button>
      </div>

      <div className="mt-[60px] mx-auto w-fit">
        <h3 className="text-center text-[#495057] font-[500] text-sm">
          Don’t have the app?
        </h3>

        <p className="text-[#A1A4B1] font-[400] text-sm mt-2 text-center">
          Google Authenticator is a 2FA app. Download this app on your mobile
          device by searching for it on Playstore or Appstore
        </p>

        <div className="flex-center mt-4 justify-center gap-[52px] text-[#139EEC]">
          <div className="flex-center text-[#139EEC] gap-[8px] font-[500]">
            <a href="">PlayStore</a>
            <img src="/assets/icons/link-icon.svg" alt="" />
          </div>

          <div className="flex-center text-[#139EEC] gap-[8px] font-[500]">
            <a href="">AppStore</a>
            <img src="/assets/icons/link-icon.svg" alt="" />
          </div>
        </div>
      </div>

      <div className="text-xs mt-[28px]">
        <h2 className="text-[#495057] text-xs font-[600]">
          Delete your Account
        </h2>
        <p className="mt-2">
          You can <span className="text-red-500"> Delete your account </span>{" "}
          but you should note that it is irreversible.
        </p>
        <span>Be sure you want to do that.</span>
      </div>
    </div>
  );
};

export default ProfileSetting;
