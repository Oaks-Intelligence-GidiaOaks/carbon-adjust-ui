
import BestSellers from "@/components/containers/home/BestSellers";
// import CategoriesLoading from "@/components/reusables/CategoriesLoading";
// import ProductsCategory from "@/components/reusables/ProductsCategory";
import { clearOrder } from "@/features/orderSlice";
import { clearProduct } from "@/features/productSlice";
// import { IProdCategory } from "@/interfaces/product.interface";
// import { getHomePagePackages } from "@/services/homeOwner";
// import { useQuery } from "@tanstack/react-query";
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
import ProductShowcase from "@/components/containers/Categories";
import featured from "@/assets/featured-device.svg"
import placeholder from "@/assets/placeholder1.svg"
import ProductCategories from "@/components/containers/ProductCategories";
import { useQuery } from "@tanstack/react-query";
import { IProdCategory } from "@/interfaces/product.interface";
import { getHomePagePackages } from "@/services/homeOwner";



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



    // Extract the first 3 categories with their first package image
  const categoryCards = categories.slice(0, 4).map((category, index) => {
    const firstPackage = category.packages?.[0]; // Get the first package
    const image =
      firstPackage?.attachments?.[0] || placeholder; // Use the first attachment image or fallback to placeholder
    return {
      id: index + 1,
      title: category.category.name, // Use category name
      image, // First package attachment image
    };
  });

    const featuredProduct = {
      image: `${featured}`,
      title: "Carbon-Adjust Device",
      description: "Energy Saver",
    };

  return (
    <div className="">
      <HomeBanner />
      <ProductShowcase cards={categoryCards} featuredProduct={featuredProduct} />
      <BestSellers />
      <ProductCategories />
    </div>
  );
};

export default Market;

