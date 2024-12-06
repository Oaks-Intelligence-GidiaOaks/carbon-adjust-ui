import {
  ChevronDownCircleIcon,
  ChevronLeft,
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  ChevronUpCircleIcon,
  MessageCircle,
  PlayIcon,
  UserRound,
} from "lucide-react";
import React, { useState } from "react";
import { BsCart3, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Link } from "react-router-dom";
// import { addProduct } from "@/features/productSlice";
import { IProduct } from "@/interfaces/product.interface";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/app/store";
// // import {
//   IAddToBasketEventPayload,
//   MonitoringEvent,
//   SubLevelEvent,
// } from "@/interfaces/events.interface";
// import SocketService from "@/repository/socket";


interface Props extends IProduct {
  wrapText?: boolean;
}

interface Tab {
  label: string;
  icon: React.ReactNode;
}

interface ColorOption {
  label: string;
  value: string;
}

interface ProductProps extends Props {
  name: string;
  price: number;
  reviews: number;
  colors: ColorOption[];
  averageRating: number;
  description: string;
  images: string[];
  videos: string[];
}

const ProductCard: React.FC<ProductProps & { isMerchant?: boolean }> = ({
name,
price,
reviews,
colors,
averageRating,
description,
images,
videos,
// isMerchant = false,
// ...props
}) => {
  const [selectedTab, setSelectedTab] = useState<string>("Image");
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]?.value);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

  const handleTabClick = (tab: string) => setSelectedTab(tab);
  const toggleDescription = () => setIsDescriptionOpen((prev) => !prev);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      <div className="flex items-center gap-1">
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <BsStarFill key={`full-${index}`} className="text-yellow-500" />
          ))}
        {halfStar === 1 && <BsStarHalf className="text-yellow-500" />}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <BsStar key={`empty-${index}`} className="text-gray-300" />
          ))}
      </div>
    );
  };

  // const dispatch = useDispatch();
  // const { user } = useSelector((state: RootState) => state.user);

  // const handleInitiateCheckout = () => {
  //   dispatch(addProduct({ ...props }));

  //   const basketPayload: IAddToBasketEventPayload = {
  //     packageId: props?._id,
  //     packageName: props?.title,
  //     pakageType: props?.packageType,
  //     packageCategory: props.category?.name as string,
  //     packagePrice: Number(props?.rating),
  //     time: Date.now(),
  //     userId: user?._id as string,
  //     eventName: SubLevelEvent.ADD_TO_CART_EVENT,
  //   };

  //   SocketService.emit(MonitoringEvent.NEW_SUBLEVEL_EVENT, basketPayload);
  // };

  return (
    <div>
      <Link
        to={"/dashboard"}
        className="flex items-center mx-auto pl-10 text-[#0F172A]"
      >
        <ChevronLeft />
      </Link>
      <div className="px-10 pt-5 mx-auto lg:flex justify-between">
        <p className="text-[24px]">Product Page</p>
        <p className="p-2 border w-fit rounded-full flex gap-1 text-sm">
          <UserRound className="size-4" />
          Princess Diana Energy
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Image Gallery */}
        <div>
          <Tabs
            tabs={[
              {
                label: "Image",
                icon: images[0] ? (
                  <img
                    src={images[0]}
                    alt="Image Icon"
                    className="w-40 h-20 object-cover rounded"
                  />
                ) : (
                  <span>🖼️</span>
                ),
              },
              {
                label: "Video",
                icon: images[0] ? (
                  <div className="relative">
                  {/* <video
                    src={images[0]}
                    className="w-40 h-20 object-cover rounded relative"
                    muted
                    loop
                    autoPlay
                  /> */}
                     <img
                    src={images[0]}
                    alt="Image Icon"
                    className="w-40 h-20 object-cover rounded"
                  />
                  <PlayIcon className="absolute top-7 right-6" />
                  </div>
                ) : (
                  <span>🎥</span>
                ),
              },
            ]}
            selectedTab={selectedTab}
            onTabClick={handleTabClick}
          />

          <ImageGallery
            media={selectedTab === "Image" ? images : videos}
            isVideo={selectedTab === "Video"}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl">{name}</h1>
          <p className="text-3xl font-bold">£{price.toFixed(2)}</p>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {renderStars(averageRating)}
              <p className="text-sm text-gray-600">{reviews} reviews</p>
            </div>
            {/* Quantity */}
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setSelectedQuantity((prev) => Math.max(1, prev - 1))
                }
                className=" text-3xl text-[#0F172AB2] "
              >
                -
              </button>
              <span className="text-xl">{selectedQuantity}</span>
              <button
                onClick={() => setSelectedQuantity((prev) => prev + 1)}
                className="text-3xl text-[#0F172AB2] "
              >
                +
              </button>
            </div>
          </div>

          {/* Colors */}
          <div>
            <p className="text-[#1A1A1A] font-semibold mb-2">Color</p>
            <div className="flex items-center gap-4">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-8 rounded-lg border ${
                    selectedColor === color.value ? "ring-2 ring-blue-500" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <div
              className="flex justify-between items-center  border-b pb-2 cursor-pointer"
              onClick={toggleDescription}
            >
              <h5 className="text-lg font-medium">Description</h5>
              {isDescriptionOpen ? (
                <ChevronUpCircleIcon className="text-[#707070]" />
              ) : (
                <ChevronDownCircleIcon className="text-[#707070]" />
              )}
            </div>
            {isDescriptionOpen && (
              <p className="mt-2 text-[#0F172A80]">{description}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button className="w-full flex mb-5 items-center gap-2 py-2 text-start text-[#4D93FC]">
              <MessageCircle />
              Message Vendor
            </button>
            <div className="flex gap-5">
              <button className="w-full py-2 flex items-center justify-center gap-1 text-center border text-[#0B8DFF]  border-[#0B8DFF] rounded-full">
                <BsCart3 /> Add to Cart
              </button>
              <Link className="w-5/6" to={`/dashboard/checkout`}>
                <button className="w-full py-2 text-center text-white blue-gradient rounded-full">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tabs: React.FC<{
  tabs: Tab[];
  selectedTab: string;
  onTabClick: (tab: string) => void;
}> = ({ tabs, selectedTab, onTabClick }) => {
  return (
    <div className="flex gap-4 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => onTabClick(tab.label)}
          className={`flex flex-col items-center gap-2 px-4 py-2 ${
            selectedTab === tab.label
              ? "border-b-2 border-blue-500 text-blue-500"
              : "border-b-2 border-transparent text-gray-500"
          }`}
        >
          <div className="w-20 mb-3 flex items-center justify-center">
            {tab.icon}
          </div>
          <span className="text-sm">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};


const ImageGallery: React.FC<{ media: string[]; isVideo: boolean }> = ({
  media,
  isVideo,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const nextSlide = () => {
    setSelectedIndex((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setSelectedIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <div className="flex gap-3  justify-between">
      <div className="relative w-full ">
        <div className="mb-4">
          {isVideo ? (
            <video
              controls
              src={media[selectedIndex]}
              className="w-full h-64 object-cover rounded-lg"
            />
          ) : (
            <img
              src={media[selectedIndex]}
              alt={`Media ${selectedIndex + 1}`}
              className="w-full object-cover rounded-lg"
            />
          )}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2  p-2 rounded-full"
        >
          <ChevronLeftCircleIcon className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2p-2 rounded-full"
        >
          <ChevronRightCircleIcon className="text-white" />
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {media.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`w-16 h-16 ${
              selectedIndex === index
                ? "ring-2 ring-blue-500"
                : "ring-1 ring-gray-300"
            } rounded`}
          >
            {isVideo ? (
              <video src={item} className="w-full h-full object-cover" />
            ) : (
              <img src={item} alt={`Thumbnail ${index + 1}`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
