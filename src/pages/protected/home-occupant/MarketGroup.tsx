import Promotion from "@/components/containers/Promotion";
import ProductCheckout from "@/components/reusables/ProductCheckout";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPackagesByCategorySlug } from "@/services/homeOwner";
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

  const activeUrl = new URL(window.location.href);
  activeUrl.search = "";

  // product id from params
  const pid = searchParams.get("pid");
  const categoryName = formatSlug(param.category);

  const closeModal = () => {
    navigate(activeUrl.pathname, { replace: true });
  };

  // get category specific products
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-category-products"],
    queryFn: () => getPackagesByCategorySlug(param.category),
  });

  const catProducts: IProduct[] = isSuccess ? data.data.packages : [];

  // Check if the category is "Grant"
  const isGrant = categoryName.toLowerCase() === "grant";

  return (
    <div className="relative">
      <div className="h-[150px] bg-[#F5FAFF] flex items-center pl-5 md:pl-[50px]">
        <h2 className="font-[500] text-xl">{categoryName}</h2>
      </div>

      <div className="mt-[40px] flex items-stretch overflow-x-scroll pb-5 gap-[48px] mx-auto max-w-[90vw] md:max-w-[650px] pr-3 lg:max-w-[95%] xl:max-w-[90%]">
        {isLoading ? (
          <CategoriesLoading />
        ) : (
          Boolean(catProducts.length) &&
          Array.from(catProducts.slice(0, 4), (item) =>
            isGrant ? (
              <GrantCard
              {...item} key={item._id}
              />
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
        {isLoading ? (
          <CategoriesLoading />
        ) : (
          Boolean(catProducts.length) &&
          Array.from(catProducts.slice(6), (item) =>
            isGrant ? (
              <GrantCard
              {...item} key={item._id}
              />
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
