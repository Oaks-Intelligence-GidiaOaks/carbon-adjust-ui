import Promotion from "@/components/containers/Promotion";

import ProductCheckout from "@/components/reusables/ProductCheckout";
// import EnergyPackage from "@/components/reusables/EnergyPackage";
// import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPackagesByCategorySlug } from "@/services/homeOwner";
import ProductCard from "@/components/reusables/ProductCard";
import { formatSlug } from "@/lib/utils";
import { IProduct } from "@/interfaces/product.interface";
import CategoriesLoading from "@/components/reusables/CategoriesLoading";
// import { useDispatch } from "react-redux";
// import { addProduct } from "@/features/productSlice";

type Props = {};

const MarketGroup = (_: Props) => {
  // console.log(productDetails);

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

  // console.log(catProducts, "cat products");

  // console.log(catProducts, "cat products");

  return (
    <div className="relative ">
      <div className="h-[150px] bg-[#F5FAFF] flex items-center pl-5 md:pl-[50px]">
        <h2 className="font-[500] text-xl">{categoryName}</h2>
      </div>

      <div className="mt-[40px] flex items-stretch overflow-x-scroll pb-5 gap-[48px] mx-auto max-w-[90vw] md:max-w-[650px] pr-3 lg:max-w-[95%]   xl:max-w-[90%]">
        {isLoading ? (
          <CategoriesLoading />
        ) : (
          Boolean(catProducts.length) &&
          Array.from(catProducts.slice(0, 4), (item) => (
            <ProductCard {...item} key={item._id} />
          ))
        )}
      </div>

      <div className="mt-[48px]">
        <Promotion />
      </div>

      <div
        className="mt-[40px] flex items-stretch overflow-x-scroll pb-5 
      
      gap-[48px] mx-auto max-w-[90vw] md:max-w-[650px] pr-3 lg:max-w-[850px] lg:mx-0  xl:max-w-[1100px] md:!ml-auto
      "
      >
        {isLoading ? (
          <CategoriesLoading />
        ) : (
          Boolean(catProducts.length) &&
          Array.from(catProducts.slice(6), (item) => (
            <ProductCard {...item} key={item._id} />
          ))
        )}
      </div>

      {pid && (
        <ProductCheckout
          categoryName={categoryName}
          setShowcheckout={closeModal}
          showCheckout={true}
        />
      )}
    </div>
  );
};

export default MarketGroup;
