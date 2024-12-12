import {
  ChevronDownCircleIcon,
  ChevronLeft,
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  ChevronUpCircleIcon,
  ImageIcon,
  PlayCircle,
  UserRound,
} from "lucide-react";
import React, { useState } from "react";
import { BsCart3, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IQuestion } from "@/interfaces/product.interface";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import ProductFormV2 from "@/components/containers/checkout/ProductFormV2";


interface Tab {
  label: string;
  icon: React.ReactNode;
}

interface ColorOption {
  label: string;
  value: string;
}

interface ProductProps {
  _id: string,
  name: string;
  price: number;
  reviews: number;
  colors: ColorOption[];
  averageRating: number;
  description: string;
  images: string[];
  videos: string[];
  questions: IQuestion[];
  owner: string;
}

const ProductDetails: React.FC<ProductProps & { isMerchant?: boolean }> = ({
  _id,
  name,
  price,
  reviews,
  colors,
  averageRating,
  description,
  images,
  videos,
  questions,
  owner,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(
    colors && colors.length > 0 ? colors[0].value : ""
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("Image");
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

  return (
    <div>
      <Link
        to={"/dashboard"}
        className="flex items-center mx-auto pl-10 text-[#0F172A]"
      >
        <ChevronLeft />
      </Link>
      <div className="px-10 pt-5 mx-auto lg:flex justify-between border-b pb-4">
        <p className="text-[20px]">Product Page</p>
        <p className="p-2 border w-fit rounded-full flex gap-1 text-sm">
          <UserRound className="size-4" />
          {owner}
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
                    className=" object-cover border rounded h-[40px]"
                  />
                ) : (
                  <span>🖼️</span>
                ),
              },
              {
                label: "Video",
                icon: images[0] ? (
                  <div className="relative ">
                    <img
                      src={images[0]}
                      alt="Image Icon"
                      className="object-cover border rounded h-[40px]"
                    />

                    <PlayCircleIcon className="absolute top-2 right-6 size-6 text-white" />
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

        {/* Conditional Rendering */}

        <div className="space-y-6">
          {showForm ? (
            <div>
              <button
                onClick={() => setShowForm(false)}
                className="mb-4 ml-3 flex items-center gap-2 text-sm"
              >
                <ChevronLeft className="size-4" />
                Back
              </button>
              <ProductFormV2
                questions={questions}
                productData={{
                  _id,
                  price,
                  selectedColor,
                  selectedQuantity,
                }}
                onCloseForm={() => setShowForm(false)}
              />
            </div>
          ) : (
            <>
              <h1 className="text-2xl">{name}</h1>
              <p className="text-2xl font-bold">£{price.toFixed(2)}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {renderStars(averageRating)}
                  <p className="text-sm text-gray-600">{reviews} reviews</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setSelectedQuantity((prev) => Math.max(1, prev - 1))
                    }
                    className="text-2xl text-[#0F172AB2]"
                  >
                    -
                  </button>
                  <span className="text-lg">{selectedQuantity}</span>
                  <button
                    onClick={() => setSelectedQuantity((prev) => prev + 1)}
                    className="text-2xl text-[#0F172AB2]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Colors */}
              <div>
                <p className="text-[#1A1A1A] font-semibold mb-2">Color</p>
                {colors && colors.length > 0 ? (
                  <div className="flex items-center gap-4">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`w-10 h-8 rounded-lg border ${
                          selectedColor === color.value
                            ? "ring-2 ring-blue-500"
                            : ""
                        }`}
                        style={{ backgroundColor: color.value }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No colors available for this product.
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <div
                  className="flex justify-between items-center border-b pb-2 cursor-pointer"
                  onClick={toggleDescription}
                >
                  <h5 className="text-lg font-medium">Description</h5>
                  {isDescriptionOpen ? (
                    <ChevronUpCircleIcon />
                  ) : (
                    <ChevronDownCircleIcon />
                  )}
                </div>
                {isDescriptionOpen && (
                  <p className="mt-2 text-[#0F172A80]">{description}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="flex gap-5">
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full py-2 flex items-center justify-center gap-1 text-center border text-[#0B8DFF]  border-[#0B8DFF] rounded-full"
                  >
                    <BsCart3 /> Add to Cart
                  </button>

                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full py-2 text-center text-white blue-gradient rounded-full"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </>
          )}
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
    <div className="flex gap-3 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => onTabClick(tab.label)}
          className={`flex flex-col  gap-2 py-1 ${
            selectedTab === tab.label
              ? "border-b-2 border-black-main"
              : "border-b-2 border-transparent text-gray-500"
          }`}
        >
          <div className="w-14">{tab.icon}</div>
          <span className="text-sm flex items-center gap-1">
            {tab.label.toLowerCase() === "video" ? (
              <PlayCircle className="size-4" />
            ) : tab.label.toLowerCase() === "image" ? (
              <ImageIcon className="size-4" />
            ) : null}
            {tab.label}
          </span>
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

  // Handle empty media
  if (media.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No media for this product</p>
      </div>
    );
  }

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
              className="w-full h-[350px] object-cover rounded-lg"
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
            className={`w-16 h-14 ${
              selectedIndex === index
                ? "ring-2 ring-blue-500"
                : "ring-1 ring-gray-300"
            } rounded-sm`}
          >
            {isVideo ? (
              <video
                src={item}
                className="w-full h-full object-cover rounded-sm"
              />
            ) : (
              <img
                src={item}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-sm"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
