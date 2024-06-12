import DashboardBanner from "@/components/containers/DashboardBanner";
import Promotion from "@/components/containers/Promotion";
import BestSellers from "@/components/containers/home/BestSellers";
// import EnergyEfficient from "@/components/containers/home/EnergyEfficient";
// import EnergySaving from "@/components/containers/home/EnergySaving";
// import HomeEnergy from "@/components/containers/home/HomeEnergy";
// import HomeImprovement from "@/components/containers/home/HomeImprovement";
// import Retrofit from "@/components/containers/home/Retrofit";
// import CategoryProducts from "@/components/reusables/CategoryProducts";
import ProductsCategory from "@/components/reusables/ProductsCategory";
import { IProdCategory } from "@/interfaces/product.interface";
import {
  // getAllPackageCategories,
  // getBestSellerPackages,
  // getHomePageFreebies,
  getHomePagePackages,
} from "@/services/homeOwner";
// import // transformCategoryPackages,
// // transformHomePagePackages,
// // "@/utils/reshape";
import { useQuery } from "@tanstack/react-query";

type Props = {};

// this is the Main Dashboard page for showing all products in different categries

const Market = (_: Props) => {
  // const data = useQuery({
  //   queryKey: ["get-freebies"],
  //   queryFn: () => getHomePageFreebies(),
  // });

  // const allPkgCategories = useQuery({
  //   queryKey: ["get-package-categories"],
  //   queryFn: () => getAllPackageCategories(),
  // });

  const homePagePackages = useQuery({
    queryKey: ["get-home-packages"],
    queryFn: () => getHomePagePackages(),
  });

  // const totalCategories = homePagePackages.isSuccess
  //   ? homePagePackages.data.data.totalCategories
  //   : 0;

  // console.log(homePagePackages?.data?.data);

  const categories: IProdCategory[] = homePagePackages.isSuccess
    ? homePagePackages.data.data
    : [];

  // console.log(categories, "categories");

  return (
    <div>
      <DashboardBanner />
      <BestSellers />
      <Promotion />

      <div className="space-y-[38px] pt-[30px]">
        {categories.length > 0 &&
          categories.map((item) => (
            <ProductsCategory {...item} key={item.category.slug} />
          ))}
      </div>
    </div>
  );
};

export default Market;
