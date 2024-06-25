// import { Button } from "@/components/ui";
// import { activateSlotQuery, generateSlotQuery } from "@/services/merchant";
// import { useMutation } from "@tanstack/react-query";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { Oval } from "react-loader-spinner";
// import { useNavigate, useParams } from "react-router-dom";

// type Props = {};

// const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// const startTimes = [
//   "12am",
//   "1am",
//   "2am",
//   "3am",
//   "4am",
//   "5am",
//   "6am",
//   "7am",
//   "8am",
//   "9am",
//   "10am",
//   "11am",
// ];
// const endTimes = [
//   "12pm",
//   "1pm",
//   "2pm",
//   "3pm",
//   "4pm",
//   "5pm",
//   "6pm",
//   "7pm",
//   "8pm",
//   "9pm",
//   "10pm",
//   "11pm",
// ];
// const slotDuration = ["30 minutes", "45 minutes", "Hourly"];

// const CreatePackageSchedule = (_: Props) => {
//   const navigate = useNavigate();
//   const { packageId } = useParams<{ packageId: string }>();

//   const [timeSlots, setTimeSlots] = useState([]);

//   const approveSlot = useMutation({
//     mutationKey: ["approve slot"],
//     mutationFn: (data: { schedule: string; slots: string[] }) =>
//       activateSlotQuery(data),
//     onSuccess: (data) => {
//       setTimeSlots(data.data.data.slots);
//       console.log(data.data.data.slots);
//       navigate("/merchant/packages");
//       toast.success("Time slots activated successfully");
//     },
//     onError: (data) => {
//       console.log(data);
//       toast.error("Couldn't activate time slots");
//     },
//   });

//   const generateSlot = useMutation({
//     mutationKey: ["generate slot"],
//     mutationFn: (data: {
//       startTime: string;
//       endTime: string;
//       slotDuration: string;
//       packageId: string;
//       day: string;
//     }) => generateSlotQuery(data),
//     onSuccess: (data) => {
//       setTimeSlots(data.data.data.slots);
//       console.log(data.data.data.slots);
//       toast.success("Time slots generated successfully");
//     },
//     onError: (error: any) => {
//       toast.error(
//         error.response?.data?.message ?? "Couldn't generate time slots"
//       );
//     },
//   });

//   const [formData, setFormData] = useState({
//     startTime: "",
//     endTime: "",
//     slotDuration: "",
//     day: "",
//     packageId: packageId!,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (Boolean(selectedSlots.length > 0)) {
//       approveSlot.mutate({
//         schedule: selectedSlots[0].schedule,
//         slots: selectedSlots.map((s) => s._id),
//       });
//     } else {
//       generateSlot.mutate(formData);
//     }
//   };

//   const handleDayClick = (day: string) => {
//     setFormData({
//       ...formData,
//       day: day,
//     });
//   };

//   const isFormValid = () => {
//     return (
//       formData.startTime !== "" &&
//       formData.endTime !== "" &&
//       formData.slotDuration !== "" &&
//       formData.day !== ""
//     );
//   };

//   const [selectedSlots, setSelectedSlots] = useState<
//     { desc: string; schedule: string; _id: string }[]
//   >([]);

