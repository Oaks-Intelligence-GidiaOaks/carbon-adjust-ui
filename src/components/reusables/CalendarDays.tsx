import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils";

interface CalendarProps {
  scheduledDays?: string[]; // Array of days of the week
  setDate: (dt: Dayjs) => void;
}

const CalendarDays: React.FC<CalendarProps> = ({
  scheduledDays = [],
  setDate,
}) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const monthOptions = Array.from({ length: 12 }, (_, i) =>
    dayjs().month(i).format("MMMM")
  );
  const yearOptions = Array.from({ length: 20 }, (_, i) => dayjs().year() + i);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = endOfMonth.diff(startOfMonth, "day") + 1;
  const startDay = startOfMonth.day();
  const today = dayjs().startOf("day");

  const daysArray = Array.from({ length: daysInMonth }, (_, i) =>
    startOfMonth.add(i, "day")
  );

  const prevMonthDaysArray = Array.from({ length: startDay }, (_, i) =>
    startOfMonth.subtract(startDay - i, "day")
  );

  const nextMonthDaysArray = Array.from(
    { length: 42 - (daysInMonth + startDay) },
    (_, i) => endOfMonth.add(i + 1, "day")
  );

  const handleDateClick = (date: dayjs.Dayjs) => {
    if (date.isBefore(today, "day")) return;
    setSelectedDate(date);
    console.log(date, "calendar date");
    setDate(date);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(currentDate.month(parseInt(e.target.value)));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(currentDate.year(parseInt(e.target.value)));
  };

  // Convert scheduled days to dates
  const getScheduledDates = (): Dayjs[] => {
    const daysOfWeekMap: { [key: string]: number } = {
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
    };

    const scheduledDates: Dayjs[] = [];

    scheduledDays.forEach((day) => {
      const dayOfWeek = daysOfWeekMap[day.toLowerCase()];
      if (dayOfWeek !== undefined) {
        for (let i = 0; i < daysInMonth; i++) {
          const date = startOfMonth.add(i, "day");
          if (date.day() === dayOfWeek) {
            scheduledDates.push(date);
          }
        }
      }
    });

    return scheduledDates;
  };

  const scheduledDates = getScheduledDates();

  return (
    <div className="p-4 bg-white rounded-3xl shadow-md mx-auto max-w-[765px] font-poppins px-14 pb-8 border border-border">
      <div className="flex justify-center gap-6 mb-4">
        <div className="bg-gray-100 pr-2 rounded-lg">
          <select
            value={currentDate.month()}
            onChange={handleMonthChange}
            className="p-2 bg-gray-100 rounded-md text-blue-main font-bold font-open-sans cursor-pointer outline-offset-0 focus-within:outline-none"
          >
            {monthOptions.map((month, index) => (
              <option
                key={index}
                value={index}
                className="text-blue-main font-bold"
              >
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-gray-100">
          <select
            value={currentDate.year()}
            onChange={handleYearChange}
            className="p-2 rounded-md font-open-sans font-bold cursor-pointer outline-offset-0 focus-within:outline-none"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold font-open-sans">
            {day}
          </div>
        ))}
        {prevMonthDaysArray.map((date) => (
          <div
            key={date.toString()}
            className="p-2 text-center text-gray-400 rounded-md opacity-30 bg-transparent"
          >
            {date.date()}
          </div>
        ))}
        {daysArray.map((date) => {
          const isScheduled = scheduledDates.some((d) => d.isSame(date, "day"));
          const isToday = date.isSame(today, "day");
          const isPast = date.isBefore(today, "day");
          const isSelected = selectedDate?.isSame(date, "day");

          return (
            <div
              key={date.toString()}
              className={`p-2 text-center cursor-pointer rounded-full flex items-center justify-center transition-all relative ${
                isSelected
                  ? "bg-gradient-to-r from-[#2E599A] to-[#0B8DFF] text-white hover:scale-105"
                  : isToday
                  ? "bg-[#0B8DFF10] hover:bg-[#0B8DFF30]"
                  : isScheduled && isPast
                  ? "bg-transparent hover:bg-gray-100 cursor-not-allowed opacity-30 text-gray-500"
                  : isScheduled
                  ? "bg-transparent hover:bg-gray-100"
                  : isPast
                  ? "bg-transparent opacity-30 cursor-not-allowed text-gray-500"
                  : "bg-transparent hover:bg-gray-100"
              }`}
              onClick={() => handleDateClick(date)}
            >
              {date.date()}
              {isScheduled && (
                <span className="ml-1 text-blue-500 absolute top-2 right-2">
                  <ClipboardDocumentCheckIcon
                    className={cn(
                      "size-6",
                      isScheduled && isSelected && "text-white"
                    )}
                  />
                </span>
              )}
            </div>
          );
        })}
        {nextMonthDaysArray.map((date) => (
          <div
            key={date.toString()}
            className="p-2 text-center text-gray-400 rounded-md bg-transparent"
          >
            {date.date()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDays;
