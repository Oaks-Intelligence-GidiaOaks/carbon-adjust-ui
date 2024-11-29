;import ProductsCategory from "../reusables/ProductsCategory";
// import products from "../../../dummy/products.json";
import { useQuery } from "@tanstack/react-query";
import { getBestSellerPackages } from "@/services/homeOwner";
// import { transformCategoryPackages } from "@/utils/reshape";
import { IProduct } from "@/interfaces/product.interface";
import CategoriesLoading from "@/components/reusables/CategoriesLoading";

const RelatedProductCategory = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-best-sellers"],
    queryFn: () => getBestSellerPackages(),
  });

  const pkgs: IProduct[] = isSuccess ? data.data.packages : [];

  const category = {
    name: "Best Sellers",
    slug: "best-sellers",
  };

  if (isLoading) {
    return <CategoriesLoading />;
  }

  return (
    <div className="pb-[10px] pt-[5px]">
      <div className="w-full mx-auto max-w-[90vw] md:max-w-[650px] mb-10 pr-3 lg:max-w-[850px] xl:max-w-[1100px] md:ml-auto">
      <p className="text-lg font-medium text-[#7F7F7F] border-b pb-3">Related Products</p>
      </div>
      <ProductsCategory category={category} packages={pkgs} />
    </div>
  ); 
};

export default RelatedProductCategory;

