import CustomCalendar from "@/components/reusables/Calendar";

type Props = {};

const Calendar = (_: Props) => {
  const scheduledDates = ["2024-06-04", "2024-06-15", "2024-07-20"];
  return (
    <div className="pt-10">
      <CustomCalendar scheduledDates={scheduledDates} />
    </div>
  );
};

export default Calendar;
