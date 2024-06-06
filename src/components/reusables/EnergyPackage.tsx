import { Product } from "@/types/product";
import { IoStar } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
// type Props = {};

interface Props extends Product {
  orderPackage: () => void;
}

const EnergyPackage = (props: Props) => {
  return (
    <div className="group font-inter min-w-[200px] max-w-[262px] group flex flex-col gap-2">
      {/* top container */}
      <div className="h-[340px] relative flex flex-col  bg-[#F3F5F7]">
        <div
          className={`absolute bg-[#000000] bg-opacity-20 top-0 left-0 h-full w-full group-hover:flex hidden flex-col `}
        >
          <div className="mt-auto mb-4 w-full px-4 grid place-items-center">
            <button
              onClick={() => props.orderPackage()}
              className="font-inter rounded-[24px] w-full h-[46px] text-white blue-gradient"
            >
              <span>Apply</span>
            </button>
          </div>
        </div>
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

      {/* down part */}
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
