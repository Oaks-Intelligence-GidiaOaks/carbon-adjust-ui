// import DashboardBanner from "@/components/containers/DashboardBanner";
import DashboardBanner from "@/components/containers/DashboardBanner";
import Promotion from "@/components/containers/Promotion";
import BestSellers from "@/components/containers/home/BestSellers";
import CategoriesLoading from "@/components/reusables/CategoriesLoading";
// import EnergyEfficient from "@/components/containers/home/EnergyEfficient";
// import EnergySaving from "@/components/containers/home/EnergySaving";
// import HomeEnergy from "@/components/containers/home/HomeEnergy";
// import HomeImprovement from "@/components/containers/home/HomeImprovement";
// import Retrofit from "@/components/containers/home/Retrofit";
// import CategoryProducts from "@/components/reusables/CategoryProducts";
import ProductsCategory from "@/components/reusables/ProductsCategory";
import { clearOrder } from "@/features/orderSlice";
import { clearProduct } from "@/features/productSlice";
import { IProdCategory } from "@/interfaces/product.interface";
import {
  // getAllPackageCategories,
  // getBestSellerPackages,
  // getHomePageFreebies,
  getHomePagePackages,
} from "@/services/homeOwner";
// import // transformCategoryPackages,
// // transformHomePagePackages,
//
// // "@/utils/reshape";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {};

// this is the Main Dashboard page for showing all products in different categries

const Market = (_: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearOrder());
    dispatch(clearProduct());
  }, []);

  const homePagePackages = useQuery({
    queryKey: ["get-home-packages"],
    queryFn: () => getHomePagePackages(),
  });

  const categories: IProdCategory[] = homePagePackages.isSuccess
    ? homePagePackages.data.data
    : [];

  return (
    <div className="">
      <DashboardBanner />
      <BestSellers />
      <Promotion />

      <div className="space-y-[38px] pt-[30px]">
        {homePagePackages.isLoading ? (
          <CategoriesLoading />
        ) : categories.length > 0 ? (
          categories.map((item) => (
            <ProductsCategory {...item} key={item.category.slug} />
          ))
        ) : (
          <div className="grid place-items-center h-[250px]">
            <p className="text-base font-poppins font-[600]">
              No Packages Available....
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Market;
