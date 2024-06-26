// import Loading from "@/components/reusables/Loading";
// import { Button } from "@/components/ui";
// import {
//   activateSlotQuery,
//   generateSlotQuery,
//   getScheduleSlots,
// } from "@/services/merchant";
// import { TrashIcon } from "@heroicons/react/24/outline";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { Oval } from "react-loader-spinner";
// import { useNavigate, useParams } from "react-router-dom";

// type Props = {};

// const ManagePackageSchedule = (_: Props) => {
//   const navigate = useNavigate();
//   const { packageId } = useParams<{ packageId: string }>();

//   const [selectedDay, setSelectedDay] = useState<string | null>(null);
//   const [selectedSlots, setSelectedSlots] = useState<{
//     [key: string]: string[];
//   }>({});

//   const getSlots = useQuery({
//     queryKey: ["get-slots"],
//     queryFn: () => getScheduleSlots(packageId!),
//   });

//   const approveSlot = useMutation({
//     mutationKey: ["approve slot"],
//     mutationFn: (data: { schedule: string; slots: string[] }) =>
//       activateSlotQuery(data),
//     onSuccess: (data) => {
//       console.log(data.data.data.slots);
//       toast.success("Time slots generated successfully");
//     },
//     onError: (data) => {
//       console.log(data);
//       toast.error("Couldn't activate time slots");
//     },
//   });

//   console.log(getSlots.data?.data.data);

//   const hasSelectedSlots = Object.values(selectedSlots).some(
//     (slots) => slots.length > 0
//   );

//   const uniqueDays: string[] = Array.from(
//     new Set(getSlots.data?.data.data.map((item: any) => item.shortDay))
//   );

//   const handleDayClick = (day: string) => {
//     setSelectedDay(day);
//   };

//   const handleSlotToggle = (day: string, slotId: string) => {
//     setSelectedSlots((prev) => {
//       const daySlots = prev[day] || [];
//       if (daySlots.includes(slotId)) {
//         return {
//           ...prev,
//           [day]: daySlots.filter((id) => id !== slotId),
//         };
//       } else {
//         return {
//           ...prev,
//           [day]: [...daySlots, slotId],
//         };
//       }
//     });
//   };

//   const handleActivateSlots = () => {
//     // const slotsToActivate = Object.entries(selectedSlots).flatMap(([day, slots]) =>
//     //   slots.map(slot => ({ schedule: day, slots }))
//     // );
//     // if (slotsToActivate.length > 0) {
//     //   approveSlot.mutate({ schedule: selectedDay, slots: selectedSlots[selectedDay] });
//     // }
//     console.log(selectedSlots);
//   };

//   return (
//     <>
//       {getSlots.isLoading && (
//         <div className="mt-6">
//           <Loading message="" />
//         </div>
//       )}
//       {getSlots.isSuccess && (
//         <div className="space-y-8 p-4 bg-white rounded-lg max-w-[726px] min-h-screen text-black-main">
//           <div className="flex space-x-4">
//             {uniqueDays.map((day: string) => (
//               <Button
//                 variant={"ghost"}
//                 key={day!}
//                 onClick={() => handleDayClick(day)}
//                 className={`rounded-full ${
//                   selectedDay === day
//                     ? "bg-blue-500 text-white"
//                     : "!bg-gray-200"
//                 }`}
//               >
//                 {day}
//               </Button>
//             ))}
//             {/* {uniqueDays.map((day) => (
//              <Button
//                key={day!}
//                onClick={() => handleDayClick(day)}
//                className={`${
//                  selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-200"
//                }`}
//              >
//                {day}
//              </Button>
//            ))} */}
//           </div>
//           <div>
//             {selectedDay && (
//               <div>
//                 {getSlots.data?.data.data
//                   .filter((item: any) => item.shortDay === selectedDay)
//                   .map((item: any) => (
//                     <div key={item._id} className="space-y-2">
//                       <div className="font-bold">{item.day}</div>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {item.slots.map((slot: any) => (
//                           <Button
//                             variant={"ghost"}
//                             key={slot._id}
//                             onClick={() =>
//                               handleSlotToggle(item.shortDay, slot._id)
//                             }
//                             className={`w-full ${
//                               selectedSlots[item.shortDay]?.includes(slot._id)
//                                 ? "bg-green-500 text-white"
//                                 : "bg-gray-200"
//                             }`}
//                           >
//                             {slot.desc}
//                           </Button>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//           <div className="mt-4">
//             {approveSlot.isPending ? (
//               <div className="flex justify-center">
//                 <Oval
//                   height={30}
//                   width={30}
//                   color="#4fa94d"
//                   ariaLabel="loading"
//                 />
//               </div>
//             ) : (
//               <Button
//                 onClick={handleActivateSlots}
//                 disabled={!hasSelectedSlots}
//                 className={`mt-4 ${
//                   hasSelectedSlots ? "bg-blue-500 text-white" : "bg-gray-300"
//                 }`}
//               >
//                 Activate Slots
//               </Button>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ManagePackageSchedule;

