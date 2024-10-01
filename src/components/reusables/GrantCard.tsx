import React from 'react';


interface GrantCardProps {
  grantName: string;
  rating: number;
  minAmount?: number;
  maxAmount?: number;
  placeholder: string;
}

 const GrantCard: React.FC<GrantCardProps> = ({ grantName, rating, minAmount, maxAmount, placeholder }) => {
  return (
    <div>
    <div className="relative group flex flex-col items-center hover:bg-[#C2C4C666]  bg-gray-100 p-4 rounded-lg hover:shadow-md transition duration-300">
      {/* "New" Label */}
      <div className="absolute font-inter top-2 left-2 bg-[#0E89F7] text-[#FEFEFE] text-xs font-semibold px-4 py-1 rounded-md">
        NEW
      </div>

      {/* Grant Icon */}
      <div className="flex flex-col items-center mt-10">
        <div className="bg-gray-200 group-hover:border-[#C2C4C666] w-52 h-52 border rounded-full flex items-center justify-center">
          <img src={placeholder} alt={`${grantName} Grant Icon`} className=" h-24 w-24 object-contain" />
        </div>

        {/* Hover "Apply" Button */}
        <button className="blue-gradient w-full opacity-0 group-hover:opacity-100 text-white py-2 px-6 rounded-full mt-4  transition duration-300">
          Apply
        </button>
      </div>

    </div>
    
      {/* Grant Details */}
      <div className="mt-4">
        <div className="flex justify-start ">
          {/* Star rating based on prop */}
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-[#E99C1B]' : 'text-[#343839]'}>
              ★
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-[#141718] font-poppins">{grantName} Grant</h3>
        <p className="text-[#A5A5A5] text-sm font-poppins">
          Min. £{minAmount} - Max £{maxAmount}
        </p>
      </div>
    </div>
  );
};

export default GrantCard;
