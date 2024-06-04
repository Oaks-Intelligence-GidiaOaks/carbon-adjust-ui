import { FC } from "react";
import ProductsCategory from "@/components/reusables/ProductsCategory";
import products from "../../../dummy/products.json";

const Retrofit: FC = () => {
  return (
    <div>
      <ProductsCategory
        category="Retrofit specialist 
        services"
        products={products}
      />
    </div>
  );
};

export default Retrofit;
