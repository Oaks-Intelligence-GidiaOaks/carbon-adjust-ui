import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

const reviews: Review[] = [
  {
    name: "Maudie",
    rating: 5,
    date: "3 months ago",
    comment: "Lorem ipsum dolor sit amet consectetur. Ultrices ac elementum neque fermentum. Vitae nisl rhoncus varius odio felis egestas. Pretium porttitor orci diam magna libero faucibus orci ultricies magna. Dolor libero malesuada sit vitae. Velit leo vehicula viverra mauris ut eget risus massa porta. A."
  },
  {
    name: "Maudie",
    rating: 4,
    date: "3 months ago",
    comment: "Lorem ipsum dolor sit amet consectetur. Ultrices ac elementum neque fermentum. Vitae nisl rhoncus varius odio felis egestas. Pretium porttitor orci diam magna libero faucibus orci ultricies magna. Dolor libero malesuada sit vitae. Velit leo vehicula viverra mauris ut eget risus massa porta. A."
  },
  // Add more reviews here
];

const Rating = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="p-4 font-inter">
        {/* Ratings Header */}
        <div className="flex justify-center items-center cursor-pointer" onClick={toggleAccordion}>
          <h2 className="text-lg font-semibold text-center text-[#2e599a]">Ratings</h2>
          <span className={`transform transition-transform ${isAccordionOpen ? "rotate-180" : ""}`}>
            <ChevronDown  className="text-[#2e599a] "/>
          </span>
        </div>

        {/* Ratings Detail */}
        {isAccordionOpen && (
          <div className="mt-4">
            <div className="flex flex-col items-center space-x-2">
                <div className="flex gap-3 items-center justify-center mb-5">
                <h3 className="text-2xl text-[#575757] font-bold font-manrope">4.5</h3>
                <span className="text-[#FFB400] text-4xl">★</span>
                </div>
              <p className="text-[#575757] text-base text-center">273 Reviews</p>
            </div>

            {/* Rating Bars */}
            <div className="space-y-2 mt-4">
              {[5, 4, 3, 2, 1].map((star, idx) => (
                <div key={idx} className="flex text-sm items-center space-x-2">
                  <span>{star}</span>
                  <div className="w-full bg-[#ECECEC] h-2.5">
                    <div
                      className={`bg-[#FFB400] h-2.5 `}
                      style={{ width: `${(star / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-500 text-sm">({Math.floor(Math.random() * 20) + 5})</span>
                </div>
              ))}
            </div>
              {/* Reviews */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[#575757] font-inter ">Reviews</h3>

        <div className="space-y-4 mt-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <span className="blue-gradient text-white w-10 h-10 flex items-center justify-center rounded-md">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-[#050505] font-manrope">{review.name}</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, idx) => (
                      <span key={idx} className="text-[#F7871B]">★</span>
                    ))}
                    {[...Array(5 - review.rating)].map((_, idx) => (
                      <span key={idx} className="text-[#6C6C6C]">★</span>
                    ))}
                    <p className="text-[#868686] text-xs font-manrope">{review.date}</p>
                  </div>
                  
                </div>
              </div>

              <p className="mt-4 text-xs font-inter text-[#868686]">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
          </div>

          
        )}
      </div>

    
    </div>
  );
};

export default Rating;
