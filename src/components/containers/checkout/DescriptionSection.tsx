import ProductCard from "@/components/reusables/ProductCard";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { FaPlay } from "react-icons/fa";
import UseScrollToTop from "@/hooks/useScrollToTop";
import SocketService from "@/repository/socket";
import {
  IOrderSummaryEventPayload,
  MonitoringEvent,
  SubLevelEvent,
} from "@/interfaces/events.interface";
// import Rating from "../../reusables/Rating";

const DescriptionSection = (props: {
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
  setShowCancel: Dispatch<SetStateAction<boolean>>;
}) => {
  const prod = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.user);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const scrollRef = useRef();

  // @ts-ignore
  const isVideo = Boolean(prod.videoUrl);

  const videoRef = useRef<HTMLVideoElement>();

  const handleVideoControl = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    } else if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleVideoEnded = () => {
      setIsPlaying(false);
    };

    if (videoElement) {
      videoElement?.play();
      setIsPlaying(true);
      videoElement.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, []);

  UseScrollToTop(scrollRef);

  const orderSummaryEventPayload: IOrderSummaryEventPayload = {
    packageId: prod._id,
    packageName: prod.title,
    pakageType: prod.packageType,
    packageCategory: prod.category?.name as string,
    packagePrice: Number(prod.price),
    time: Date.now(),
    userId: user?._id as string,
    eventName: SubLevelEvent.ORDER_SUMMARY_EVENT,
  };

  return (
    <div className="lg:max-w-[60vw] xl:max-w-[55vw] lg:ml-auto">
      <div className="flex-center gap-3 justify-between w-full  border-b py-4 px-5 sticky top-0 z-20 bg-white">
        <h2 className="font-[600] text-base">{prod?.category!.name}</h2>

        <span
          className="cursor-pointer"
          onClick={() => props.setShowCancel(true)}
        >
          <GrClose />
        </span>
      </div>

      <div
        className={` ${
          isVideo ? "lg:flex px-3" : "px-6"
        }  flex-col lg:flex-row  `}
      >
        {isVideo && (
          <div className="lg:flex-[0.6] flex-shrink-0 px-3  mt-5 text-[#141718] font-[500] space-y-3 text-sm xl:pl-8">
            {/* @ts-ignore  */}
            <h2>{prod.owner.name ?? ""}</h2>

            <div className="rounded-[20px] pt-2 w-full grid place-items-center relative">
              <video
                className={
                  isPlaying ? `w-full shadow-md rounded-[20px]` : `hidden`
                }
                // @ts-ignore
                ref={videoRef}
                src={prod.videoUrl}
                autoPlay={isPlaying}
                controls
              ></video>

              {!isPlaying && (
                <>
                  <img
                    src="/assets/graphics/video-img.svg"
                    alt=""
                    className=" w-full"
                  />

                  <div
                    onClick={() => handleVideoControl()}
                    className="w-[55px] cursor-pointer h-[55px] grid place-items-center rounded-full bg-white absolute"
                  >
                    <FaPlay />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="lg:flex-[0.4] w-[300px]  md:w-[360px] py-[15px] flex flex-col gap-[15px] z-10 min-h-[75vh]">
          {/* @ts-ignore */}
          <h2 ref={scrollRef} className="text-center font-[600] text-lg ">
            Checkout
          </h2>

          <div className=" mx-auto">
            <ProductCard {...prod!} isMerchant wrapText />
          </div>

          <div className="gap-y-3 font-inter flex-1 flex flex-col">
            <h2 className="font-[600] text-base text-[#141718]">
              Product Description
            </h2>

            <p className="font-[500] text-sm">{prod?.description}</p>

            {/* <Rating /> */}

            <div className="flex-center gap-1 pt-2 !mt-auto">
              <button
                onClick={() => {
                  SocketService.emit(
                    MonitoringEvent.NEW_SUBLEVEL_EVENT,
                    orderSummaryEventPayload
                  );

                  props.setStage(2);
                }}
                className="rounded-[12px] font-poppins w-full blue-gradient text-center text-white hover:bg-gradient-to-t h-[46px] text-sm"
              >
                <span>Proceed</span>
              </button>

              <button
                onClick={() => props.setShowCancel(true)}
                className="rounded-[12px] font-poppins w-full blue-gradient text-center text-white hover:bg-gradient-to-t h-[46px] text-sm "
              >
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
