import React from "react";
import arrow from "@/assets/arrow-up.svg"
import { Link } from "react-router-dom";

interface CardProps {
  id: number;
  title: string;
  image: string;
}

interface ProductShowcaseProps {
  cards: CardProps[]; // Cards for the left section
  featuredProduct: {
    image: string;
    title: string;
    description: string;
  }; // Featured product for the right section
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  cards,
  featuredProduct,

  
}) => {

  // Utility function to format titles
const formatTitle = (title: string): string => {
  return title.replace(/\s+/g, '-').toLowerCase();
};


  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between mt-5 gap-6 p-5 lg:p-14 bg-white rounded-lg">
      {/* Left Section - Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full md:w-[54%]">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`bg-[#F5F5F5] p-3 rounded-lg shadow-md flex flex-col ${
              index === 2 ? "col-span-2" : ""
            }`}
          >
            <h2 className="font-medium text-sm">{card.title}</h2>
            <img
              src={card.image}
              alt={card.title}
              className={`rounded-md mt-4 ${
                index === 2 ? "ml-auto w-[300px] h-[110px] " : " w-[100px] h-[80px] mx-auto "
              }`}
            />
            
            <Link to={`/dashboard/marketplace/${formatTitle(card.title)}`}>
            <button className="mt-4 text-[10px]  font-medium w-fit flex  items-center gap-2 px-4 py-2 bg-[#0B4C70] text-white rounded-full">
              See More
              <img src={arrow} width={25} height={25} alt="" />
            </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Right Section - Featured Product */}
      <div className="flex-1 bg-black text-white rounded-lg overflow-hidden relative flex items-stretch">
        <img
          src={featuredProduct.image}
          alt={featuredProduct.title}
          className="w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductShowcase;
