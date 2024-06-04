import { GrClose } from "react-icons/gr";
import ProductCard from "./ProductCard";
import products from "../../dummy/products.json";
import Backdrop from "./Backdrop";
import { useState } from "react";

type Props = {};

const DescriptionSection = (props: {}) => (
  <div>
    <div className="flex-center justify-between w-full  border-b py-4 px-7">
      <h2 className="font-[600] text-lg">Home Energy Package</h2>

      <span>
        <GrClose />
      </span>
    </div>

    <div className="py-[15px] flex flex-col gap-[15px]">
      <h2 className="text-center font-[600] text-lg ">Checkout</h2>

      <ProductCard {...products[0]} />

      <div className="space-y-3 px-5 ">
        <h2 className="font-[600] text-base text-[#141718]">
          Product Description
        </h2>

        <p className="font-[500] text-xs">
          Lorem ipsum dolor sit amet consectetur. Ultrices ac elementum neque
          fermentum. Vitae nisl rhoncus varius odio felis egestas. Pretium
          porttitor orci diam magna libero faucibus orci ultricies magna. Dolor
          libero malesuada sit vitae. Velit leo vehicula viverra mauris ut eget
          risus massa porta. A.
        </p>

        <button className="rounded-[12px] w-full blue-gradient text-center text-white hover:bg-gradient-to-t h-[46px]">
          <span>Proceed</span>
        </button>
      </div>
    </div>
  </div>
);

const ProductCheckout = (props: Props) => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <Backdrop setShow={setShow} show={show}>
      <div className="max-w-[480px] max-h-[92vh] overflow-y-scroll pb-[30px]">
        <DescriptionSection />
      </div>
    </Backdrop>
  );
};

export default ProductCheckout;
