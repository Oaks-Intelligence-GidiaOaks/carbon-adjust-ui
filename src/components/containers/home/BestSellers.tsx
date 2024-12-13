import ProductsCategory from "../../reusables/ProductsCategory";
import { useQuery } from "@tanstack/react-query";
import { getBestSellerPackages } from "@/services/homeOwner";
import { IProduct } from "@/interfaces/product.interface";
import CategoriesLoading from "@/components/reusables/CategoriesLoading";


const BestSellers = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-best-sellers"],
    queryFn: () => getBestSellerPackages(),
  });

  const pkgs: IProduct[] = isSuccess ? data.data.packages : [];

  console.log('pkgs', pkgs)

  const category = {
    name: "Best Sellers",
    slug: "best-sellers",
  };

  if (isLoading) {
    return <CategoriesLoading />;
  }

  return (
  
     

      <section className="py-8 ">
      <div className="container mx-auto px-4 font-inter">
        <div className="lg:flex justify-between items-center mb-6 container">
        <div className="lg:flex  gap-2 items-center ">
          <h2 className="text-2xl font-semibold ">Best Sellers</h2>
          <span className="text-gray-600 text-sm mt-1 font-sans">
            Deals end in <span className="bg-[#BFDCFF] px-3 py-2">16d : 2h : 57m : 23s</span>
          </span>
        </div>
        </div>

        <div className="">
      
            <ProductsCategory category={category} packages={pkgs} />
      
        </div>


      </div>
    </section>

  ); 
};

export default BestSellers;
