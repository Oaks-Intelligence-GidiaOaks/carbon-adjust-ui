import ProfileForm from "@/components/containers/ProfileForm";
import ProfileSetting from "@/components/containers/ProfileSetting";
import { IComponentMap } from "@/types/general";
import { FC, useState } from "react";

const Profile: FC = () => {
  const [setting, setSetting] = useState<string>("security");

  const getCurrentPage: IComponentMap = {
    form: <ProfileForm />,
    security: <ProfileSetting />,
  };

  const changeProfileTab = (tab: string): void => {
    setSetting(tab);
  };

  let activeStyle = `border-l-4 border-[#139EEC] `;

  return (
    <div className="flex font-poppins">
      <div className="border flex-[0.3] bg-[#F8F9FA] px-3 pt-[35px]">
        <div className="space-y-[4px]">
          <div
            onClick={() => changeProfileTab("form")}
            className={`font-[600] bg-white text-sm leading-[21px] text-[#495057] px-[17px] p-[13px] cursor-pointer ${
              setting === "form" && activeStyle
            }`}
          >
            <span>Photo and Contact</span>
          </div>

          <div
            onClick={() => changeProfileTab("security")}
            className={`font-[600] bg-white text-sm leading-[21px] text-[#495057] px-[17px] p-[13px] cursor-pointer ${
              setting === "security" && activeStyle
            }`}
          >
            <span>Security</span>
          </div>
        </div>

        <div className="bg-white border px-[25px] py-[38px] flex flex-col items-center rounded-[10px] drop-shadow-sm mt-[100px]">
          <div>
            <h4>Profile complete</h4>

            <p>You have access to financial aid. Start Application now.</p>
          </div>

          <div className="mt-[60px] space-y-[7px] w-full">
            <h5>Profile Completeness</h5>
            <div className="flex-center gap-[7px]">
              <span className="h-[6px] w-[29px] bg-[#1BAF9E] rounded-[2px]" />
              <span className="h-[6px] w-[29px] bg-[#1BAF9E] rounded-[2px]" />
              <span className="h-[6px] w-[29px] bg-[#1BAF9E] rounded-[2px]" />
              <span className="h-[6px] w-[29px] bg-[#1BAF9E] rounded-[2px]" />
              <span className="h-[6px] w-[29px] bg-[#1BAF9E] rounded-[2px]" />
            </div>
            <h5>Account Created</h5>
          </div>

          <button className="bg-[#1BAF9E] h-[36px] mt-[40px] px-[25px] grid place-items-center rounded-[5px] text-white">
            <span className="text-white text-sm">Edit Profile</span>
          </button>
        </div>
      </div>

      {/*  */}
      <div className="flex-[0.5] pl-[40px]">{getCurrentPage[setting]}</div>
    </div>
  );
};

export default Profile;
