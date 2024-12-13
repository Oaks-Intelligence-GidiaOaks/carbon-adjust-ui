import React from "react";
import { Link } from "react-router-dom";

interface Review {
  description: string;
  user: any;
  _id: number;
  avatar: string;
  rating: number;
}

interface ReviewsSectionProps {
  hasPurchased: boolean;
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  hasPurchased,
  reviews,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Give Review Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#7F7F7F] border-b pb-3">
          Give Reviews
        </h2>
        {!hasPurchased ? (
          <>
            <p className="text-[#707070] font-sm">
              You can't review until you have purchased the product
            </p>
            {/* Link to check out */}
            <Link className="" to={`/dashboard/checkout`}>
              <button className="w-fit px-5 mt-3 py-2  text-center text-white blue-gradient rounded-full">
                Buy Now
              </button>
            </Link>
          </>
        ) : (
          <p className="text-gray-600">Thank you for purchasing the product!</p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="space-y-4">
        <div className="flex gap-3 items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <span className="px-3 py-1 text-sm text-white bg-[#2E599A] rounded-full">
            {reviews?.length || 0}
          </span>
        </div>
        {reviews?.length === 0 || reviews?.length === undefined ? (
          <p className="text-gray-600">No review on this product yet</p>
        ) : (
          // Scrollable container for reviews
          <div className="space-y-4 overflow-y-auto max-h-72 scrollbar">
            {reviews?.map((review) => (
              <div key={review._id} className="p-4 border-b  space-y-2">
                <div className="flex gap-4 w-full">

                  <div>
                  {review?.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review?.user?.name || "Anonymous"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#2E599A] flex items-center text-sm justify-center text-white font-bold">
                      {review?.user?.name
                        ? review.user.name
                            .split(" ")
                            .map((word: any[]) => word[0])
                            .join("")
                            .toUpperCase()
                        : "?"}
                    </div>
                  )}
                  </div>

                  <div>
                    <div className="flex justify-between w-full">
                      <h3 className="font-medium">{review?.user?.name}</h3>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-[#707070]">{review.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
