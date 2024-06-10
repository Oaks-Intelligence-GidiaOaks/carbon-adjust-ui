import { useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { addProduct } from "@/features/productSlice";

const ProductsCategory = (props: { category: string; products: Product[] }) => {
  const dispatch = useDispatch();

  const checkout = (item: Product) => {
    dispatch(addProduct(item));
  };

  return (
    <div className="flex flex-col w-full gap-[48px] mx-auto max-w-[90vw] md:max-w-[650px] pr-3 lg:max-w-[850px] xl:max-w-[1100px] md:ml-auto">
      <div>
        <h2 className="font-[500] text-[30px]">{props.category}</h2>
      </div>

      <div className="flex items-stretch gap-[24px] w-full overflow-x-scroll pb-5 ">
        {Array.from(props?.products, (item, i) => (
          <ProductCard {...item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default ProductsCategory;
