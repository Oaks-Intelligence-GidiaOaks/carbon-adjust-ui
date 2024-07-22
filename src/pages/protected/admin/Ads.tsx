import AdCards from "@/components/containers/ads/AdCards";
import TabToggler from "@/components/containers/TabToggler";
import AdsGrid from "@/components/grid/admin/AdsGrid";
import { getAllAds, getFeaturedAds, getHeroAds } from "@/services/adminService";
import { IComponentMap } from "@/types/general";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Ads = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>("All");

  const fetchAds = () => {
    if (activeTab === "All") {
      return getAllAds();
    } else if (activeTab === "Featured Ads") {
      return getFeaturedAds();
    } else if (activeTab === "Hero Ads") {
      return getHeroAds();
    }
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: [activeTab],
    queryFn: fetchAds,
  });

  useEffect(() => {
    if (activeTab !== "All") {
      queryClient.prefetchQuery({
        queryKey: ["All"],
        queryFn: getAllAds,
      });
    }

    if (activeTab !== "Featured Ads") {
      queryClient.prefetchQuery({
        queryKey: ["Featured Ads"],
        queryFn: getFeaturedAds,
      });
    }

    if (activeTab !== "Hero Ads") {
      queryClient.prefetchQuery({
        queryKey: ["Hero Ads"],
        queryFn: getHeroAds,
      });
    }
  }, [activeTab, queryClient]);

  // const editAdvertResponseMutation = useMutation({
  //   mutationKey: ["edit-advert-response"],
  //   mutationFn: (adsData: { adsId: string; data: Partial<IAds> }) =>
  //     editAdvertResponse(adsData),
  //   onSuccess: (sx: any) => {
  //     toast.success(sx.message);
  //   },
  //   // onMutate: async (adsData: { adsId: string; data: Partial<IAds> }) => {
  //   //   const previousData = queryClient.getQueryData(["get-all-ads"]);

  //   //   const mockResponse = {
  //   //     message: "Advert updated successfully",
  //   //   };

  //   //   queryClient.setQueryData(["get-all-ads"], (oldData: any) => {
  //   //     return {
  //   //       ...oldData,
  //   //       adverts: oldData.adverts.map((ad: any) =>
  //   //         ad.id === adsData.adsId ? { ...ad, ...adsData.data } : ad
  //   //       ),
  //   //     };
  //   //   });

  //   //   return { previousData, mockResponse };
  //   // },
  //   onError: (ex: any) => {
  //     toast.error(ex.response.data.message);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["get-all-ads"] });
  //   },
  // });

  const getActiveComponent: IComponentMap = {
    All: <AdsGrid data={data?.data?.adverts || []} />,
    "Featured Ads": (
      <AdCards
        isError={isError}
        isLoading={isLoading}
        data={data?.data || []}
      />
    ),

    "Hero Ads": (
      <AdCards
        isError={isError}
        isLoading={isLoading}
        data={data?.data || []}
      />
    ),
  };

  return (
    <div className="px-3">
      <h2>Adverts</h2>

      {/* Tab toggers */}
      <div className="md:w-3/4">
        <TabToggler
          activeTab={activeTab}
          onClick={(val) => setActiveTab(val)}
          tabs={["All", "Featured Ads", "Hero Ads"]}
        />
      </div>

      <div className="mt-5 w-fit ml-auto">
        <Link to={`/admin/ads/new`}>
          <div className="w-fit ml-auto">
            <button className="blue-gradient rounded-2xl text-white text-center py-2 px-[20px]">
              Create AD
            </button>
          </div>
        </Link>
      </div>

      {getActiveComponent[activeTab]}
    </div>
  );
};

export default Ads;
