import { useRef, useState } from "react";
import * as _ from "lodash";
// import FormInput from "../../components/form/FormInput";
// import TextArea from "../../components/form/TextArea";
// import mapPlaceholder from "../../assets/map-placeholder.png";
// import emailIcon from "../../assets/email.svg";
// import location from "../../assets/location.svg";
// import useSupportMap from "../hooks/useSupportMap";
// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
// import LoadingModal from "../modals/applications/LoadingModal";
// import ResponseMessage from "./ResponseMessage";
import { useMemo } from "react";
import { Input } from "@/components/ui";
import useContactMap from "@/hooks/useContactMap";
import { ContactLocationIcon, ContactMailIcon } from "@/assets/icons";
import TextArea from "@/components/ui/TextArea";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const mapRef = useRef(null);

  useContactMap(mapRef.current);

  // const sendSupportMessageMutation = useMutation({
  //   mutationKey: "send_support_message",
  //   mutationFn: (data) => {
  //     return axios
  //       .post("message/send_support_message", data, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((res) => res.data);
  //   },
  //   onSuccess: (data) => {
  //     console.log(data);
  //     setFullName("");
  //     setEmail("");
  //     setMessage("");
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  // const handleClick = () => {
  //   sendSupportMessageMutation.mutate({
  //     fullName,
  //     email,
  //     message,
  //   });
  // };

  const messageMutation = useMutation({
    mutationKey: ["message admin"],
    mutationFn: () =>
      axiosInstance.post("/users/system/contact", {
        name: fullName,
        from: email,
        message: message,
      }),
    onSuccess: () => {
      setFullName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent successfully");
    },
    onError: () => {
      toast.error("Error sending message");
    },
  });

  const isDisabled = useMemo(() => {
    if (fullName.length < 1) return true;
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return true;
    if (message.length < 1) return true;

    return false;
  }, [fullName, email, message]);

  return (
    <div className="px-4 sm:px-10 font-poppins mt-10">
      {/* {sendSupportMessageMutation.isLoading && (
        <LoadingModal text={"Sending Message"} />
      )} */}
      <h3 className="font-poppins text-lg text-main font-[700]">Support</h3>
      <p className="text-main mt-1">
        Reach out to us for support and for further enquiry
      </p>
      <div className="flex justify-between py-6 gap-10">
        <div className="flex-1 max-w-[500px] min-[1000px]:flex-[0.5]">
          {/* Name */}
          <Input
            name="fullName"
            label="Full Name"
            labelClassName="mb-4 text-black/50 text-sm"
            wrapperClassName="mt-6"
            inputClassName="bg-gray-100 rounded-lg"
            placeholder="James Moore"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {/* Email */}
          <Input
            name="email"
            label="Email Address"
            labelClassName="mb-4 text-black/50 text-sm"
            wrapperClassName="mt-6"
            inputClassName="bg-gray-100 rounded-lg"
            placeholder="jamesmoore@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Meseage */}
          <TextArea
            name="message"
            label="Message"
            labelClassName="mb-4 text-black/50 text-sm"
            wrapperClassName="mt-6"
            inputClassName="bg-gray-100 rounded-lg"
            placeholder="Type here..."
            className="resize-none"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* <ResponseMessage
            noMargin={true}
            isSuccess={sendSupportMessageMutation.isSuccess}
            isError={sendSupportMessageMutation.isError}
            message={sendSupportMessageMutation.data?.message}
          /> */}
          <button
            disabled={isDisabled || messageMutation.isPending}
            onClick={() => messageMutation.mutate()}
            className={`w-full flex justify-center items-center mt-8 bg-[#2196F3] text-white poppins-4 py-4 rounded-lg text-sm ${
              isDisabled || messageMutation.isPending ? "grayscale" : null
            }`}
          >
            {messageMutation.isPending ? (
              <Oval
                visible={messageMutation.isPending}
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span>Send</span>
            )}
          </button>
        </div>
        <div className="relative hidden pt-4 pr-4 max-h-[440px] max-w-[540px] min-[1000px]:flex-[0.5] min-[1000px]:flex flex-col">
          <div className="size-[50%] absolute top-0 right-0 bg-black bg-gradient-to-r from-blue-secondary to-blue-main" />
          <div
            // src={mapPlaceholder}
            ref={mapRef}
            id="myMap"
            // alt="map"
            className="relative z-[2] object-cover w-full h-full bg-gray-100"
          />
          {/* bg box */}
          <div className="w-1/2 h-1/2 bg-ca-blue absolute -top-4 -right-4" />
        </div>
      </div>
      {/* Extra details */}
      <div className="flex flex-wrap gap-y-10 mt-10 px-2 gap-x-20 min-[1000px]:pl-20 mb-20">
        <div className="flex gap-2 items-center">
          <ContactMailIcon width={40} className="w-10 sm:w-auto" />
          <div>
            <p className="text-main font-[600] text-sm">Email:</p>
            <p className="text-gray-500 text-xs">
              consultancy@escrow-tech.co.uk
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <ContactLocationIcon width={40} className="w-10 sm:w-auto" />
          <div>
            <p className="text-main font-[600] text-sm">Location:</p>
            <p className="text-gray-500 text-xs">21 1st Avenue, London, UK</p>
          </div>
        </div>
        {/* <div></div> */}
      </div>
    </div>
  );
};

export default Contact;
