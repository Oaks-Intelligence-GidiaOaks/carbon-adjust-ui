
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getPackagesByCategorySlug,
  getGrantSubCategory,
} from "@/services/homeOwner";
import ProductCard from "@/components/reusables/ProductCard";
import { formatSlug, getBrowserAndOS } from "@/lib/utils";
import { IProduct } from "@/interfaces/product.interface";
import CategoriesLoading from "@/components/reusables/CategoriesLoading";
import { useEffect, useState } from "react";
import {
  IPageViewPayload,
  MonitoringEvent,
  PageEvent,
} from "@/interfaces/events.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import SocketService from "@/repository/socket";
import SearchFilterBar from "@/components/reusables/SearchFilter";

type Props = {};

const MarketGroup = (_: Props) => {
  const { user } = useSelector((state: RootState) => state.user);

  const { browser, os } = getBrowserAndOS();

  const pageEventPayload: IPageViewPayload = {
    name: PageEvent.PACKAGE_CATEGORY,
    time: Date.now(),
    userId: user?._id as string,
    browser,
    os,
  };

  useEffect(() => {
    SocketService.emit(MonitoringEvent.NEW_PAGE_VIEW, pageEventPayload);
  }, []);

  const param: any = useParams();
  const [searchParams] = useSearchParams();


  // Extract product id (pid) from search params
  const pid = searchParams.get("pid");
  const categoryName = formatSlug(param.category);

  const activeUrl = new URL(window.location.href);
  activeUrl.search = "";



  // Fetch sub-category products if pid exists, otherwise fetch by category slug
  const {
    data: categoryData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useQuery({
    queryKey: pid
      ? ["get-subcategory-products", pid]
      : ["get-category-products", param.category],
    queryFn: () =>
      pid
        ? getGrantSubCategory({ packageId: pid })
        : getPackagesByCategorySlug(param.category),
  });

  const catProducts: IProduct[] = categorySuccess
    ? categoryData?.data?.packages || []
    : [];

  // Check if the category is "Grant"
  const isGrant = categoryName.toLowerCase() === "grant";

  const [filters, setFilters] = useState([
    { label: "Electronics Devices", id: "electronics" },
    { label: "5 Star Rating", id: "5stars" },
  ]);

  const handleRemoveFilter = (id: string) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  // const handleSortChange = (selected: string) => {
  //   // console.log("Selected Sort Option:", selected);
  // };

  
  const handleSortChange = () => {
    // console.log("Selected Sort Option:", selected);
  };

  return (
    <div className="relative">
      <div className="h-[150px] flex items-center container">
        <h2 className="font-[500] text-xl">{categoryName}</h2>
      </div>
  
      <SearchFilterBar
        activeFilters={filters}
        totalResults={65867}
        onRemoveFilter={handleRemoveFilter}
        sortOptions={["Most Popular", "Highest Rated", "Newest"]}
        defaultSortOption="Most Popular"
        onSortChange={handleSortChange}
      />
  
      {/* Render CategoriesLoading outside of the grid */}
      {categoryLoading && <CategoriesLoading />}
  
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch mr-10 gap-x-5 w-full no-scrollbar">
        {!categoryLoading &&
          Boolean(catProducts.length) &&
          catProducts.map((item) =>
            item.discount ? (
              <ProductCard {...item} key={item._id} />
            ) : isGrant ? (
              <ProductCard {...item} key={item._id} />
            ) : (
              <ProductCard {...item} key={item._id} />
            )
          )}
      </div>
  
      {/* <div className="mt-[48px]">
        <Promotion />
      </div> */}
    </div>
  );
}  

export default MarketGroup;
