import { useState } from "react";
import OtpInput from "react-otp-input";
import { Button } from "../ui";
import { Oval } from "react-loader-spinner";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = { email: string };

const VerifyEmail = ({ email }: Props) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const verifyEmail = useMutation({
    mutationFn: (userData: { email: string; token: number }) =>
      axiosInstance.post(`/auth/verify/email`, userData),
    mutationKey: ["verify-email"],
    onError: (error: any) => {
      toast.error(error.response.data.message, { className: "z-[100000000]" });
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
        className: "z-[100000000]",
      });
      navigate("/login");
    },
  });

  return (
    <div className="px-2 fixed top-0 left-0 bg-gray-950/10  w-screen h-screen backdrop-blur-sm z-[1000]">
      <div className="w-full h-full flex justify-center items-center overflow-y-scroll">
        <div className="w-full max-w-[684px] py-6 px-10 sm:py-11 sm:px-20 bg-white rounded-xl shadow-lg">
          <p className="text-2xl font-semibold text-center">
            Verify Email address
          </p>
          <p className="w-full text-center max-w-[368px] mx-auto mt-2 font-poppins">
            Enter the OTP code sent to your email address {email}
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
          <Button
            onClick={() => verifyEmail.mutate({ email, token: parseInt(otp) })}
            disabled={otp.length < 6 || verifyEmail.isPending}
            className="rounded-lg text-white mt-4 w-full h-11 flex items-center justify-center"
          >
            {verifyEmail.isPending ? (
              <Oval
                visible={verifyEmail.isPending}
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

export default VerifyEmail;
