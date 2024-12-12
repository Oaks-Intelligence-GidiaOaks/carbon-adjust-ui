import { IProdCategory } from "@/interfaces/product.interface";
import ProductCard from "./ProductCard";


const ProductsCategory = (props: IProdCategory) => {

  console.log('data', props)

  return (
    <div className="flex flex-col w-full gap-[48px] mx-auto  pr-3  md:ml-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 items-stretch lg:space-x-5 w-full no-scrollbar" 
      >
        {props.packages &&
          props.packages.map((pkg) =>
              <ProductCard {...pkg} key={pkg._id} category={pkg.category} />
          )}
      </div>
    </div>
  );
};

export default ProductsCategory;
