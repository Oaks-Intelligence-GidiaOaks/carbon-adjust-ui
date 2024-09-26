import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPackagesReviews } from "@/services/homeOwner";

interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface Stats {
  ones: number;
  twos: number;
  threes: number;
  fours: number;
  fives: number;
  averageRating: number;
  totalReviews: number;
}

const Rating = ({ packageId }: { packageId: string }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Fetch package reviews using useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["package-review", packageId],
    queryFn: () => getPackagesReviews({ packageId }),
  });


  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  if (isError) {
    return <p>Error fetching reviews. Please try again later.</p>;
  }


//  if (data) {
//   console.log("Package ID:", packageId);
//   console.log("Fetched reviews data:", data);
// }

// Safeguard: Default values for reviews and stats
const reviews: Review[] = data?.reviews?.map((review: any) => ({
  name: review.user?.name || "Anonymous",
  rating: review.rating,
  date: new Date(review.createdAt).toLocaleDateString(),
  comment: review.description || "No comment provided.",
})) || [];

const stats: Stats | null = data?.stats || null;
const averageRating = stats?.averageRating || 0;
const totalReviews = stats?.totalReviews || 0;

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  // To calculate the percentage of reviews for each star level
  const calculatePercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return (count / total) * 100;
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="p-4 font-inter">
        {/* Ratings Header */}
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={toggleAccordion}
        >
          <h2 className="text-lg font-semibold text-center text-[#2e599a]">Ratings</h2>
          <span className={`transform transition-transform ${isAccordionOpen ? "rotate-180" : ""}`}>
            <ChevronDown className="text-[#2e599a]" />
          </span>
        </div>

        {/* Ratings Detail */}
        {isAccordionOpen && (
          <div className="mt-4">
            <div className="flex flex-col items-center space-x-2">
              <div className="flex gap-3 items-center justify-center mb-5">
                <h3 className="text-2xl text-[#575757] font-bold font-manrope">
                  {averageRating}
                </h3>
                <span className="text-[#FFB400] text-4xl">★</span>
              </div>
              <p className="text-[#575757] text-base text-center">{totalReviews} Reviews</p>
            </div>

            {/* Rating Bars */}
            <div className="space-y-2 mt-4">
              {[5, 4, 3, 2, 1].map((star, idx) => {
                const counts = {
                  5: stats?.fives || 0,
                  4: stats?.fours || 0,
                  3: stats?.threes || 0,
                  2: stats?.twos || 0,
                  1: stats?.ones || 0,
                };

                const percentage = calculatePercentage(counts[star as keyof typeof counts], totalReviews);

                return (
                  <div key={idx} className="flex text-sm items-center space-x-2">
                    <span>{star}</span>
                    <div className="w-full bg-[#ECECEC] h-2.5">
                      <div className="bg-[#FFB400] h-2.5" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="text-gray-500 text-sm">({counts[star as keyof typeof counts]})</span>
                  </div>
                );
              })}
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-[#575757] font-inter">Reviews</h3>

              <div className="space-y-4 mt-4">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0">
                          <span className="blue-gradient text-white w-10 h-10 flex items-center justify-center rounded-md">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#050505] font-manrope">{review.name}</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(review.rating)].map((_, idx) => (
                              <span key={idx} className="text-[#F7871B]">★</span>
                            ))}
                            {[...Array(5 - review.rating)].map((_, idx) => (
                              <span key={idx} className="text-[#6C6C6C]">★</span>
                            ))}
                            <p className="text-[#868686] text-xs font-manrope">{review.date}</p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-xs font-inter text-[#868686]">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;