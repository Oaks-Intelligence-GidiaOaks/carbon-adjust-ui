import RelatedProductCategory from "@/components/reusables/RelatedProducts";
import ReviewsSection from "@/components/reusables/ReviewSection";
import ProductCard from "./ProductDetails";
import { useQuery } from "@tanstack/react-query";
import { getPackageDetails } from "@/services/homeOwner";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";


const Product = () => {
  


  const { packageId } = useParams(); 
 
  if (!packageId) {
    // Handle the case where packageId is undefined
    return <p>Error: Package ID is missing.</p>;
  }

   // Fetch package details using useQuery
   const { data, isLoading, isError } = useQuery({
    queryKey: ["package-details", packageId],
    queryFn: () => getPackageDetails({ packageId }),
  });

  



  if (isLoading) {
    return (
      <div className="w-[100%] mx-auto mt-10 flex flex-col gap-4 p-10 ">
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



  if (isError) {
    return <p>Error fetching package details. Please try again later.</p>;
  }

  const packageDetails = data?.data?.package
  const review = data?.data?.reviews


  return (
    <div>
       <ProductCard
        _id={packageId}
        name={packageDetails.title}
        price={packageDetails.price}
        owner={packageDetails.category.name}
        reviews={review?.stats?.totalReviews || 0}
        colors={packageDetails.color}
        averageRating={review?.reviewStats.averageRating || 0}
        description={packageDetails.description}
        images={packageDetails.attachments}
        videos={packageDetails.media}
        questions={packageDetails.questions}
        isMerchant={false} 
        packageType={packageDetails.packageType}      />
      <RelatedProductCategory />
      <ReviewsSection hasPurchased={false} reviews={review?.packageReviews} />
    </div>
  );
};


export default Product;


