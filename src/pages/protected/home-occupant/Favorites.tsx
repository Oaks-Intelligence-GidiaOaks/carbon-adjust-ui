import ProductCard from "@/components/reusables/ProductCard";
import { getFavourites } from "@/services/homeOwner";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Favorites = () => {
    const { data: response, isLoading, error } = useQuery({
      queryKey: ["favourites"],
      queryFn: getFavourites,
    });
  
    if (isLoading) {
        return (
          <div className="w-[100%] m-20 mt-10 flex flex-col gap-4 ">
            {Array.from({ length: 3 }, (_, i) => (
            <Box key={i} sx={{ width: "100%" }}>
              <Skeleton variant="rectangular" width={"100%"} height={100} />
              <Skeleton width={"100%"} />
              <Skeleton width={"50%"} animation="wave" />
            </Box>
          ))}
          </div>
        );
      }
  
    if (error) {
      return <div>Error loading favorites. Please try again later.</div>;
    }
  
    const favourites = response?.data?.favourites || []; // Safely access the favourites array

  
    return (
      <div className="container">
        <h3 className="font-bold text-2xl my-10">Favorites</h3>
        <div className="flex flex-col w-full gap-[48px] mx-auto pr-3 md:ml-auto">
          {favourites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch lg:space-x-5 w-full no-scrollbar">
              {favourites.map((item: any) => {
                const pkg = item?.package || {}; // Safely access 'package'
  
                // Map required package properties with fallbacks
                const productProps = {
                  ...item,
                  _id: pkg._id,
                  category: pkg.aiPackageType || "Unknown", // Handle null/undefined values
                  price: pkg.price ?? 0, // Use nullish coalescing to set default value
                  attachments: pkg.attachments || [], // Ensure attachments is an array
                  currency: pkg.currency || "£", // Default to GBP if missing
                };
  
                return (
                  <ProductCard
                    key={item._id}
                    {...productProps}
                    isFavourite='true' // Ensure boolean prop is correctly passed
                  />
                );
              })}
            </div>
          ) : (
            <p>No favorites found.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Favorites;
  