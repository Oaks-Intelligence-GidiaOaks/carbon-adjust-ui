import { FC, useEffect, useState } from "react";
// import { FaStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const DashboardBanner: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  const freebies = [
    {
      id: 1,
      image: "/assets/banners/banner-1.png",
      // name: "Skullcandy - Rail True Wireless Earbuds",
      // cost: "$79.99",
      header:
        "CONTRIBUTE TO OUR ONGOING RESEARCH ON LEVERAGING AI TO GENERATE HOME ENERGY SURVEYS",
      text: "Get a £20 voucher and a complimentary access to Pavlos when it launches by simply uploading a 1 year energy bill or a home energy plan (if you've got one). £20 max per household applies",
    },
    {
      id: 2,
      image: "/assets/banners/banner-2.png",
      // name: "Second carousel element",
      // cost: "$79.99",
      header:
        "SPEAK TO AN EXPERT ON DOMESTIC RETROFIT AND GET CLARITY ON WHAT OPTIONS ARE AVAILABLE",
      text: "Schedule a call back session with Artemis and speak for up to 30 minutes with a retrofit expert. 1 call session max per household applies",
    },
    {
      id: 3,
      image: "/assets/banners/banner-3.png",
      // name: "Third carousel element",
      // cost: "$79.99",
      header:
        "GET OUR BESPOKE AND COMPREHENSIVE ON-SITE HOME ENERGY PLAN TODAY",
      text: "Start your home energy efficiency improvement journey today by scheduling a visit from our qualified assessors. Offer is for a limited time",
    },
  ];

  return (
    <div
      style={{
        backgroundImage: "url('/assets/graphics/bannerImg2.svg')",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
      className="h-[80vh] grid place-items-center font-poppins"
    >
      <div className=" lg:min-h-[406px] justify-around text-white flex flex-col-reverse lg:flex-row items-stretch py-[31px] bg-[#1C3D6D] bg-opacity-[0.85] rounded-[10px] mx-auto  w-[95%] lg:w-5/6 xl:gap-[60px] xl:justify-center ">
        {/* {Array.from(freebies, (item) => ( */}
        <div
          // key={item.id}
          className="hidden flex-1 lg:flex-[0.45] flex-col lg:flex gap-y-[15px] my-auto "
        >
          <h2 className="font-[700] text-[20px] ">
            {freebies[currentIndex].header}
          </h2>

          <h4 className="font-[400] text-[18px]">
            {freebies[currentIndex].text}
          </h4>

          <button className="uppercase font-[700] text-base rounded-[24px] w-[194px] blue-gradient py-[14px]">
            See More
          </button>
        </div>
        {/* ))} */}

        <div className="  flex-[0.45] grid place-items-center border-l border-[#A5A5A5] rounded-[10px] pl-[32px] gap-y-3">
          {/* carousel container */}
          <div className="flex w-full">
            {Array.from(freebies, (item, i) => (
              <div
                key={i}
                className={`${
                  i !== currentIndex ? "hidden" : "flex"
                } " flex-1 items-end`}
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-3/4 mx-auto rounded-lg"
                />

                {/* <div className="flex flex-col gap-1 pl-[5px] text-sm lg:text-base">
                  <div className="flex-center text-[7px] font-[600]">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar key={i} color={i === 4 ? "#575757" : "#E99C1B"} />
                    ))}
                  </div>

                  <h4>{item.name}</h4>
                  <h4>{item.cost}</h4>

                  <button className="grid place-items-center w-[70px] h-[21px] text-[6px] rounded-[9px] blue-gradient">
                    <span>Apply</span>
                  </button>
                </div> */}
              </div>
            ))}
          </div>

          {/* carousel indicators */}
          <div className="flex-center w-fit mx-auto gap-2">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className={` ${
                  i === currentIndex ? "bg-[#D9D9D9]" : "bg-[#3D3D3D]"
                }  w-[8px] h-[8px] rounded-full`}
              />
            ))}

            {/* <div className={`bg-[#D9D9D9] w-[8px] h-[8px] rounded-full`} />

            <div className={`bg-[#3D3D3D] w-[8px] h-[8px] rounded-full`} /> */}
          </div>

          <div className="hover:border-b hover:border-white">
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-center gap-[2.67px]"
            >
              <span className="text-[10px]">View more</span>
              <FaArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
