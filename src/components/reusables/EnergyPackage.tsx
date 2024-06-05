import { Product } from "@/types/product";
import { FaStar } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
// type Props = {};

const EnergyPackage = (props: Product) => {
  return (
    <div className="font-inter min-w-[200px] group flex flex-col gap-2">
      <div className="h-[340px] relative flex flex-col  bg-[#F3F5F7]">
        <div className="flex-center justify-between p-4">
          <div className="w-fit space-y-2 flex flex-col">
            <span className="bg-white rounded-[4px] p-1 text-xs uppercase font-[600] text-center px-[14px]">
              NEW
            </span>

            <span className="bg-[#0E89F7] px-[14px] rounded-[4px] p-1 text-xs uppercase font-[600] text-center text-white">
              -50%
            </span>
          </div>

          <div className="h-[32px] w-[32px] rounded-full bg-white grid place-items-center ">
            <MdFavoriteBorder color="" size={20} />
          </div>
        </div>

        <img
          src="/assets/graphics/user1.svg"
          className="h-[140px] w-[[140px] mt-[28px]"
          alt="image "
        />
      </div>

      <div className="gap-[5px] mt-1 flex flex-col">
        <div className="flex-center gap-1">
          {Array.from({ length: props.rating }, (_, i) => (
            <IoStar size={13.94} key={i} color="#0E89F7" />
          ))}
        </div>

        <h2 className="text-base font-[600] font-inter ">{props.name}</h2>

        <h2 className="text-base font-[600] ">{props.cost}</h2>
      </div>
    </div>
  );
};

export default EnergyPackage;
