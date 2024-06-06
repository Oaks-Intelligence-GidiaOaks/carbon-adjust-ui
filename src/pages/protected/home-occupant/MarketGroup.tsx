// import React from "react";
import Promotion from "@/components/containers/Promotion";
import product from "../../../dummy/products.json";

import ProductCheckout from "@/components/reusables/ProductCheckout";
import EnergyPackage from "@/components/reusables/EnergyPackage";
import { useState } from "react";

// this page is for a group of related products e.g Home energy Plans

type Props = {};

const MarketGroup = (_: Props) => {
  const [showCheckout, setShowcheckout] = useState<boolean>(false);

  return (
    <div className="relative ">
      <div className="h-[150px] bg-[#F5FAFF] flex items-center lg:pl-[50px]">
        <h2 className="font-[500] text-xl">Home Energy Plans</h2>
      </div>

      <div className="mt-[40px] flex items-stretch gap-[48px]">
        {Array.from(product.slice(0, 3), (item, i) => (
          <EnergyPackage orderPackage={() => {}} {...item} key={i} />
        ))}
      </div>

      <div className="mt-[48px]">
        <Promotion />
      </div>

      <div className="flex items-stretch gap-[48px] mt-[48px]">
        {Array.from(product.slice(0, 1), (item, i) => (
          <EnergyPackage
            orderPackage={() => console.log("clciked")}
            {...item}
            key={i}
          />
        ))}
      </div>

      <ProductCheckout
        setShowcheckout={setShowcheckout}
        showCheckout={showCheckout}
      />
    </div>
  );
};

export default MarketGroup;
