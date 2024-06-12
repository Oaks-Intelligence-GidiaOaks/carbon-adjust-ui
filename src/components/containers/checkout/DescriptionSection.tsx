import ProductCard from "@/components/reusables/ProductCard";
import { Dispatch, SetStateAction } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
// import { formatSlug } from "@/lib/utils";
import { clearProduct } from "@/features/productSlice";
import { clearOrder } from "@/features/orderSlice";

const DescriptionSection = (props: {
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
}) => {
  const prod = useSelector((state: RootState) => state.product);

  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="flex-center justify-between w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <h2 className="font-[600] text-lg">{prod?.category!.name}</h2>

        <span
          className="cursor-pointer"
          onClick={() => {
            dispatch(clearProduct());
            dispatch(clearOrder());
            props.setShowcheckout(false);
          }}
        >
          <GrClose />
        </span>
      </div>

      <div className="py-[15px] flex flex-col gap-[15px] z-10">
        <h2 className="text-center font-[600] text-lg ">Checkout</h2>

        <div className=" mx-auto">
          <ProductCard {...prod!} isMerchant />
        </div>

        <div className="space-y-3 px-5 font-inter">
          <h2 className="font-[600] text-base text-[#141718]">
            Product Description
          </h2>

          <p className="font-[500] text-sm">{prod?.description}</p>

          <button
            onClick={() => props.setStage(2)}
            className="rounded-[12px] font-poppins w-full blue-gradient text-center text-white hover:bg-gradient-to-t h-[46px]"
          >
            <span>Proceed</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