//   const toggleSlotSelection = (slot: {
//     desc: string;
//     schedule: string;
//     _id: string;
//   }) => {
//     if (selectedSlots.find((s) => s._id === slot._id)) {
//       setSelectedSlots(selectedSlots.filter((s) => s._id !== slot._id));
//     } else {
//       setSelectedSlots([...selectedSlots, slot]);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-8 p-4 bg-white rounded-lg max-w-[726px] min-h-screen text-black-main"
//     >
//       <p className="text-2xl font-semibold ">Schedule Availability</p>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Day
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {days.map((day) => (
//             <button
//               type="button"
//               key={day}
//               onClick={() => handleDayClick(day)}
//               className={`px-4 py-2 rounded-full flex-1 hover:bg-ca-blue/30 hover:text-black-main ${
//                 formData.day === day
//                   ? "bg-ca-blue text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               {day}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="flex gap-x-6 mt-4">
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700">
//             Start Time
//           </label>
//           <select
//             name="startTime"
//             value={formData.startTime}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 rounded-md border border-gray-200"
//           >
//             <option value="" disabled>
//               Select a start time
//             </option>
//             {startTimes.map((time) => (
//               <option key={time} value={time}>
//                 {time}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700">
//             End Time
//           </label>
//           <select
//             name="endTime"
//             value={formData.endTime}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 rounded-md border border-gray-200"
//           >
//             <option value="" disabled>
//               Select an end time
//             </option>
//             {endTimes.map((time) => (
//               <option key={time} value={time}>
//                 {time}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Slot Duration
//         </label>
//         <select
//           name="slotDuration"
//           value={formData.slotDuration}
//           onChange={handleChange}
//           className="mt-1 block w-full p-2 rounded-md border border-gray-200"
//         >
//           <option value="" disabled>
//             Select a slot duration
//           </option>
//           {slotDuration.map((duration) => (
//             <option key={duration} value={duration}>
//               {duration}
//             </option>
//           ))}
//         </select>
//       </div>

//       {Boolean(timeSlots.length) && (
//         <div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {timeSlots.map(
//               (slot: { desc: string; schedule: string; _id: string }) => (
//                 <div
//                   key={slot._id}
//                   onClick={() => toggleSlotSelection(slot)}
//                   className={`p-4 rounded-lg border hover:bg-ca-blue/30 hover:text-black-main cursor-pointer ${
//                     selectedSlots.find((s) => s._id === slot._id)
//                       ? "bg-ca-blue text-white"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   {slot.desc}
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       )}

//       <Button
//         type="submit"
//         className="px-4 py-2 blue-gradient text-white rounded-full mt-10 w-full"
//         disabled={!isFormValid()}
//       >
//         {approveSlot.isPending || generateSlot.isPending ? (
//           <Oval
//             visible={approveSlot.isPending || generateSlot.isPending}
//             height="20"
//             width="20"
//             color="#ffffff"
//             ariaLabel="oval-loading"
//             wrapperStyle={{}}
//             wrapperClass=""
//           />
//         ) : (
//           <span>Submit</span>
//         )}
//       </Button>
//     </form>
//   );
// };

// export default CreatePackageSchedule;

import { Button } from "@/components/ui";
import { generateSlotQuery } from "@/services/merchant";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const startTimes = [
  "12am",
  "1am",
  "2am",
  "3am",
  "4am",
  "5am",
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
];
const endTimes = [
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
  "10pm",
  "11pm",
];
const slotDurations = ["30 minutes", "45 minutes", "Hourly"];

const CreatePackageSchedule = (_: Props) => {
  const navigate = useNavigate();
  const { packageId } = useParams<{ packageId: string }>();

  const [entries, setEntries] = useState<
    { day: string; startTime: string; endTime: string; slotDuration: string }[]
  >([]);
  const [, setTimeSlots] = useState([]);

  const generateSlot = useMutation({
    mutationKey: ["generate slot"],
    mutationFn: (data: {
      schedules: {
        startTime: string;
        endTime: string;
        slotDuration: string;
        day: string;
      }[];
      packageId: string;
    }) => generateSlotQuery(data),
    onSuccess: (data) => {
      setTimeSlots(data.data.data.slots);
      console.log(data.data.data.slots);
      toast.success("Time slots generated successfully");
      navigate(`/merchant/packages/schedule/slots/${packageId}`);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ?? "Couldn't generate time slots"
      );
    },
  });

  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    slotDuration: "",
    day: "",
    packageId: packageId!,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    generateSlot.mutate({
      schedules: entries,
      packageId: formData.packageId,
    });
  };

  const handleDayClick = (day: string) => {
    setFormData({
      ...formData,
      day: day,
    });
  };

  const addEntry = () => {
    setEntries([...entries, formData]);
    setFormData({
      startTime: "",
      endTime: "",
      slotDuration: "",
      day: "",
      packageId: formData.packageId,
    });
  };

  const deleteEntry = (day: string) => {
    setEntries(entries.filter((entry) => entry.day !== day));
  };

  const isFormValid = () => {
    return (
      formData.startTime !== "" &&
      formData.endTime !== "" &&
      formData.slotDuration !== "" &&
      formData.day !== "" &&
      !entries.find((entry) => entry.day === formData.day)
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-4 bg-white rounded-lg max-w-[726px] min-h-screen text-black-main"
    >
      <p className="text-2xl font-semibold">Schedule Availability</p>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Day
        </label>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => handleDayClick(day)}
              className={`px-4 py-2 rounded-full flex-1 hover:bg-ca-blue/30 hover:text-black-main ${
                formData.day === day
                  ? "bg-ca-blue text-white"
                  : entries.find((entry) => entry.day === day)
                  ? "bg-gray-400 text-gray-600"
                  : "bg-gray-200 text-gray-700"
              }`}
              disabled={Boolean(entries.find((entry) => entry.day === day))}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-x-6 mt-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <select
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="mt-1 block w-full p-2 rounded-md border border-gray-200"
          >
            <option value="" disabled>
              Select a start time
            </option>
            {startTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <select
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="mt-1 block w-full p-2 rounded-md border border-gray-200"
          >
            <option value="" disabled>
              Select an end time
            </option>
            {endTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Slot Duration
        </label>
        <select
          name="slotDuration"
          value={formData.slotDuration}
          onChange={handleChange}
          className="mt-1 block w-full p-2 rounded-md border border-gray-200"
        >
          <option value="" disabled>
            Select a slot duration
          </option>
          {slotDurations.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="button"
        className="px-4 py-2 blue-gradient text-white rounded-full mt-10 w-full"
        onClick={addEntry}
        disabled={!isFormValid()}
      >
        Add Entry
      </Button>

      {Boolean(entries.length) && (
        <div className="mt-6">
          <p className="text-xl font-semibold mb-4">Entries</p>
          <ul className="space-y-2">
            {entries.map((entry, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-200 p-2 rounded-md"
              >
                <span>{`${entry.day}: ${entry.startTime} - ${entry.endTime} (${entry.slotDuration})`}</span>
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => deleteEntry(entry.day)}
                >
                  <TrashIcon className="size-6" />
                </button>
              </li>
            ))}
          </ul>
          <Button
            type="submit"
            className="px-4 py-2 blue-gradient text-white rounded-full mt-6 w-full"
          >
            {generateSlot.isPending ? (
              <Oval
                visible={generateSlot.isPending}
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
      )}
    </form>
  );
};

export default CreatePackageSchedule;
