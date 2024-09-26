import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { addReview } from "@/services/homeOwner";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: string;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  packageId,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const { mutate: submitReview } = useMutation({
    mutationFn: (reviewData: any) => addReview(reviewData),
    mutationKey: ["package-review-submission"],
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Review submitted successfully!", {
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

    const reviewData = {
      rating,
      description: review,
      package: packageId,
    };

    // Submit the review via mutation
    submitReview(reviewData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg px-32 py-6 rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>
        <h3 className="text-xl font-medium text-[#2e599a] text-center mb-5 font-poppins">
          Rate this product
        </h3>
        {/* Product Image */}
        <div className="flex justify-center items-center border">
          <img
            src="/path/to/product-image.jpg"
            alt="Product"
            className="w-23 h-32 object-cover mx-auto mb-2"
          />
        </div>
        <h3 className="text-xs mt-5 font-inter">Rate </h3>
        {/* Star Rating */}
        <div className="flex justify-start gap-4 mb-4">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`cursor-pointer text-4xl ${
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
          rows={5}
        ></textarea>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 p-2 blue-gradient text-white rounded-lg font-semibold"
        >
          Submit your review
        </button>
      </div>
    </div>
  );
};

export default AddReviewModal;
