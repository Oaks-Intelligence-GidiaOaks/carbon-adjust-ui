import { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";

import CarbonAdjustLogo from "../../../assets/icons/CarbonAdjustLogo.svg";
// import SettingIcon from "../../../assets/icons/setting.svg";
// import BellIcon from "../../../assets/icons/bell.svg";
import UserIcon from "../../../assets/icons/User.svg";
import footerImg from "../../../assets/images/footerImg.png";
import { Link } from "react-router-dom";
import VideoContainer from "@/components/containers/home/VideoContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

// this is the landing page the home owner and merchant sees after login contaning the video  playback

const DashboardLanding: FC = () => {
  const kommunitaToken = useSelector(
    (state: RootState) => state.user.kommunitaToken
  );

  return (
    <>
      {/* header */}
      <div className="flex-center py-[13.13px] px-[50px]">
        <Link to="/dashboard">
          <div className="flex-center gap-[10px]">
            {/* CA logo */}
            <img src={CarbonAdjustLogo} alt="" />

            <IoIosArrowDown size={15} color="#0B8DFF" />
          </div>
        </Link>

        <div className="flex-center md:flex-[0.4] ml-auto">
          <Link to={``}>
            <img
              className="hidden md:inline-flex"
              src="/assets/graphics/kommunita-logo.svg"
              alt=""
              onClick={() =>
                window.location.assign(
                  `https://kommunita-web.netlify.app/home?token=${kommunitaToken}`
                )
              }
            />
          </Link>

          <div className="flex-center gap-2  ml-auto">
            {/* <img src={SettingIcon} alt="" className="h-4 w-4" />
            <img src={BellIcon} alt="" className="h-4 w-4" /> */}
            <Link to={`/dashboard/profile`}>
              <div className="h-[34px] w-[34px] border rounded-full grid place-items-center ">
                <img src={UserIcon} alt="" className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <VideoContainer
        videoSrc="https://firebasestorage.googleapis.com/v0/b/ca-test-7062e.appspot.com/o/Oaks%20Intelligence%20Carbon-Adjust%20Prototype%20Video.mp4?alt=media&token=d10efec3-7e24-4f65-8f7e-c400f0e25e09"
        coverImage="/assets/graphics/energy-004.jpg"
      />

      <div className="mx-auto w-fit mt-[15px]">
        <Link to="/dashboard">
          <button className="h-[56px] w-[289px] rounded-[30px] bg-gradient-to-b from-[#139EEC] to-[#3465AF] hover:bg-gradient-to-t text-white text-sm leading-[17.5px] font-[700]">
            <span>Start now</span>
          </button>
        </Link>
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
