type Props = {};

const Promotion = (_: Props) => {
  const TimeCard = (props: { time: string; text: string }) => {
    return (
      <div className="flex flex-col justify-center">
        <div className="h-[47px] w-[47px] bg-white text-[#141718] text-[26px] font-[500] grid place-items-center">
          <span>{props.time}</span>
        </div>

        <h5 className="text-[9.4px] font-[400] text-center">{props.text}</h5>
      </div>
    );
  };

  return (
    <div className="flex items-stretch border #121212 bg-[#EDF6FD]">
      <div
        className="w-1/2 h-auto "
        style={{
          backgroundImage: "url('/assets/graphics/promote.png')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        {/* <img
          src="/assets/graphics/promote.png"
          alt=""
          className=" h-ful border border-red-500"
        /> */}
      </div>

      <div className="w-1/2 py-[60px] lg:pl-[50px] h-fit space-y-3">
        <h5 className="text-[#377DFF] text-xs font-[600]">PROMOTION</h5>

        <div className="flex-center text-[#121212] gap-1">
          <span>Hurry up!</span>{" "}
          <span className="text-[#FA2222]"> 40% OFF</span>
        </div>

        <h3 className="text-[15px] font-[400]">
          Thousands of high tech are waiting for you
        </h3>

        <h6 className="text-xs font-[400]">Offer expires in:</h6>

        <div className="flex-center gap-3">
          <TimeCard text="Days" time="02" />
          <TimeCard text="Hours" time="12" />
          <TimeCard text="Minutes" time="45" />
          <TimeCard text="Seconds" time="05" />
        </div>

        <button className="blue-gradient cursor-pointer uppercase text-white grid place-items-center text-base font-[700] rounded-[24px] w-[194px] h-[50px]">
          <span>Shop Now</span>
        </button>
      </div>
    </div>
  );
};

export default Promotion;
