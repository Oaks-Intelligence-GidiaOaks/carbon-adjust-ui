import { ChangeEvent, MouseEvent, useState } from "react";
import footerLogo from "../../assets/footerLogo.svg";
import { Link, NavLink } from "react-router-dom";
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
    <div className="px-6 lg:px-0 h-[450px] md:h-[250px] relative lg:w-[80%] mx-auto">
      <div className="lg:container">
        <div className="pt-10">
          <div className="md:flex md:flex-wrap md:items-start md:justify-between">
            <NavLink to={"#home"}>
              <img className=" bg-cover w-36" src={footerLogo} alt="" />
            </NavLink>
            <div className="flex flex-col gap-6 lg:gap-3 md:items-start md:justify-start mt-6 md:mt-0">
              <NavLink
                to={"#faqs"}
                className="text-sm font-medium font-poppins text-[#2E599A] md:flex md:items-center md:justify-center"
              >
                FAQs
              </NavLink>
              {/* <NavLink
                to={"#contact-us"}
                className="text-sm font-medium font-poppins text-[#2E599A] md:flex md:items-center md:justify-center"
              >
                Contact us
              </NavLink> */}
            </div>
            <div className="flex flex-col gap-6 lg:gap-3 md:items-start md:justify-center mt-6  md:mt-0">
              <NavLink
                to={"/privacy-policy"}
                className="text-sm font-medium font-poppins text-[#2E599A] md:flex items-center md:justify-center"
              >
                Privacy policy
              </NavLink>
              <NavLink
                to={"/terms-and-conditions"}
                className="text-sm font-medium font-poppins text-[#2E599A] md:flex md:items-center md:justify-center"
              >
                Home Occupant T&C
              </NavLink>
              <NavLink
                to={"/terms-and-conditions/merchant"}
                className="text-sm font-medium font-poppins text-[#2E599A] md:flex md:items-center md:justify-center"
              >
                Merchant T&C
              </NavLink>
            </div>
            <div className="mt-6  md:mt-0">
              <h2 className=" uppercase text-sm font-medium font-poppins text-[#2E599A] flex items-center justify-center">
                Need Help getting started?
              </h2>

              <div className="mt-4 w-full pb-4 font-poppins text-sm">
                Contact us at{" "}
                <Link
                  className="underline underline-offset-1 decoration-[#2E599A] hover:text-[#2E599A]"
                  to={"mailto:support@carbon-adjust.com"}
                >
                  support@carbon-adjust.com
                </Link>
                <form action="w-full" className="hidden">
                  <div className="relative h-12 flex items-center justify-center w-full">
                    <input
                      name="email"
                      type="text"
                      className="p-2 bg-white text-[#2E599A] border-solid border h-12 border-[#2E599A] w-full lg:w-96 rounded-xl outline-0 border-inherit placeholder:text-[#2E599A]/70 placeholder:text-sm font-poppins"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                    />

                    <button
                      onClick={handleSubmit}
                      type="submit"
                      disabled
                      className="absolute right-2 rounded-lg top-2 pl-2 bottom-2 text-sm bg-transparent bg-gradient-text border px-3 text-white flex items-center justify-center"
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
            <p className=" absolute bottom-0 left-0 z-30 w-full font-normal font-open-sans p-3 text-center text-xs sm:text-sm z-90 gap-10 text-[#2E599A] ">
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
