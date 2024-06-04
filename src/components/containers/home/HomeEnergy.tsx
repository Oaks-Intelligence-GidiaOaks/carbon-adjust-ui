import { FC } from "react";
import products from "../../../dummy/products.json";
import ProductsCategory from "@/components/reusables/ProductsCategory";

const HomeEnergy: FC = () => {
  return (
    <div>
      <ProductsCategory category="Home Energy Plans" products={products} />
    </div>
  );
};

export default HomeEnergy;
