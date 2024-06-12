// import React from "react";
import Calendar from "@/components/reusables/Calendar";
import { IoIosAlert } from "react-icons/io";
// this is the calendar page for booking appointments
import { CiClock2 } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createOrderBookingSlot,
  getCurrentDayOrderBookingSlots,
} from "@/services/homeOwner";
import { useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const Appointment = (_: Props) => {
  const { orderId } = useParams();
  const [dt, setDt] = useState<string>("");

  // console.log(orderId, "order id");
  const orderData = {
    orderId: orderId!.toString(),
  };

  const { data, error, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-current-day-bookings"],
    queryFn: () => getCurrentDayOrderBookingSlots(orderData),
    enabled: true,
  });

  const createOrderBooking = useMutation({
    mutationKey: ["create-order-booking"],
    mutationFn: (orderData) => createOrderBookingSlot(orderData),

    onSuccess: (sx: any) => {
      toast.success(`slot booked successfully`);
    },
    onError: (ex: any) => {
      toast.error(`error occurred booking slot`);
    },
  });

  const getSpecificDateSlots = () => {
    refetch();
  };

  const handleBooking = (slotData) => {
    const orderData = {
      orderId,
      schedule: slotData.schedule,
      slot: slotData._id,
      appointmentData: dt,
    };

    createOrderBooking.mutate(orderData);
  };

  const slots = isSuccess ? data.slots : [];

  return (
    <div>
      <div className="flex items-stretch gap-10">
        <div className="flex-[0.65] flex flex-col">
          <div className="bg-[#14016F] text-white rounded-lg pt-[37px] pb-[55px] pl-11 space-y-2">
            <h2 className="font-[700] text-xl">Hello, Let's Talk !</h2>

            <h5 className="font-[400]">
              Schedule a 30 min one-to-one call to discuss your retrofitting
              plans
            </h5>

            <div className="flex-center gap-2 font-[400]">
              <IoIosAlert color="#0E89F7" />
              <span>This call is highly recommended!</span>
            </div>
          </div>

          <div className="w-[90%] mx-auto mt-6">
            {/* calendar */}
            <div>
              <h2 className="mb-6">Choose a Date</h2>

              <div>
                <Calendar key={1} scheduledDates={[]} />
              </div>
            </div>

            {/* time slots */}
            <div className="">
              <h2 className="pyb-6 pt-10">Pick a time</h2>

              <div className="grid grid-cols-3 gap-3 mt-10">
                {Array.from(slots, (item) => (
                  <div
                    onClick={() => handleBooking(item)}
                    key={item?._id}
                    className="border p-3 grid place-items-center rounded-lg"
                  >
                    <span>9:30 - 10:30 </span>
                  </div>
                ))}
              </div>

              <div className="flex-center w-4/5 mx-auto mt-8 gap-4">
                <button className="bg-[#CCCAD1] flex-1 py-3 rounded-lg">
                  Back
                </button>

                <button className="blue-gradient text-white hover:bg-gradient-to-t flex-1 py-3 rounded-lg">
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[0.3] px-8 bg-[#DEDBDB] rounded-lg py-6">
          <div className="flex items-center gap-4">
            <img
              src="/assets/graphics/user-img.svg"
              alt=""
              className="rounded-full w-[100px] h-[100px] border "
            />

            <div className="flex flex-col gap-2 justify-between">
              <h2 className="font-[700] text-lg">Advisory call</h2>

              <div className="flex items-start gap-2">
                <CiClock2 className="mt-1" />

                <div className="flex flex-col gap-2 text-sm">
                  <h2 className="">Duration</h2>

                  <h5 className="font-[300]">30 - 45 mins</h5>
                </div>
              </div>
            </div>
          </div>

          <h2 className="mt-3 ">Andrew Griddins</h2>

          <hr className="my-6" />

          <p className="pb-5">
            It is a chance to connect with one of our team members to learn more
            about our platform and how we can help you achieve your goals
          </p>

          <div className="flex flex-col gap-3 font-[400] pb-6">
            <div className="flex-center text-xs gap-3">
              <FaCheck />
              <span>Get professional support </span>
            </div>
            <div className="flex-center text-xs gap-3">
              <FaCheck />
              <span>Get professional support </span>
            </div>

            <div className="flex-center text-xs gap-3">
              <FaCheck />
              <span>Get professional support </span>
            </div>

            <div className="flex-center text-xs gap-3">
              <FaCheck />
              <span>Get professional support </span>
            </div>

            <div className="flex-center text-xs gap-3">
              <FaCheck />
              <span>Get professional support </span>
            </div>
          </div>

          {/*  */}
          <p className="">
            You can also bring any questions that you might have for us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
