import ProductCard from "@/components/reusables/ProductCard";
import { Dispatch, SetStateAction } from "react";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Product } from "@/types/product";
import { formatSlug } from "@/lib/utils";

const DescriptionSection = (props: {
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
}) => {
  const prod: Product | null = useSelector(
    (state: RootState) => state.product.product
  );

  return (
    <div className="">
      <div className="flex-center justify-between w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <h2 className="font-[600] text-lg"> {formatSlug(prod!.slug)} </h2>

        <span
          className="cursor-pointer"
          onClick={() => props.setShowcheckout(false)}
        >
          <GrClose />
        </span>
      </div>

      <div className="py-[15px] flex flex-col gap-[15px] z-10">
        <h2 className="text-center font-[600] text-lg ">Checkout</h2>

        <div className="w-[262px] mx-auto">
          <ProductCard {...prod!} />
        </div>

        <div className="space-y-3 px-5 font-inter">
          <h2 className="font-[600] text-base text-[#141718]">
            Product Description
          </h2>

          <p className="font-[500] text-sm">
            Lorem ipsum dolor sit amet consectetur. Ultrices ac elementum neque
            fermentum. Vitae nisl rhoncus varius odio felis egestas. Pretium
            porttitor orci diam magna libero faucibus orci ultricies magna.
            Dolor libero malesuada sit vitae. Velit leo vehicula viverra mauris
            ut eget risus massa porta. A.
          </p>

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
