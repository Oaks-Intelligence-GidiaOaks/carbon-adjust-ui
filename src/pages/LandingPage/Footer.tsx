import { ChangeEvent, MouseEvent, useState } from "react";
import footerLogo from "../../assets/footerLogo.svg";
import { NavLink } from "react-router-dom";
import { BsSend } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import ResponseMessage from "@/components/reusables/ResponseMessage";
import toast from "react-hot-toast";

const Footer = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const currentYear = new Date().getFullYear();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const requestMoreMutation = useMutation({
    mutationKey: ["send-message"],
    mutationFn: async () => {
      const { email } = form;
      try {
        const response = await axios.post("/message/request_info", {
          email: email,
        });
        return response.data;
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: () => {
      setForm({
        email: "Message successfully sent.",
      });
    },
    onError: () => {
      toast.error("Error sending message.");
    },
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    requestMoreMutation.mutate();
  };

  // let iconStyles = { color: "white" };
  return (
    <div className="bg-[#4688E9] px-6 lg:px-0 h-[450px] md:h-[250px] relative">
      <div className="lg:container">
        <div className="pt-10">
          <div className="md:flex md:flex-wrap md:items-center md:justify-between">
            <img className=" bg-cover w-36" src={footerLogo} alt="" />
            <div className="flex flex-col gap-6 lg:gap-3 md:items-center md:justify-center mt-6 md:mt-0">
              <NavLink
                to={"#"}
                className="text-sm font-medium font-poppins text-white md:flex md:items-center md:justify-center"
              >
                Help
              </NavLink>
              <NavLink
                to={"#"}
                className="text-sm font-medium font-poppins text-white md:flex md:items-center md:justify-center"
              >
                Contact us
              </NavLink>
            </div>
            <div className="flex flex-col gap-6 lg:gap-3 md:items-center md:justify-center mt-6  md:mt-0">
              <NavLink
                to={"#"}
                className="text-sm font-medium font-poppins text-white md:flex items-center md:justify-center"
              >
                Privacy policy
              </NavLink>
              <NavLink
                to={"#"}
                className="text-sm font-medium font-poppins text-white md:flex md:items-center md:justify-center"
              >
                Terms of use
              </NavLink>
            </div>
            <div className="mt-6  md:mt-0">
              <h2 className=" uppercase text-sm font-medium font-poppins text-white flex items-center justify-center">
                Need Help getting started?
              </h2>

              <div className="mt-4 w-full pb-4">
                <form action="w-full">
                  <div className="relative h-12 flex items-center justify-center w-full">
                    <input
                      name="email"
                      type="text"
                      className="p-2 bg-[#4688E9] text-white border-solid border h-12 border-[#FFFFFF] w-full lg:w-96 rounded outline-0 border-inherit placeholder:text-[#FFFFFF] placeholder:text-sm font-poppins"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                    />

                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="absolute right-2 rounded top-2 pl-2 bottom-2 text-sm bg-transparent border-[#FFFFFF]  border px-3 text-white flex items-center justify-center"
                    >
                      {requestMoreMutation.isPending ? (
                        <div className="justify-center items-center">
                          <BeatLoader size={10} color="#D0DDFF " />
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="mr-1 font-poppins">Send</span>{" "}
                          <BsSend className=" text-white" />
                        </div>
                      )}
                    </button>
                  </div>

                  {(requestMoreMutation.isSuccess ||
                    requestMoreMutation.isError) && (
                    <ResponseMessage
                      message={
                        requestMoreMutation?.data.message ??
                        // requestMoreMutation?.error?.data.response?.data?.message ??
                        requestMoreMutation?.error?.message ??
                        requestMoreMutation?.error?.message
                      }
                      isError={requestMoreMutation?.isError}
                      isSuccess={requestMoreMutation?.isSuccess}
                      noMargin={true}
                    />
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <p className=" absolute bottom-0 left-0 z-30 w-full font-[500] p-3 text-center font-poppins text-xs sm:text-sm z-90 gap-10 text-white ">
              Copyright &copy; Escrow-Tech Limited {currentYear}. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
