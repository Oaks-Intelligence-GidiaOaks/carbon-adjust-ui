import { ClockIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Button } from "../ui";
import { useNavigate } from "react-router-dom";

type Slot = {
  _id: string;
  desc: string;
  schedule: string;
  createdBy: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type DaySchedule = {
  _id: string;
  day: string;
  package: string;
  slots: Slot[];
};

type ScheduleTabsProps = {
  schedules: DaySchedule[];
  packageId: string;
};

const ScheduleTabs: React.FC<ScheduleTabsProps> = ({
  schedules,
  packageId,
}) => {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(schedules[0]?.day);

  const handleTabClick = (day: string) => {
    setActiveDay(day);
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        {schedules.map((schedule) => (
          <button
            key={schedule._id}
            className={`py-2 px-4 border rounded-lg ${
              activeDay === schedule.day
                ? "bg-ca-blue text-white text-sm"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabClick(schedule.day)}
          >
            {schedule.day}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {Boolean(
          schedules
            .find((schedule) => schedule.day === activeDay)
            ?.slots.filter((slot) => slot.status === "active").length
        ) ? (
          schedules
            .find((schedule) => schedule.day === activeDay)
            ?.slots.filter((slot) => slot.status === "active")
            .map((slot) => (
              <div
                key={slot._id}
                className="p-4 border rounded-lg bg-gray-100 shadow-md w-full sm:w-auto text-sm flex items-center gap-2"
              >
                <ClockIcon className="text-ca-blue size-4" />
                {slot.desc}
              </div>
            ))
        ) : (
          <p className="text-sm text-gray-500">
            No slot activated for this day
          </p>
        )}
      </div>
      <div className="flex justify-end mt-6">
        <Button
          variant={"outline"}
          className=""
          onClick={() =>
            navigate(`/merchant/packages/schedule/slots/${packageId}`)
          }
        >
          Manage Schedule
        </Button>
      </div>
    </div>
  );
};

export default ScheduleTabs;
