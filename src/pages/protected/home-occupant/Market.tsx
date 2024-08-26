import Promotion from "@/components/containers/Promotion";
import BestSellers from "@/components/containers/home/BestSellers";
import CategoriesLoading from "@/components/reusables/CategoriesLoading";
import ProductsCategory from "@/components/reusables/ProductsCategory";
import { clearOrder } from "@/features/orderSlice";
import { clearProduct } from "@/features/productSlice";
import { IProdCategory } from "@/interfaces/product.interface";
import { getHomePagePackages } from "@/services/homeOwner";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SocketService from "@/repository/socket";
import {
  ILoginEventPayload,
  IPageViewPayload,
  MonitoringEvent,
  PageEvent,
  SubLevelEvent,
} from "@/interfaces/events.interface";
import { RootState } from "@/app/store";
import { getBrowserAndOS } from "@/lib/utils";
import HomeBanner from "@/components/containers/HomeBanner";

type Props = {};

// this is the Main Dashboard page for showing all products in different categries

const Market = (_: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const loginEventPayload: ILoginEventPayload = {
    userId: user?._id as string,
    time: Date.now(),
    eventName: SubLevelEvent.LOGIN_USER_EVENT,
  };

  const { browser, os } = getBrowserAndOS();

  const pageEventPayload: IPageViewPayload = {
    name: PageEvent.DASHBOARD,
    time: Date.now(),
    userId: user?._id as string,
    browser,
    os,
  };

  useEffect(() => {
    SocketService.on("connect", () => {
      SocketService.emit(SubLevelEvent.LOGIN_USER_EVENT, loginEventPayload);
      SocketService.emit(MonitoringEvent.NEW_PAGE_VIEW, pageEventPayload);
    });
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
      {/* <DashboardBanner /> */}
      <HomeBanner />
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
