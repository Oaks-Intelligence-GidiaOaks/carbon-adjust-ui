import { Package } from "@/types/product";
import { FaStar } from "react-icons/fa";

const NewPackageCard = (props: Package) => {
  return (
    <div className="min-w-[200px] max-w-[262px] flex flex-col bg-white shrink-0">
      <div className="bg-[#F3F5F7] grid place-items-center h-[300px]  ">
        <img
          src={props.image ?? "/assets/graphics/pkg-1.png}"}
          alt=""
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-1 mt-3">
        <div className="flex-center gap-1">
          {Array.from({ length: props?.rating || 0 }, (_, i) => (
            <FaStar size={13.94} key={i} color="#0E89F7" />
          ))}
        </div>

        <h2 className="text-xs font-[600]">{props.title}</h2>
        <h2 className="text-xs font-[600]">{props.price}</h2>

        <button className="font-[500] mt-1 text-white text-xs bg-[#139EEC] w-[70px] h-[20px] rounded-[16px] text-center grid place-items-center">
          <span>Publish</span>
        </button>
      </div>
    </div>
  );
};

export default NewPackageCard;
