import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import AdvertCard from "@/components/ui/AdvertCard";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAdvertResponse } from "@/services/adminService";
import { IAds } from "@/interfaces/ads.interface";

interface PartialIAds extends Omit<IAds, "file"> {
  bannerImage: string;
}

const AdCards = (props: {
  isLoading: boolean;
  isError: boolean;
  data: PartialIAds[];
}) => {
  const queryClient = useQueryClient();

  const editAdvertResponseMutation = useMutation({
    mutationKey: ["edit-advert-response"],
    mutationFn: (adsData: { adsId: string; data: Partial<IAds> }) =>
      editAdvertResponse(adsData),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
    },
    // onMutate: async (adsData: { adsId: string; data: Partial<IAds> }) => {
    //   const previousData = queryClient.getQueryData(["get-all-ads"]);

    //   const mockResponse = {
    //     message: "Advert updated successfully",
    //   };

    //   queryClient.setQueryData(["get-all-ads"], (oldData: any) => {
    //     return {
    //       ...oldData,
    //       adverts: oldData.adverts.map((ad: any) =>
    //         ad.id === adsData.adsId ? { ...ad, ...adsData.data } : ad
    //       ),
    //     };
    //   });

    //   return { previousData, mockResponse };
    // },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-ads"] });
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
                editAdvertResponseMutation.mutate({
                  adsId: it._id as string,
                  data: {
                    isActive: !it.isActive,
                  },
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdCards;
