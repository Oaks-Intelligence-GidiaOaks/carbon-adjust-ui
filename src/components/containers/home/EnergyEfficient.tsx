import { FC } from "react";
import ProductsCategory from "@/components/reusables/ProductsCategory";
import products from "../../../dummy/products.json";

const EnergyEfficient: FC = () => {
  return (
    <div>
      <ProductsCategory
        category="Energy-Efficient Products"
        products={products}
      />
    </div>
  );
};

export default EnergyEfficient;
