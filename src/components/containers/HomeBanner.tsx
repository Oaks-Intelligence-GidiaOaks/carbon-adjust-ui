import { Link } from "react-router-dom";
import { Button } from "../ui";

const HomeBanner = () => {
  const handleClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <Link to="/dashboard/marketplace/energy-saving-advisory">
      <div className="font-poppins bg-[#edf6fda4] flex flex-col relative h-[500px] overflow-hidden md:pl-6 xl:pl-24 cursor-pointer">
        <img
          src="/assets/banners/dots-img.svg"
          className="w-[500px] absolute top-0 right-0  z-[20]"
          alt=""
        />

        <img
          src="/assets/banners/dots-left.svg"
          className="absolute bottom-0 lg:top-0 left-0  z-[5]"
          alt="test"
        />

        <img
          src="/assets/banners/Contioveo_Head_Girl_2 1.svg"
          alt="ggg"
          className="z-[30] absolute -bottom-4 right-10 w-60 lg:w-auto "
        />

        <img
          src="/assets/banners/slant-blue.svg"
          alt=""
          className="z-[10] absolute top-0 -right-10 lg:right-0"
        />

        <div className="z-[50] relative my-auto  lg:w-[45%] tracking-tight text-center md:text-left">
          <h2 className="bg-gradient-to-tr from-[#2E599A] to-[#0B8DFF] text-transparent bg-clip-text font-[700] text-[30px] lg:text-[50px]  lg:leading-[60px] tracking-tight drop-shadow-md">
            Book your consultation now
          </h2>

          <h5 className="text-[#4C5660] font-[500] text-[23.14px] ">
            Energy efficiency starts here.
          </h5>

          <Button
            onClick={handleClick}
            size={"lg"}
            className="rounded-xl text-base mt-5"
          >
            <span>Start now</span>
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default HomeBanner;
