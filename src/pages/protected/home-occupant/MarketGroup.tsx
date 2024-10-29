import Promotion from "@/components/containers/Promotion";
import ProductCheckout from "@/components/reusables/ProductCheckout";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getPackagesByCategorySlug,
  getGrantSubCategory,
} from "@/services/homeOwner";
import ProductCard from "@/components/reusables/ProductCard";
import { formatSlug, getBrowserAndOS } from "@/lib/utils";
import { IProduct } from "@/interfaces/product.interface";
import CategoriesLoading from "@/components/reusables/CategoriesLoading";
import { useEffect } from "react";
import {
  IPageViewPayload,
  MonitoringEvent,
  PageEvent,
} from "@/interfaces/events.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import SocketService from "@/repository/socket";
import GrantProductCheckout from "@/components/reusables/GrantCheckout";
import GrantCard from "@/components/reusables/GrantCard";
import SubGrantCard from "@/components/reusables/SubGrantCard";

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
  const navigate = useNavigate();

  // Extract product id (pid) from search params
  const pid = searchParams.get("pid");
  const categoryName = formatSlug(param.category);

  const activeUrl = new URL(window.location.href);
  activeUrl.search = "";

  const closeModal = () => {
    navigate(activeUrl.pathname, { replace: true });
  };

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

  return (
    <div className="relative">
      <div className="h-[150px] bg-[#F5FAFF] flex items-center pl-5 md:pl-[50px]">
        <h2 className="font-[500] text-xl">{categoryName}</h2>
      </div>

      <div className="mt-[40px] flex items-stretch overflow-x-scroll pb-5 gap-[48px] mx-auto max-w-[90vw] md:max-w-[650px] pr-3 lg:max-w-[95%] xl:max-w-[90%]">
        {categoryLoading ? (
          <CategoriesLoading />
        ) : (
          Boolean(catProducts.length) &&
          catProducts
            .slice(0, 4)
            .map((item) =>
              item.discount ? (
                <SubGrantCard {...item} key={item._id} />
              ) : isGrant ? (
                <GrantCard {...item} key={item._id} />
              ) : (
                <ProductCard {...item} key={item._id} />
              )
            )
        )}
      </div>

      <div className="mt-[48px]">
        <Promotion />
      </div>

      <div className="mt-[40px] flex items-stretch overflow-x-scroll pb-5 gap-[48px] mx-auto max-w-[90vw] md:max-w-[650px] pr-3 lg:max-w-[850px] lg:mx-0 xl:max-w-[1100px] md:!ml-auto">
        {categoryLoading ? (
          <CategoriesLoading />
        ) : (
          Boolean(catProducts.length) &&
          catProducts
            .slice(6)
            .map((item) =>
              pid ? (
                <SubGrantCard {...item} key={item._id} />
              ) : isGrant ? (
                <GrantCard {...item} key={item._id} />
              ) : (
                <ProductCard {...item} key={item._id} />
              )
            )
        )}
      </div>

      {pid && (
        <>
          {isGrant ? (
            <GrantProductCheckout
              categoryName={categoryName}
              setShowcheckout={closeModal}
              showCheckout={true}
            />
          ) : (
            <ProductCheckout
              categoryName={categoryName}
              setShowcheckout={closeModal}
              showCheckout={true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MarketGroup;
