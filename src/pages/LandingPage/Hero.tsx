import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative font-poppins">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-[-1] opacity-100"
        src="../../assets/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      <div className="lg:container lg:flex flex-col w-full lg:items-center lg:gap-12 mt-14 lg:mt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex px-4 lg:px-0 lg:!w-[100%] h-[100vh] flex-col justify-center items-center mb-8 lg:mt-5 lg:mb-0 w-full"
        >
          <h2 className="text-[#eceeef] text-xl font-[600] text-center lg:text-left mb-10 capitalize">
            All in One Sustainability Platform
          </h2>
          <h2 className="text-2xl text-[#eceeef] md:text lg:text-[5.5rem] font-[600] lg:leading-[3rem] text-center capitalize mb-2">
            carbon - adjust
          </h2>
          <p className="text-[#eff3f6] font-[600] text-base !text-center lg:text-left my-16 max-w-[820px]">
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
                className="bg-gradient-text rounded-[20px] px-10"
              >
                Join Waitlist
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-6 mt-5 md:mt-10 lg:mt-[10rem] lg:ml-[-40rem]">
            <motion.img
              className=""
              src="/assets/graphics/Google.svg"
              alt="Lifecycle Model"
            />
            <motion.img
              className=""
              src="/assets/graphics/Apple.svg"
              alt="Lifecycle Model"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
