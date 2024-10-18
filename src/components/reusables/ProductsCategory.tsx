import { IProdCategory } from "@/interfaces/product.interface";
import ProductCard from "./ProductCard";
import { GrLinkNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import GrantCard from "./GrantCard";

const ProductsCategory = (props: IProdCategory) => {
  const isGrantCategory = props.category.name.toLowerCase() === "grant";

  return (
    <div className="flex flex-col w-full gap-[48px] mx-auto max-w-[90vw] md:max-w-[650px] pr-3 lg:max-w-[850px] xl:max-w-[1100px] md:ml-auto">
      <div className="flex-center justify-between">
        <h2 className="font-[500] text-lg md:text-[30px]">
          {props.category.name}
        </h2>

        <Link
          to={`/dashboard/marketplace/${props.category.slug}`}
          className="w-fit flex-center gap-2 text-blue-400 underline"
        >
          <button className="text-sm md:text-base min-w-[100px]">
            View more
          </button>
          <GrLinkNext />
        </Link>
      </div>

      <div className="flex items-stretch gap-[24px] w-full overflow-x-scroll pb-5 no-scrollbar">
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
