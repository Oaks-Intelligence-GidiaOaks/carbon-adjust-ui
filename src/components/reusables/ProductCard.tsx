import { addProduct } from "@/features/productSlice";
import { IProduct } from "@/interfaces/product.interface";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";
import { MdStarRate } from "react-icons/md";
// import questions from "../../dummy/questions.json";

interface Props extends IProduct {
  wrapText?: boolean;
}

const ProductCard = ({ isMerchant = false, ...props }: Props) => {
  const dispatch = useDispatch();

  const handleInitiateCheckout = () => {
    dispatch(addProduct({ ...props }));
  };

  return (
    <div className="min-w-[228px] group">
      <div className="relative">
        <div className="absolute top-[10px] right-[10px] rounded-full w-[32px] h-[32px] bg-white grid place-items-center z-[10]">
          <GrFavorite />
        </div>

        <div className="absolute top-[13px] left-[13px] z-[10] flex flex-col gap-2">
          <span className="w-[55px] h-[20px] grid place-items-center bg-white text-[13.94px] font-[700] rounded-[3.31px]">
            <span>New</span>
          </span>

          <span className=" w-[55px] h-[20px] grid place-items-center bg-[#BE0B0D] text-white text-[13.94px] font-[700] rounded-[13.31px]">
            <span>Hot</span>
          </span>
        </div>

        <div className="relative h-[304px] border border-[#F3F5F7] grid place-items-center rounded-xl bg-[#F3F5F7]">
          <div className="hidden group-hover:flex flex-col absolute top-0 left-0 w-full h-full bg-[#000000] bg-opacity-20 rounded-lg">
            {!isMerchant && (
              <div className="mx-auto mt-auto h-fit pb-[16px] grid place-items-center w-full">
                <Link
                  onClick={handleInitiateCheckout}
                  className="w-5/6"
                  to={`/dashboard/marketplace/${props?.category?.slug}?pid=${props._id}`}
                >
                  <button className=" blue-gradient w-full rounded-[24px] h-[40px] text-center text-white text-base font-[500]">
                    Add to basket
                  </button>
                </Link>
              </div>
            )}
          </div>

          <img
            src={props?.attachments?.[0]}
            alt=""
            className="w-[228px] h-[304px] rounded-lg object-cover"
            // className="w-[100px] h-auto object-cover"
          />
        </div>

        <div className="gap-[3px] mt-1 flex flex-col">
          <div className="flex-center gap-2">
            <span className="text-xs font-[400]">
              {/* @ts-ignore */}
              {props?.owner?.name!}
            </span>
            {Array.from({ length: 5 }, (_, i) => (
              // <FaStar size={13.94} key={i} color="#E99C1B" />
              <MdStarRate size={13.94} key={i} color="#E99C1B" />
            ))}
          </div>

          <h2
            className={`text-xs font-[600] ${
              props?.wrapText ? "text-wrap" : "truncate"
            }  max-w-[228px]`}
          >
            {props?.title}
          </h2>

          <h2 className="text-xs font-[600] ">{` ${props?.currency} ${
            props.price ?? 0
          }`}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
