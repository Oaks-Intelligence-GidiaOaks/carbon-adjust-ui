import { IAds } from "@/interfaces/ads.interface";
import { useEffect, useRef } from "react";
// import { IoIosMore } from "react-icons/io";

type Props = Omit<IAds, "file"> & {
  setIsActive: () => void;
  image: string;
};

const AdvertCard = (props: Props) => {
  // const [showPopup, setShowPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const moreIconRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      moreIconRef.current &&
      !moreIconRef.current.contains(event.target as Node)
    ) {
      // setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-[362px] space-y-2 border rounded-lg text-xs px-6 py-1 shadow-md">
      <div className="flex-center justify-between">
        <span className="bg-[#EDEDED] text-[10px] p-[2px] px-2 rounded-xl">
          Public
        </span>

        {/* <div ref={moreIconRef} className="relative ">
          <IoIosMore
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowPopup(!showPopup);
            }}
          />

          {false && (
            <div
              ref={popupRef}
              className="absolute -bottom-13 -left-20 flex flex-col border p-2 font-[400] text-center bg-white shadow-sm rounded-sm w-[100px] space-y-1 text-[10px]"
            >
              <span className="py-[3px] cursor-pointer bg-[#EFF4FF99] rounded-[5px] text-[#414141]">
                Edit Ad
              </span>

              <span className="py-[3px] cursor-pointer bg-[#EFF4FF99] rounded-[5px] text-[#E71D36] ">
                Delete Ad
              </span>
            </div>
          )}
        </div> */}
      </div>

      <div className="h-[135px] w-full">
        <img src={props.image} alt="" className=" " />
      </div>

      <div className="flex-center justify-between">
        <span className="text-xs">{props.description}</span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            data-testid="notification-checkbox"
            type="checkbox"
            className="sr-only peer"
            checked={props.isActive}
            onChange={() => props.setIsActive()}
          />

          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

export default AdvertCard;
