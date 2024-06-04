import { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";

import CarbonAdjustLogo from "../../../assets/icons/CarbonAdjustLogo.svg";
import SettingIcon from "../../../assets/icons/setting.svg";
import BellIcon from "../../../assets/icons/bell.svg";
import UserIcon from "../../../assets/icons/User.svg";
import footerImg from "../../../assets/images/footerImg.png";

// this is the landing page the home owber sees after login contaning the video  playback

const DashboardLanding: FC = () => {
  return (
    <>
      {/* header */}
      <div className="flex-center py-[13.13px] px-[50px]">
        <div className="flex-center gap-[10px]">
          {/* CA logo */}
          <img src={CarbonAdjustLogo} alt="" />

          <IoIosArrowDown size={15} color="#0B8DFF" />
        </div>

        <div className="flex-center gap-2 border ml-auto">
          <img src={SettingIcon} alt="" className="h-4 w-4" />
          <img src={BellIcon} alt="" className="h-4 w-4" />

          <div className="h-[34px] w-[34px] border rounded-full grid place-items-center ">
            <img src={UserIcon} alt="" className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundPosition: "center center",
          backgroundImage:
            "url('https://s3-alpha-sig.figma.com/img/221b/5f82/6ab7ac92b8ea3ba9d528aa57407216cd?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kDQacdpe5EXjeMEOvIUV7KHgeXTZ6dMFABYGkxrwxaM7J-uxg76jB4wlVUIaYYBfP9pSngwEi~T5zEaUsgf-hOC0YYxXVHQvUkLn5F916biKcTbKEbnGMM382KdnaAjgwhbubJ5NyOl~SMnsFVZHOIRL~zogsLTluMvi--aXNzQSAB1CxQ9mSE1-Ru34953XEMRPBLn5eAMPQU2BDxkxuf8cdj9YZtr9PiI2vjJ~xJ02-NCLFnGIasTvFUaTL7QtIZR3u-UWUUPuQFtW6OQt6AATR3hl3mUfV9on-JitsbgNUq9fHB9MURdqmwSTG44lqjGeUYigZRzPds80FTWXIA__')",
        }}
        className="h-[448px] bg-cover"
      >
        {/*  */}
        {/*  */}
      </div>

      <div className="mx-auto w-fit mt-[15px]">
        <button className="h-[56px] w-[289px] rounded-[30px] bg-gradient-to-b from-[#139EEC] to-[#3465AF] hover:bg-gradient-to-t text-white text-sm leading-[17.5px] font-[700]">
          <span>Start now</span>
        </button>
      </div>

      <p className="font-[500] text-base leading-[24px] text-center font-poppins mt-[35px] w-2/3 mx-auto">
        “From 1990 to 2019, the total warming effect from greenhouse gases added
        by humans to the Earth's atmosphere increased by 45 percent. The warming
        effect associated with carbon dioxide alone increased by 36 percent.”
      </p>

      <footer>
        <img src={footerImg} alt="" />
      </footer>
    </>
  );
};

export default DashboardLanding;
