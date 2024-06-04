import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

const ProductsCategory = (props: { category: string; products: Product[] }) => (
  <div className="flex flex-col w-full gap-[48px] lg:max-w-[850px] xl:max-w-[1100px] ml-auto">
    <div>
      <h2 className="font-[500] text-[30px]">{props.category}</h2>
    </div>

    <div className="flex items-stretch gap-[24px] w-full overflow-x-scroll pb-5 ">
      {Array.from(props.products, (item, i) => (
        <ProductCard {...item} key={i} />
      ))}
    </div>
  </div>
);

export default ProductsCategory;
