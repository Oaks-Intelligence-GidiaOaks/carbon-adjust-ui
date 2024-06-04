type Props = {};

const NewMessageCard = (_: Props) => {
  return (
    <div className="bg-[#139EEC] rounded-lg px-4 py-2 w-[250px]  overflow-hidden overflow-ellipsis">
      <div className="flex items-center gap-3">
        <img
          src={
            "https://th.bing.com/th/id/R.c38c5d0bf0f865ab634290de0416da15?rik=%2bogHmDz5qwqSdg&pid=ImgRaw&r=0"
          }
          className="bg-cover h-10 w-10"
          alt="image"
        />
        <div>
          <h1 className="text-[#FFFFFF]">Jeffery Moore</h1>
          <span className="text-[12px] text-[#FFFFFF] poppins-4 whitespace-nowrap">
            JSK Financial services
          </span>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-[12px] text-[#FFFFFF] poppins-4 leading-[20px]">
          We will like you to confirm that the documents you with b...
        </span>
      </div>
    </div>
  );
};

export default NewMessageCard;