import Loading from "@/components/reusables/Loading";
import { Button } from "@/components/ui";
import { activateSlotQuery, getScheduleSlots } from "@/services/merchant";
import { cn } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsClock } from "react-icons/bs";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const ManagePackageSchedule = (_: Props) => {
  const navigate = useNavigate();
  const { packageId } = useParams<{ packageId: string }>();

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<{
    [key: string]: string[];
  }>({});

  const getSlots = useQuery({
    queryKey: ["get-slots"],
    queryFn: () => getScheduleSlots(packageId!),
  });

  const approveSlot = useMutation({
    mutationKey: ["approve slot"],
    mutationFn: (data: { schedule: string; slots: string[] }[]) =>
      activateSlotQuery(data),
    onSuccess: (data) => {
      console.log(data.data.data.slots);
      toast.success("Time slots generated successfully");
      navigate("/merchant/packages");
    },
    onError: (data) => {
      console.log(data);
      toast.error("Couldn't activate time slots");
    },
  });

  console.log(getSlots.data?.data.data);

  const hasSelectedSlots = Object.values(selectedSlots).some(
    (slots) => slots.length > 0
  );

  const uniqueDays: string[] = Array.from(
    new Set(getSlots.data?.data.data.map((item: any) => item.shortDay))
  );

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  const handleSlotToggle = (day: string, slotId: string) => {
    setSelectedSlots((prev) => {
      const daySlots = prev[day] || [];
      if (daySlots.includes(slotId)) {
        return {
          ...prev,
          [day]: daySlots.filter((id) => id !== slotId),
        };
      } else {
        return {
          ...prev,
          [day]: [...daySlots, slotId],
        };
      }
    });
  };

  const handleActivateSlots = () => {
    const slotsToActivate = Object.entries(selectedSlots).map(
      ([schedule, slots]) => ({
        schedule: getSlots.data?.data.data.filter(
          (d: any) => d.shortDay === schedule
        )[0]._id,
        slots,
      })
    );

    console.log(slotsToActivate);

    approveSlot.mutate(slotsToActivate);
  };

  console.log(getSlots.data);

  useEffect(() => {
    const initialSelectedSlots: Record<string, string[]> = {};
    getSlots.data?.data.data.forEach((schedule: any) => {
      initialSelectedSlots[schedule.shortDay] = schedule.slots
        .filter((slot: any) => slot.status === "active")
        .map((slot: any) => slot._id);
    });
    console.log(initialSelectedSlots);

    setSelectedSlots(initialSelectedSlots);
    setSelectedDay(getSlots.data?.data.data[0].shortDay);
  }, [getSlots.isSuccess]);

  return (
    <>
      {getSlots.isLoading && (
        <div className="mt-6">
          <Loading message="" />
        </div>
      )}
      {getSlots.isSuccess && (
        <div className="space-y-8 p-4 bg-white rounded-lg max-w-[726px] min-h-screen text-black-main">
          <p className="text-2xl font-semibold">Manage Availability Slots</p>
          <p className="mt-2">Activate your availability slots as you wish.</p>
          <div className="flex space-x-4">
            {uniqueDays.map((day: string) => (
              <Button
                variant={"ghost"}
                key={day!}
                onClick={() => handleDayClick(day)}
                className={`rounded-full ${
                  selectedDay === day
                    ? "bg-ca-blue !text-white hover:bg-ca-blue"
                    : "!bg-gray-200"
                }`}
              >
                {day}
              </Button>
            ))}
          </div>
          <div>
            {selectedDay && (
              <div>
                {getSlots.data?.data.data
                  .filter((item: any) => item.shortDay === selectedDay)
                  .map((item: any) => (
                    <div key={item._id} className="space-y-2">
                      <div className="font-bold">{item.day}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {item.slots.map((slot: any) => (
                          <Button
                            variant={"ghost"}
                            key={slot._id}
                            onClick={() =>
                              handleSlotToggle(item.shortDay, slot._id)
                            }
                            className={`w-full group gap-x-2 ${
                              selectedSlots[item.shortDay]?.includes(slot._id)
                                ? "bg-green-500 !text-white hover:bg-green-500"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                          >
                            <BsClock
                              className={cn(
                                "text-ca-blue  size-4 shrink-0",
                                selectedSlots[item.shortDay]?.includes(
                                  slot._id
                                ) && "text-white group-hover:text-white"
                              )}
                            />
                            {slot.desc}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              className="px-4 py-2 blue-gradient text-white mt-6 w-fit"
              onClick={handleActivateSlots}
              disabled={!hasSelectedSlots}
            >
              {approveSlot.isPending ? (
                <Oval
                  visible={approveSlot.isPending}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagePackageSchedule;
