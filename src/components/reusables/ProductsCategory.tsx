import { IProdCategory } from "@/interfaces/product.interface";
import ProductCard from "./ProductCard";
import GrantCard from "./GrantCard";

const ProductsCategory = (props: IProdCategory) => {
  const isGrantCategory = props.category.name.toLowerCase() === "grant";
  console.log('data', props)

  return (
    <div className="flex flex-col w-full gap-[48px] mx-auto max-w-[90vw] md:max-w-[650px] pr-3 lg:max-w-[850px] xl:max-w-[1100px] md:ml-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 items-stretch lg:space-x-5 w-full no-scrollbar">
        {props.packages &&
          props.packages.map((pkg) =>
            isGrantCategory ? (
              <GrantCard {...pkg} key={pkg._id} category={pkg.category} />
            ) : (
              <ProductCard {...pkg} key={pkg._id} category={pkg.category} />
            )
          )}
      </div>
    </div>
  );
};

export default ProductsCategory;
