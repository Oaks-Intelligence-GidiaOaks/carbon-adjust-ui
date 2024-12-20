// import React from "react";
// import Calendar from "@/components/reusables/Calendar";
import { IoIosAlert } from "react-icons/io";
// this is the calendar page for booking appointments
import { CiClock2 } from "react-icons/ci";
// import { FaCheck } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrderBookingSlot,
  getCurrentDayOrderBookingSlots,
} from "@/services/homeOwner";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ISlot } from "@/interfaces/slots.interface";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/store";
import { Oval } from "react-loader-spinner";
import { Dayjs } from "dayjs";
import {
  getBrowserAndOS,
  getFormattedDayFromIndex,
  getFormattedMonthFromIndex,
} from "@/lib/utils";
import SlotsLoading from "@/components/reusables/SlotsLoading";
import CalendarDays from "@/components/reusables/CalendarDays";
import {
  IOrderBookingEventPayload,
  IPageViewPayload,
  MonitoringEvent,
  PageEvent,
  SubLevelEvent,
} from "@/interfaces/events.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import SocketService from "@/repository/socket";

type Props = {};

const Appointment = (_: Props) => {
  const { user } = useSelector((state: RootState) => state);

  const { browser, os } = getBrowserAndOS();

  const pageEventPayload: IPageViewPayload = {
    name: PageEvent.ORDER_LIST,
    time: Date.now(),
    userId: user.user?._id as string,
    browser,
    os,
  };

  useEffect(() => {
    SocketService.emit(MonitoringEvent.NEW_PAGE_VIEW, pageEventPayload);
  }, []);

  const { orderId } = useParams();
  const [dt, setDt] = useState<any>();
  const [activeSlot, setActiveSlot] = useState<ISlot>();
  const [isDateLoading, setIsDateLoading] = useState(false);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const orderData = {
    orderId: orderId!.toString(),
    dt:
      dt &&
      `${dt.$y}-${getFormattedMonthFromIndex(dt.$M)}-${getFormattedDayFromIndex(
        dt.$D
      )}`,
  };

  const {
    data,
    isLoading: slotsLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["get-current-day-bookings"],
    queryFn: () => getCurrentDayOrderBookingSlots(orderData),
    enabled: true,
    retry: 0,
  });

  const slots = isSuccess ? data.data.slots : [];

  const scheduledDays =
    isSuccess && data.data.schedules.length > 0
      ? data.data.schedules.map((it: any) => it.shortDay.toLowerCase())
      : [];

  const createOrderBooking = useMutation({
    mutationKey: ["create-order-booking"],
    mutationFn: (orderData: {
      orderId: string;
      schedule: string;
      slot: string;
      appointmentDate: string;
    }) => createOrderBookingSlot(orderData),

    onSuccess: (_: any) => {
      navigate(`/dashboard/orders`);
      toast.success(`slot booked successfully`);
      queryClient.invalidateQueries({
        queryKey: ["get-current-day-bookings"],
      });
    },
    onError: (ex: any) => {
      console.log(ex, "error obj");
      toast.error(ex.response.data.message);
    },
  });

  useEffect(() => {
    if (dt) {
      setIsDateLoading(true);
      refetch().then(() => setIsDateLoading(false));
    }
  }, [dt, refetch]);

  let bookingEventPayload: IOrderBookingEventPayload = {
    orderId: orderId as string,
    userId: user.user?._id as string,
    time: Date.now(),
    eventName: SubLevelEvent.ORDER_BOOKING_EVENT,
  };

  const handleSlotClick = (slot: ISlot) => {
    setActiveSlot(slot);
  };

  const handleBookSlot = () => {
    SocketService.emit(MonitoringEvent.NEW_SUBLEVEL_EVENT, bookingEventPayload);

    const bookingData = {
      orderId: orderId!,
      schedule: activeSlot?.schedule!,
      slot: activeSlot?._id!,
      appointmentDate: activeSlot?.createdAt!,
    };

    createOrderBooking.mutate(bookingData);
  };

  const proceedDisabled =
    activeSlot === undefined || createOrderBooking.isPending;

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
              <span>This call is highly recommended!!</span>
            </div>
          </div>

          <div className="w-[90%] mx-auto mt-6">
            {/* calendar */}
            <div>
              <h2 className="mb-6">Choose a Date</h2>

              <div>
                <CalendarDays
                  scheduledDays={scheduledDays}
                  setDate={(d: Dayjs) => setDt(d)}
                />
              </div>

              {/* <div>
                <Calendar
                  key={1}
                  scheduledDates={[]}
                  setDate={(d: Dayjs) => setDt(d)}
                />
              </div> */}
            </div>

            {/* time slots */}
            <div className="">
              <h2 className="pyb-6 pt-10 font-[500]">Pick a time</h2>

              {slotsLoading || isDateLoading ? (
                <div>
                  <SlotsLoading />
                </div>
              ) : slots?.length > 0 ? (
                <div className="grid grid-cols-3 gap-3 mt-10">
                  {Array.from(slots, (item: ISlot) => (
                    <div
                      onClick={() => handleSlotClick(item)}
                      key={item._id}
                      className={`${
                        activeSlot?._id === item._id &&
                        "blue-gradient text-white"
                      } border p-3 grid place-items-center rounded-lg text-sm font-[500] cursor-pointer`}
                    >
                      <span>{item.desc}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid place-items-center w-fit mx-auto my-8 font-[600]">
                  <p>No available slots for this date</p>
                </div>
              )}

              <div className="flex-center w-4/5 mx-auto mt-8 gap-4">
                {/* <button className="bg-[#CCCAD1] flex-1 py-3 rounded-lg">
                  Back
                </button> */}

                <button
                  disabled={proceedDisabled}
                  onClick={handleBookSlot}
                  className={`${
                    proceedDisabled
                      ? "bg-gray-300 cursor-not-allowed"
                      : "blue-gradient"
                  }  text-white hover:bg-gradient-to-t flex-1 py-3 rounded-lg grid place-items-center`}
                >
                  {createOrderBooking.isPending ? (
                    <Oval
                      visible={true}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Proceed</span>
                  )}
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

          {/* <p className="pb-5">
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

          <p className="">
            You can also bring any questions that you might have for us!
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
