import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import AdvertCard from "@/components/ui/AdvertCard";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unPublishAdsFromLocation } from "@/services/adminService";
import { IAds } from "@/interfaces/ads.interface";

interface PartialIAds extends Omit<IAds, "file"> {
  bannerImage: string;
}

const AdCards = (props: {
  isLoading: boolean;
  isError: boolean;
  data: PartialIAds[];
  activeTab: string;
}) => {
  const queryClient = useQueryClient();

  const unPublishAdsFromLocationMutation = useMutation({
    mutationKey: ["unpublish-ads-from-location"],
    mutationFn: (adsId: string) => unPublishAdsFromLocation(adsId),

    onSuccess: (sx: any) => {
      toast.success(sx.message);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [props.activeTab] });
    },
  });

  return (
    <div className="space-y-5 mt-4">
      {props.isLoading ? (
        <LoadingState />
      ) : props.isError ? (
        <ErrorState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from(props.data, (it) => (
            <AdvertCard
              key={it._id}
              {...it}
              image={it.bannerImage}
              setIsActive={() =>
                unPublishAdsFromLocationMutation.mutate(it._id!)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdCards;
