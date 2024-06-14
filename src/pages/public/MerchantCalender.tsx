import MerchantCalendar from "@/components/reusables/MerchantCalendar";

type Props = {};

const MerchantBookings = (_: Props) => {
  const scheduledDates = ["2024-06-04", "2024-06-15", "2024-07-20"];
  return (
    <div className="pt-4">
      <MerchantCalendar scheduledDates={scheduledDates} />
    </div>
  );
};

export default MerchantBookings;
