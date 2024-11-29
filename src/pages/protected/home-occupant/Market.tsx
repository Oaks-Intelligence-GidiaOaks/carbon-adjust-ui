
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
import ProductShowcase from "@/components/containers/Categories";
import featured from "@/assets/featured-device.svg"
import placeholder from "@/assets/placeholder1.svg"
import placeholder2 from "@/assets/placeholder2.svg"
import placeholder3 from "@/assets/placeholder3.svg"

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


    console.log('hi', homePagePackages)

    const cards = [
      {
        id: 1,
        title: "Device Hub",
        description: "Manage energy smartly",
        image: `${placeholder}`,
        buttonText: "See More",
      },
      {
        id: 2,
        title: "Energy Saving Advisory",
        description: "Energy Savings Made Easy",
        image: `${placeholder2}`,
        buttonText: "See More",
      },
      {
        id: 3,
        title: "Energy Efficient Product",
        description: "Innovative Efficiency",
        image: `${placeholder3}`,
        buttonText: "See More",
      },
      
    ];

    const featuredProduct = {
      image: `${featured}`,
      title: "Carbon-Adjust Device",
      description: "Energy Saver",
    };

  return (
    <div className="">
      <HomeBanner />
      <ProductShowcase cards={cards} featuredProduct={featuredProduct} />
      <BestSellers />
    </div>
  );
};

export default Market;
