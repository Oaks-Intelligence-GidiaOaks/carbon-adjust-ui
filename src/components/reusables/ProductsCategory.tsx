import { IProdCategory } from "@/interfaces/product.interface";
import ProductCard from "./ProductCard";
// import { Product } from "@/types/product";

const ProductsCategory = (props: IProdCategory) => {
  return (
    <div className="flex flex-col w-full gap-[48px] mx-auto max-w-[90vw] md:max-w-[650px] pr-3 lg:max-w-[850px] xl:max-w-[1100px] md:ml-auto">
      <div>
        <h2 className="font-[500] text-[30px]">{props.category.name}</h2>
      </div>

      <div className="flex items-stretch gap-[24px] w-full overflow-x-scroll pb-5 ">
        {props.packages &&
          props.packages.map((pkg) => (
            <ProductCard {...pkg} key={pkg._id} category={pkg.category} />
          ))}
      </div>
    </div>
  );
};

export default ProductsCategory;
