 // Adjust the path as needed

import LeaderboardAccordion from "../reusables/LeaderBoard";



const HomeBanner = () => {
  return (
    <div className="font-poppins relative bg-[#edf6fda4] flex flex-col overflow-hidden cursor-pointer h-[500px]">
      {/* Blurred Image */}
      <img
        src="/assets/banners/main-bg.svg"
        className="z-0 w-full h-full object-cover filter blur-[0.5px]"
        alt="Home Banner"
      />

      {/* Leaderboard Accordion stacked on top */}
      <div className="absolute bottom-14 left-[35%] transform -translate-x-1/2 z-20 w-[90%] max-w-[800px]">
        <LeaderboardAccordion />
      </div>

      {/* Text Overlay */}
      <div className="absolute mt-40 inset-0 flex flex-col lg:mt-24 items-center z-10 text-center text-white">
        <h1 className="font-bold text-[30px] md:text-[50px] tracking-tight drop-shadow-lg lg:mr-36 lg:w-1/2">
          The Marketplace for your devices
        </h1>
        <h5 className="font-medium text-[16px] md:text-[20px] mt-2 lg:mr-36 lg:w-1/2">
          Energy efficiency starts here.
        </h5>
      </div>

      <img
        src="/assets/banners/device-ad.svg"
        className="absolute hidden sm:block right-0 top-0 z-10 w-[200px] lg:mr-10 lg:mt-10"
        alt="Rectangle"
      />

      {/* Rectangle at the Bottom */}
      <img
        src="/assets/banners/rectangle.svg"
        className="absolute bottom-0 z-10 w-full object-cover"
        alt="Rectangle"
      />
    </div>
  );
};

export default HomeBanner;
