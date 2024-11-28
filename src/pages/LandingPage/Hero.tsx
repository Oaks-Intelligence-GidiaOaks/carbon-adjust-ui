import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative font-poppins ">
      <div className="lg:container lg:flex flex-col w-full lg:items-center lg:gap-12 mt-14 lg:mt-20">
        {/* <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:hidden px-4 flex justify-center lg:flex-1 mb-10 md:mb-16 lg:mb-0"
        >
          <div className="relative">
            <img
              src={"/assets/graphics/hero-graphic.svg"}
              alt=""
              className="max-w-full h-auto sm:max-w-full animate-spin-slow"
            />
            <img
              src={"/assets/graphics/hero-house.svg"}
              alt=""
              className="max-w-full h-auto sm:max-w-full absolute bottom-0 z-10"
            />
          </div>
        </motion.div> */}

        {/* <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden lg:flex lg:justify-center w-[55%] lg:flex-1 mb-10 md:mb-16 lg:mb-0 relative"
        >
          <img
            src={"/assets/graphics/hero-graphic.svg"}
            alt=""
            className="max-w-full h-auto sm:max-w-full animate-spin-slow"
          />
          <img
            src={"/assets/graphics/hero-house.svg"}
          alt=""
            className="max-w-full h-auto sm:max-w-full absolute bottom-0 z-10"
          />
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex px-4 lg:px-0 lg:!w-[100%] h-[100vh] flex-col justify-center items-center mb-8 lg:mt-5 lg:mb-0 w-full"
        >
          <h2 className="text-[#eceeef] text-xl font-[600] text-center lg:text-left mb-10 capitalize">
            All in One Sustainability Platform
          </h2>
          <h2 className="text-2xl text-[#eceeef] lg:text-[8.5rem] font-[600] lg:leading-[3rem] text-center capitalize mb-2">
            carbon - adjust
          </h2>

          <p className="text-[#eff3f6] font-[600] text-base !text-center  lg:text-left my-16 max-w-[820px]">
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
          <div className="flex items-center justify-center lg:justify-start gap-6 mt-5 lg:mt-[15rem] lg:ml-[-60rem]">
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

      {/* <div className="mt-20 lg:px-0 relative">
        <h2 className="mb-6 text-center">Supported by</h2> 
        <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 h-24 bg-gradient-to-b from-cyan-500 to-transparent via-transparent via-15% from-0% to-90% w-[50%] -z-[1] rounded-t-[100px]" />
        <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 h-20 bg-gray-100 w-[50%] -z-[1] rounded-t-[100px]" />
        <Marquee
          pauseOnHover
          // gradient
          // gradientColor={[237, 241, 246]}
          // gradientWidth={100}
          className="flex justify-stretch items-center w-[100vw] pb-2 pt-4 relative"
          autoFill={true}
          speed={30}
        >
          <div className="flex justify-between gap-x-14 md:gap-x-20 lg:gap-x-36 items-center w-full">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={Image1}
              alt=""
              className="h-14"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={Image2}
              alt=""
              className="h-14"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={Image3}
              alt=""
              className="h-14"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={Image4}
              alt=""
              className="h-14"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={Image5}
              alt=""
              className="h-14"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={Image6}
              alt=""
              className="h-14"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={Image7}
              alt=""
              className="h-14"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={Image9}
              alt=""
              className="h-14"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={Image10}
              alt=""
              className="h-14"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={Image8}
              className="mr-28 h-10"
              alt=""
            />
          </div>
        </Marquee>
      </div> */}
    </section>
  );
};

export default Hero;
