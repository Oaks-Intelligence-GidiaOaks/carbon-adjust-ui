import { getFeaturedAds } from "@/services/adminService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Props = {};

const Promotion = (_: Props) => {
  // const [visibleDiv, setVisibleDiv] = useState(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { data } = useQuery({
    queryKey: ["Featured Ads"],
    queryFn: () => getFeaturedAds(),
  });

  const promotionCards = data?.data || [];
  // console.log(data?.data, "-----------");

  useEffect(() => {
    if (promotionCards.length === 0) return;

    const { exposureTime } = promotionCards[currentIndex];
    if (!exposureTime) return;

    const duration = Number(exposureTime) * 1000;
    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promotionCards.length);
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentIndex, promotionCards]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setVisibleDiv((prevVisibleDiv) => (prevVisibleDiv === 1 ? 2 : 1));
  //   }, 5000); // Change div every 5 seconds

  //   return () => clearInterval(interval);
  // }, []);

  // const TimeCard = (props: { time: string; text: string }) => {
  //   return (
  //     <div className="flex flex-col justify-center">
  //       <div className="h-[47px] w-[47px] bg-white text-[#141718] text-[26px] font-[500] grid place-items-center">
  //         <span>{props.time}</span>
  //       </div>

  //       <h5 className="text-[9.4px] font-[400] text-center">{props.text}</h5>
  //     </div>
  //   );
  // };

  return (
    <div className="flex overflow-hidden h-[400px] border #121212 bg-[#EDF6FD]">
      {promotionCards.map((it: any, i: number) => (
        <div
          key={it._id}
          className={` flex-1 h-[400px] ${
            i === currentIndex ? "opacity-100 block" : "opacity-0 hidden"
          }`}
          style={{
            backgroundImage: `url('${it.bannerImage}')`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
      ))}

      {/* <div
        className={` flex-1 h-[400px] ${
          visibleDiv === 1 ? "opacity-100 block" : "opacity-0 hidden"
        }`}
        style={{
          backgroundImage: "url('/assets/banners/ad-banner-01.svg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      /> */}

      {/* <div
        style={{
          backgroundImage: "url('/assets/banners/ad-banner-02.svg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
        className={`transition-opacity duration-[2500ms] ${
          visibleDiv === 2 ? "opacity-100 block" : "opacity-0 hidden"
        } flex-1 h-[400px]`}
      /> */}

      {/* <h5 className="text-[#377DFF] text-xs font-[600]">PROMOTION</h5>

        <div className="flex-center text-[#121212] gap-1 flex-col md:flex-row items-center">
          <span>Hurry up!</span>{" "}
          <span className="text-[#FA2222]"> 40% OFF</span>
        </div>

        <h3 className="text-[15px] font-[400]">
          Thousands of high tech are waiting for you
        </h3>

        <h6 className="text-xs font-[400]">Offer expires in:</h6>

        <div className="flex-center gap-3 mx-auto md:mx-0 w-fit">
          <TimeCard text="Days" time="02" />
          <TimeCard text="Hours" time="12" />
          <TimeCard text="Minutes" time="45" />
          <TimeCard text="Seconds" time="05" />
        </div>

        <button className=" mx-auto md:mx-0 blue-gradient cursor-pointer uppercase text-white grid place-items-center text-base font-[700] rounded-[24px] w-[194px] h-[50px]">
          <span>Shop Now</span>
        </button> */}
      {/* </div> */}
    </div>
  );
};

export default Promotion;
