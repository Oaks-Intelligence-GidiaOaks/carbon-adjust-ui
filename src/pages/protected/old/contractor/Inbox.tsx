import { FiSearch } from "react-icons/fi";
import Select from "react-select";
import { BsFilter } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
// import inboxImg from "../../assets/images/inboxImg.png";
import { messageData } from "@/constants";
import RecentMessageCard from "@/components/ui/RecentMessageCard";

const Inbox = () => {
  const options = [
    { value: "homeOccupant", label: "Home " },
    { value: "financeInstitution", label: "Finance" },
    { value: "smes", label: "SMEs" },
    {
      value: "localAuthority",
      label: "local ",
    },
  ];
  const customStyles = {
    control: (provided: object) => ({
      ...provided,
      borderColor: "#9e9e9e",
      minHeight: "20px",
      fontSize: "12px",
      width: "130px",
      height: "20px",
      paddingBottom: "34px",
      paddingLeft: "14px",
      borderRadius: "6px",
    }),

    option: (styles: object) => ({
      ...styles,
      fontSize: "12px",
      fontFamily: "Poppins, sans-serif",
    }),

    placeholder: (styles: object) => ({
      ...styles,
      fontSize: "12px",
      fontFamily: "Poppins, sans-serif",
      color: "rgba(0,0,0,0.4)",
    }),
  };
  return (
    <div className="flex flex-col">
      <div className="px-2 mt-6 flex gap-[clamp(8px,3%,12px)] h-[calc(100vh-86px)] overflow-y-hidden">
        <div className="w-[30%] bg-[#F8F9FA] p-2">
          <div className="flex items-center justify-between gap-6">
            <h1 className="poppins-5 text-[15px] font-semibold leading-[24px]">
              MESSAGES
            </h1>
          </div>
          <div className="flex items-center relative w-full mt-2">
            <input
              type="text"
              placeholder="Search here"
              className="min-w-[130px] w-2/3 pl-6 py-[17px] h-8 border px-2 flex items-center rounded-md text-[12px] border-[#9e9e9e] focus-outline-none focus:border-none font-poppins"
            />
            <div className="absolute left-2 mr-2">
              <FiSearch size={13} />
            </div>
          </div>
          <div className="flex items-center justify-start mt-3">
            <div className="relative">
              <BsFilter
                className="absolute left-[6px] top-[11px] z-10"
                size={16}
              />
              <Select styles={customStyles} options={options} />
            </div>
          </div>

          <div className="mt-6 h-[calc(100%-100px)] overflow-y-scroll mb-20">
            <h1 className="font-poppins text-[15px] font-medium leading-[24px]">
              Recent Chats
            </h1>
            <div className="mt-3">
              {messageData.map(() => (
                <RecentMessageCard />
              ))}
            </div>
          </div>
        </div>
        <div className="w-[70%] bg-white rounded-md p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 relative">
              <div className="relative">
                <img
                  src={
                    "https://th.bing.com/th/id/R.c38c5d0bf0f865ab634290de0416da15?rik=%2bogHmDz5qwqSdg&pid=ImgRaw&r=0"
                  }
                  alt=""
                  className="h-[45px] w-[45px] rounded-full"
                />
                <span className="absolute bg-[#8AC926] rounded-full w-[10px] h-[10px] bottom-0 right-[4px]"></span>
              </div>
              <div className="flex flex-col ">
                <h1 className="text-[14px] font-poppins text-[#495057] leading-[10px] mb-1">
                  Malik Jaret
                </h1>
                <span className="text-[11px] font-poppins text-[#A1A4B1]  leading-[14px]">
                  We have some concerns about the do...
                </span>
              </div>
            </div>
            <BiDotsVerticalRounded className="text-[#495057]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
