import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className=" font-poppins relative h-[90vh] bg-cover bg-no-repeat bg-origin-content overflow-hidden flex flex-col ">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-fill z-[-1] opacity-100"
        src="../../assets/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      <div className="lg:container flex flex-col w-full h-[100%] justify-center lg:items-center items-center gap-10 lg:gap-[10rem]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex lg:px-0 py-3 lg:!w-[100%] flex-col justify-center items-center w-full bg-gray-700/50 max-w-[1000px] rounded-lg"

        >
          <h2 className="text-[#eceeef] text-xl font-[600] text-center lg:text-left mb-2 lg:mb-10 capitalize">
            All in One Sustainability Platform
          </h2>
          <h2 className="text-2xl text-[#eceeef] lg:text-[7.5rem] font-[400] leading-[3rem] text-center capitalize mb-2">
            carbon - adjust
          </h2>
          <p className="text-[#eff3f6] font-[600] text-base !text-center lg:text-left my-5 lg:my-16 max-w-[820px]">
            Welcome to Carbon-Adjust, a lifestyle platform designed to help you
            live more sustainably. Whether you're looking to reduce energy use
            at home, manage your devices efficiently, or make greener
            transportation choices, Carbon-Adjust brings all the tools you need
            to lower your carbon footprint.
          </p>

          <div className="flex justify-center flex-wrap gap-6">
            <Link to={"/login"} preventScrollReset={false}>
              <Button
                size={"lg"}
                className="bg-gradient-text rounded-[20px] px-20"
              >
                Join Waitlist
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
        <div className="flex items-start justify-start lg:justify-start gap-6 mb-5 ml-10">
          <motion.img
            className="cursor-pointer"
            src="/assets/graphics/Google.svg"
            alt="Lifecycle Model"
          />
          <motion.img
            className="cursor-pointer"
            src="/assets/graphics/Apple.svg"
            alt="Lifecycle Model"
          />
        </div>
    </section>
  );
};

export default Hero;
