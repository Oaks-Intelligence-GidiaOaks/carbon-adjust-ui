import MerchantBookings from "@/pages/public/MerchantCalender";

type Props = {};

const Bookings = (_: Props) => {
  return (
    <div className="px-3 lg:px-4 sm:max-w-[calc(100vw-280px)]">
      <div className="flex-center justify-between">
        <div className="flex flex-col gap-[6px] my-4">
          <h2 className="font-[600] text-lg ">Bookings</h2>

          <h6 className="font-[400] text-sm text-[#575757]">
            Here is a calendar for viewing your bookings.
          </h6>
        </div>
      </div>

      <MerchantBookings />
    </div>
  );
};

export default Bookings;
