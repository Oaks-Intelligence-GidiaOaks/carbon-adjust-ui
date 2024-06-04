import ProductsCategory from "@/components/reusables/ProductsCategory";
import { FC } from "react";
import products from "../../../dummy/products.json";

const HomeImprovement: FC = () => {
  return (
    <div>
      <ProductsCategory
        category="Home Improvement Services"
        products={products}
      />
    </div>
  );
};

export default HomeImprovement;
