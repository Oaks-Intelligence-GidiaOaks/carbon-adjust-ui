import ProductsCategory from "@/components/reusables/ProductsCategory";
import { FC } from "react";
import products from "../../../dummy/products.json";

const EnergySaving: FC = () => {
  return (
    <div>
      <ProductsCategory
        category="Energy-Saving 
        Advisory"
        products={products}
      />
    </div>
  );
};

export default EnergySaving;
