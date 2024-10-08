import promotionimg from "@/assets/icons/promotion-banner.svg";

const PromotionBanner = () => {
  return (
    <div className="flex flex-col md:flex-row items-stretch bg-white h-[400px]">
      {/* Image Section */}
      <div className="md:w-1/2 w-full h-auto flex-grow">
        <img 
          src={promotionimg} 
          alt="Solar Panels" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Promotion Details */}
      <div className="md:w-1/2 w-full bg-blue-50 p-6 flex flex-col justify-center text-center md:text-left flex-grow">
        <p className="text-[#377DFF] text-xs font-bold font-inter mb-2">PROMOTION</p>
        <h2 className="text-3xl font-medium mb-2 font-poppins text-[#121212]">
          Hurry up! <span className="text-[#FA2222]">40% OFF</span>
        </h2>
        <p className="text-[#121212] mb-4 font-inter">
          Make the best home energy saving decision with solar system installation
        </p>
        <p className="text-xs text-[#141718] font-inter mb-3">Offer expires in:</p>

        {/* Countdown Timer */}
        <div className="flex justify-center md:justify-start space-x-4 mb-6">
          {['02', '12', '45', '05'].map((unit, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-[#141718] font-poppins bg-white p-3 rounded-md">
                {unit}
              </p>
              <p className="text-[9px] text-[#141718] font-inter">
                {['Days', 'Hours', 'Minutes', 'Seconds'][index]}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <button className="blue-gradient text-white w-fit font-semibold py-3 px-6 rounded-3xl hover:bg-blue-700 transition duration-300">
          BOOK A SESSION
        </button>
      </div>
    </div>
  );
};

export default PromotionBanner;
