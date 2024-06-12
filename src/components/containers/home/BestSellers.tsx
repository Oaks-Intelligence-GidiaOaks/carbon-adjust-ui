import ProductsCategory from "../../reusables/ProductsCategory";
// import products from "../../../dummy/products.json";
import { useQuery } from "@tanstack/react-query";
import { getBestSellerPackages } from "@/services/homeOwner";
// import { transformCategoryPackages } from "@/utils/reshape";
import { IProduct } from "@/interfaces/product.interface";

const BestSellers = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["get-best-sellers"],
    queryFn: () => getBestSellerPackages(),
  });

  const pkgs: IProduct[] = isSuccess ? data.data.packages : [];

  const category = {
    name: "Best Sellers",
    slug: "best-sellers",
  };

  return (
    <div className="pb-[70px] pt-[37px]">
      <ProductsCategory category={category} packages={pkgs} />
    </div>
  );
};

export default BestSellers;
