import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview } from "@/services/homeOwner";
import { FaSpinner } from "react-icons/fa"; 

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: string;
  image?: string;
  packageType?: string;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  packageId,
  image,
  packageType
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false); 
  const queryClient = useQueryClient();

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  

  const { mutate: submitReview } = useMutation({
    mutationFn: (reviewData: any) => addReview(reviewData),
    mutationKey: ["package-review-submission"],
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-orders"] });
      toast.success("Review submitted successfully!", {
        duration: 5000,
      });


      // Reset the form after successful submission
      setRating(0);
      setReview("");

      // Close the modal
      onClose();
    },
  });

  const handleSubmit = () => {
    if (rating === 0 || review.trim() === "") {
      toast.error("Please provide a rating and a review.");
      return;
    }

    setLoading(true);

    const reviewData = {
      rating,
      description: review,
      package: packageId,
    };

    console.log("reviewData", reviewData)
    // Submit the review via mutation
    submitReview(reviewData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50 z-50">
      <div className="bg-white relative w-full max-w-lg p-6 lg:px-20 lg:py-10 rounded-lg shadow-lg mx-4 md:mx-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>
        <h3 className="text-xl font-medium text-[#2e599a] text-center mb-5 font-poppins">
          Rate this {packageType || 'package'}
        </h3>
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={image}
            alt="Product"
            className="w-20 h-28 md:w-32 md:h-32 object-cover mx-auto mb-2 rounded-md"
          />
        </div>

        <h3 className="w-full text-xs mt-5 font-inter">Rate </h3>
        {/* Star Rating */}
        <div className="flex justify-start gap-2 md:gap-4 mb-4">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`cursor-pointer text-3xl md:text-4xl ${
                rating > index ? "text-[#FFB400]" : "text-[#ECECEC]"
              }`}
              onClick={() => handleStarClick(index + 1)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review Text Area */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review"
          className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:border focus:border-blue-400"
          rows={4}
        ></textarea>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={rating === 0 || review.trim() === "" || loading}
          className={`w-full mt-4 p-2 blue-gradient text-white rounded-lg font-semibold flex justify-center items-center ${
            (rating === 0 || review.trim() === "" || loading) &&
            "cursor-not-allowed opacity-50"
          }`}
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            "Submit your review"
          )}
        </button>
        </div>
    </div>
  );
};

export default AddReviewModal;
