import { Product } from "@/types/product";
import ProductsCategory from "../../reusables/ProductsCategory";
import products from "../../../dummy/products.json";
import { FC } from "react";

const BestSellers: FC = () => {
  return (
    <div className="pb-[70px] pt-[37px]">
      <ProductsCategory category="Best Sellers" products={products} />
    </div>
  );
};

export default BestSellers;
