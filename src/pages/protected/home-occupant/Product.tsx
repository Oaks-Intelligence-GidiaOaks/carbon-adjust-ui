import RelatedProductCategory from "@/components/reusables/RelatedProducts";
import ReviewsSection from "@/components/reusables/ReviewSection";
import aircon from "@/assets/Air-con.svg";
import image1 from "@/assets/placeholder2 (2).svg";
import image2 from "@/assets/main-image.svg";
import image3 from "@/assets/washing-machine.svg";
import ProductCard from "./ProductCard";

const Product = () => {
  const reviews = [
    {
      id: 1,
      name: "Annette Black",
      avatar: `${image1}`,
      reviewText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      rating: 5,
    },
    {
      id: 2,
      name: "Darrell Steward",
      avatar: `${image1}`,
      reviewText:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 4,
    },
    {
      id: 2,
      name: "Darrell Steward",
      avatar: `${image1}`,
      reviewText:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 4,
    },
    {
      id: 2,
      name: "Darrell Steward",
      avatar: `${image1}`,
      reviewText:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 4,
    },
  ];
  return (
    <div>
      <ProductCard
        name={"Carbon-Adjust Energy Saver Device"}
        price={250}
        reviews={500}
        colors={[
          { label: "White", value: "#ffffff" },
          { label: "Black", value: "#000000" },
        ]}
        averageRating={5}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."}
        images={[`${image2}`, `${image3}`, `${aircon}`]}
        videos={["/path-to-video1.mp4", "/path-to-video2.mp4"]} _id={""} title={""} attachments={[]} regions={[]} country={""} status={""} packageType={""} discount={0} hasQuestion={false} hasSchedule={false} allowPartPayment={false} currency={""} questions={[]} createdAt={""} updatedAt={""} __v={0}      />
      <RelatedProductCategory />
      <ReviewsSection hasPurchased={false} reviews={reviews} />
    </div>
  );
};

export default Product;
