import { IAds } from "@/interfaces/ads.interface";
import { getHeroAds } from "@/services/adminService";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
// import { FaStar } from "react-icons/fa";
// import { FaArrowRight } from "react-icons/fa6";

interface IHeroAds extends IAds {
  bannerImage: string;
}

const DashboardBanner: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { data } = useQuery({
    queryKey: ["Hero Ads"],
    queryFn: () => getHeroAds(),
  });

  const freebies: IHeroAds[] = data?.data ?? [];

  useEffect(() => {
    if (Boolean(freebies?.length === 0)) return;

    const { exposureTime } = freebies![currentIndex];
    if (!exposureTime) return;

    const duration = Number(exposureTime) * 1000;

    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % freebies!.length);
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentIndex, freebies]);

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
            {freebies[currentIndex]?.title}
          </h2>

          <h4 className="font-[400] text-[18px]">
            {freebies[currentIndex]?.description}
          </h4>

          <button className="uppercase font-[700] text-base rounded-[24px] w-[194px] blue-gradient py-[14px]">
            {freebies[currentIndex]?.ctaText || "See More"}
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
                  src={item?.bannerImage}
                  alt=""
                  className="w-2/3 mx-auto rounded-lg"
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
            {Array.from({ length: freebies.length }, (_, i) => (
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

          {/* <div className="hover:border-b hover:border-white">
            <a
              // href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-center gap-[2.67px]"
            >
              <span className="text-[10px]">View more</span>
              <FaArrowRight size={13} />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
