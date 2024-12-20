import { useState } from "react";
import OtpInput from "react-otp-input";
import { Button } from "../ui";
import { Oval } from "react-loader-spinner";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { FaArrowRotateRight } from "react-icons/fa6";
import { ResendPhoneOtp } from "@/services/organisation";

type Props = {
  phone: string;
  nextStep: () => void;
  closeVerifyPhoneNumber: () => void;
};

const VerifyPhone = ({ phone, nextStep, closeVerifyPhoneNumber }: Props) => {
  const [otp, setOtp] = useState("");

  const verifyPhone = useMutation({
    mutationFn: (userData: { phone: string; token: number }) =>
      axiosInstance.post(`/users/verify/phone`, userData),
    mutationKey: ["verify-phone"],
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        className: "z-[100000000000]",
      });
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
        className: "z-[100000000]",
      });
      closeVerifyPhoneNumber();
      nextStep();
    },
  });

  const resendOtp = useMutation({
    mutationKey: ["resend-phone-otp"],
    mutationFn: (phoneNos: string) => ResendPhoneOtp(phoneNos),
    onSuccess: (sx: any) => {
      toast.success(sx.message || "otp sent successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || `error sending otp, please try again.`,
        {
          className: "z-[100000000000]",
        }
      );
    },
  });

  return (
    <div className="px-2 fixed top-0 left-0 bg-gray-950/10  w-screen h-screen backdrop-blur-sm z-[1000000]">
      <div className="w-full h-full flex justify-center items-center overflow-y-scroll">
        <div className="w-full max-w-[684px] py-6 px-10 sm:py-11 sm:px-20 bg-white rounded-xl shadow-lg">
          <p className="text-2xl font-semibold text-center">
            Verify Phone Number
          </p>

          <p className="w-full text-center max-w-[368px] mx-auto mt-2 font-poppins">
            Enter the OTP code sent to your phone number {phone}
          </p>

          <p className="text-sm mt-16">Enter Verification code (OTP)</p>

          <OtpInput
            value={otp}
            onChange={(value) => setOtp(value)}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            containerStyle={"w-full flex justify-between mt-2"}
            inputStyle={
              "min-w-10 text-black-main h-10 text-lg font-semibold rounded-md bg-gray-100 border-2 border-grey-950/30 focus:ring-blue-main"
            }
          />

          <div className="w-fit ml-auto">
            <button
              onClick={() => resendOtp.mutateAsync(phone)}
              disabled={resendOtp.isPending}
              className="my-3 w-fit border p-2 rounded-xl px-3 hover:border-blue-400 disabled:text-muted disabled:border-muted flex-center gap-2 font-inter text-sm"
            >
              Resend <FaArrowRotateRight />
            </button>
          </div>

          <Button
            onClick={() => verifyPhone.mutate({ phone, token: parseInt(otp) })}
            disabled={otp.length < 6 || verifyPhone.isPending}
            className="rounded-lg text-white mt-4 w-full h-11 flex items-center justify-center"
          >
            {verifyPhone.isPending ? (
              <Oval
                visible={verifyPhone.isPending}
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span>Verify</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
