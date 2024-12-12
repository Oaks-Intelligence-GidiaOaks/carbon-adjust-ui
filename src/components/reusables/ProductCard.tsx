import { useState } from "react";
import { EyeIcon, HeartIcon } from "lucide-react";
import { IProduct } from "@/interfaces/product.interface";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";


interface Props extends IProduct {
  wrapText?: boolean;
}

const ProductCard = ({ isMerchant = false, ...props }: Props) => {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false); // State to track "love" selection

  const toggleLike = () => {
    setLiked(!liked);
  };

  

  const averageRating = props?.rating || 0;

  return (
    <div
      className="relative bg-white border border-gray-200 font-inter  p-4 transition-all"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Discount Badge */}
      {typeof props.discount === "number" && props.discount > 0 && (
        <div className="absolute top-1.5 bg-blue-500 w-fit text-white text-xs font-bold px-4 py-1 rounded">
          -{props.discount}%
        </div>
      )}

      {/* Sold Out Overlay */}
      {props.isSoldOut && (
        <div className="inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center rounded-lg text-white font-bold text-xl z-10">
          Sold Out
        </div>
      )}

      {/* HOT Tag */}
      {!hovered && props.isHot && !props.isSoldOut && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
          HOT
        </div>
      )}

      {/* Product Image */}
      <div className="relative">
        <img
          src={props?.attachments?.[0]}
          alt=""
          className="w-full h-44 object-cover rounded-lg mt-5"
        />

        {/* Hover Overlay */}
        {hovered && (
          <div className="absolute inset-0 bg-gray-400 bg-opacity-70 flex justify-center items-center gap-3 rounded-lg z-10">
            {/* Love Icon */}
            <button
              onClick={toggleLike}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                liked
                  ? "bg-gradient-to-r from-[#2E599A] to-[#0B8DFF]"
                  : "bg-white"
              } transition`}
            >
              {liked ? (
                <HeartIcon className="w-6 h-6 text-white" />
              ) : (
                <HeartIcon className="w-6 h-6 hover:text-[#0B8DFF]" />
              )}
            </button>

            {/* Add to Cart Icon */}
            <button className="bg-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition">
              <BsCart3 className="w-5 h-5 hover:text-[#0B8DFF] cursor-pointer" />
            </button>

            {/* View Details Icon */}
            <Link
              className=""
              to={{
                pathname: `/dashboard/product/${props._id}`,
              }}
            >
              <button className="bg-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition">
                <EyeIcon className="w-6 h-6 hover:text-[#0B8DFF] cursor-pointer" />
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-1">
        <div className="flex gap-2 items-center">
          <div className="flex justify-start">
            {/* Star rating based on prop */}
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < averageRating
                    ? "text-[#E99C1B] text-xl"
                    : "text-[#343839] text-xl"
                }
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-[#77878F] text-xs mt-1">
            ({averageRating.toFixed(1)})
          </span>
        </div>
        <h4 className="text-[#191C1F] text-sm">{props?.title}</h4>

        <div className="flex items-center mt-2 space-x-2">
          {typeof props.discount === "number" && props.discount > 0 &&  (
              <span className="text-gray-500 line-through text-sm">{` ${props?.currency} ${props.discount}`}</span>
            )}
          <span className="text-[#2DA5F3] font-semibold text-sm">{`${
            props?.currency
          } ${props.price ?? 0}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

