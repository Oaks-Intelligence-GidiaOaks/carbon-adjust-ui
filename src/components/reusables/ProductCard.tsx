import { Product } from "@/types/product";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = (props: Product) => {
  return (
    <div className="min-w-[228px] group">
      <div className="relative ">
        <span className="absolute top-[13px] left-[13px] w-[55px] h-[20px] grid place-items-center bg-[#BE0B0D] text-white text-[13.94px] font-[700] rounded-[3.31px]">
          <span>Hot</span>
        </span>

        <div className="relative">
          <div className="hidden group-hover:flex flex-col  absolute top-0 left-0 w-full h-full bg-[#000000] bg-opacity-20 ">
            <div className="mx-auto mt-auto h-fit pb-[16px] grid place-items-center w-full">
              <Link className="w-5/6" to={"/dashboard/marketplace/group"}>
                <button className=" blue-gradient w-full rounded-[24px] h-[40px] text-center text-white text-base font-[500]">
                  Apply
                </button>
              </Link>
            </div>
          </div>

          <img src={props.image} alt="" className="w-full " />
        </div>

        <div className="gap-[3px] mt-1 flex flex-col">
          <div className="flex-center gap-1">
            {Array.from({ length: props.rating }, (_, i) => (
              <FaStar size={13.94} key={i} color="#0E89F7" />
            ))}
          </div>

          <h2 className="text-xs font-[600] ">{props.name}</h2>

          <h2 className="text-xs font-[600] ">{props.cost}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
