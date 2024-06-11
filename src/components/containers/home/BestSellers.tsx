import ProductsCategory from "../../reusables/ProductsCategory";
import { useQuery } from "@tanstack/react-query";
import { getBestSellerPackages } from "@/services/homeOwner";
import { transformCategoryPackages } from "@/utils/reshape";

const BestSellers = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["get-best-sellers"],
    queryFn: () => getBestSellerPackages(),
  });

  const pkgs = isSuccess ? transformCategoryPackages(data.data.packages) : [];

  return (
    <div className="pb-[70px] pt-[37px]">
      <ProductsCategory category="Best Sellers" products={pkgs} />
    </div>
  );
};

export default BestSellers;
