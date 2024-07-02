import { motion } from "framer-motion";
import Image1 from "../../assets/image-1.png";
import Image2 from "../../assets/image-2.png";
import Image3 from "../../assets/image-3.png";
import Image4 from "../../assets/image-4.png";
import Image5 from "../../assets/image-5.png";
import Image6 from "../../assets/image-6.png";
import Image7 from "../../assets/image-7.png";
import Image8 from "../../assets/image-8.png";
import Image9 from "../../assets/image-9.svg";
import Image10 from "../../assets/image-10.svg";
import { Button } from "@/components/ui";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative font-poppins ">
      <div className="lg:container lg:flex flex-row-reverse w-full lg:flex-row lg:items-center lg:gap-12 mt-14 lg:mt-20">
        <motion.div
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
        </motion.div>

        <motion.div
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex px-4 lg:px-0 lg:!w-[40%] flex-col items-center lg:items-start mb-8 lg:mb-0"
        >
          <h2 className="gradient-text text-2xl lg:text-[2.5rem] font-semibold lg:leading-[3rem] text-center lg:text-left mb-2">
            One Platform:
          </h2>
          <p className="text-[#191F23] text-2xl lg:text-4xl font-normal text-center lg:text-left mb-4">
            That's all it takes to "Master Your Home's Energy"
          </p>
          <div className="bg-gradient-text h-[2px] w-full" />
          <p className="text-[#191F23] text-lg lg:text-lg mt-4 max-w-[720px] font-medium">
            PLANNING A HOME ENERGY UPGRADE?
          </p>
          <p className="text-[#191F23] text-base text-center lg:text-base lg:text-left mb-6 mt-2 max-w-[720px]">
            Home is a place of great emotional significance, and while projects
            can take 3-8 months from initial survey to completion, scheduling a
            Home Energy Plan today allows you to confidently connect with the
            right professionals offering you tailored retrofit services to get
            your desired outcome.
          </p>

          <div className="flex justify-center flex-wrap gap-6">
            <Link to={"/login"} preventScrollReset={false}>
              <Button className="bg-gradient-text px-10">Get started</Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 lg:px-0 relative">
        {/* <h2 className="mb-6 text-center">Supported by</h2> */}
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
      </div>
    </section>
  );
};

export default Hero;
