// import inboxImg from "../../assets/images/inboxImg.png";

const RecentMessageCard = () => {
  return (
    <div className="bg-[#FFFFFF] p-2 rounded-lg mb-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <img
              src={
                "https://th.bing.com/th/id/R.c38c5d0bf0f865ab634290de0416da15?rik=%2bogHmDz5qwqSdg&pid=ImgRaw&r=0"
              }
              alt=""
              className="h-[41px] w-[41px] rounded-full"
            />
            <span className="absolute bg-[#8AC926] rounded-full w-[6px] h-[6px] bottom-0 right-[6px]"></span>
          </div>
          <div className="flex flex-col ">
            <h1 className="text-[12px] font-poppins text-[#495057] leading-[10px] mb-1">
              Malik Jaret
            </h1>
            <span className="text-[10px] font-poppins text-[#A1A4B1]  leading-[14px]">
              We have some concerns about the do...
            </span>
          </div>
        </div>
        <span className="text-[10px] font-poppins leading-[10px] text-[#139EEC] whitespace-nowrap">
          30 mins
        </span>
      </div>
    </div>
  );
};

export default RecentMessageCard;
