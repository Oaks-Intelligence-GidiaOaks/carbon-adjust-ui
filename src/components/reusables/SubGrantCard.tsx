import { addProduct } from "@/features/productSlice";
import { IProduct } from "@/interfaces/product.interface";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "@/app/store";
import {
  IAddToBasketEventPayload,
  MonitoringEvent,
  SubLevelEvent,
} from "@/interfaces/events.interface";
import SocketService from "@/repository/socket";
import placeholder from "@/assets/icons/grant-placeholder.svg";

interface Props extends IProduct {
  wrapText?: boolean;
}


const SubGrantCard = ({ isMerchant = false, ...props }: Props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleInitiateCheckout = () => {
    dispatch(addProduct({ ...props }));

    const basketPayload: IAddToBasketEventPayload = {
      packageId: props?._id,
      packageName: props?.title,
      pakageType: props?.packageType,
      packageCategory: props.category?.name as string,
      packagePrice: Number(props?.price),
      time: Date.now(),
      userId: user?._id as string,
      eventName: SubLevelEvent.ADD_TO_CART_EVENT,
    };

    SocketService.emit(MonitoringEvent.NEW_SUBLEVEL_EVENT, basketPayload);
  };

   const averageRating = props?.rating || 0;

  return (
    <div className="max-w-[250px] group">
      <div className="relative bg-gray-100 p-4 rounded-lg">
        {/* "New" Label */}
        <div className="absolute font-inter top-2 left-2 bg-[#FEFEFE] text-[#0E89F7] text-xs font-semibold px-4 py-1 rounded-md">
          NEW
        </div>

        {/* Discount Badge */}
        {typeof props.discount === "number" && props.discount > 0  && (
          <div className="absolute font-inter top-10 left-2 bg-[#0E89F7] text-[#FEFEFE] text-xs font-semibold px-4 py-1 rounded-md">
            -{props.discount}%
          </div>
        )}

        {/* Grant Icon */}
        <div className="flex flex-col items-center mt-10">
          <div className="bg-gray-200 group-hover:border-[#C2C4C666] w-52 h-52 border rounded-full flex items-center justify-center">
            <img
              src={props?.attachments?.[0] || placeholder}
              alt={`${props.title} Grant Icon`}
              className=" h-24 w-24 object-contain"
            />
          </div>

          {/* Hover "Apply" Button */}
          {!isMerchant && (
            <Link
              onClick={handleInitiateCheckout}
              className="w-5/6"
              to={`/dashboard/marketplace/${props?.category?.slug}?pid=${props._id}`}
            >
              <button
                className="blue-gradient w-full opacity-0 group-hover:opacity-100 text-white py-2 px-6 rounded-full mt-4 transition duration-300"
                onClick={handleInitiateCheckout}
              >
                Apply
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Grant Details */}
      <div className="mt-4">
        <div className="flex justify-start">
          {/* Star rating based on prop */}
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={
                i < averageRating ? "text-[#E99C1B]" : "text-[#343839]"
              }
            >
              ★
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-[#141718] font-poppins">
          {props.title}
        </h3>
        {/* Display discounted and original price */}
        <p className="text-[#A5A5A5] text-sm font-poppins">
            <>£{props.price}</>
        </p>
      </div>
    </div>
  );
};

export default SubGrantCard;
