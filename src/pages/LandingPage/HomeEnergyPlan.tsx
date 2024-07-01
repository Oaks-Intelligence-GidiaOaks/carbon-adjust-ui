import React from "react";
import { motion } from "framer-motion";
import VideoPlayer from "@/components/reusables/VideoPlayer";
import { Link } from "react-router-dom";

const HomeEnergyPlan: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-poppins my-10 lg:mb-48">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-center">
        <motion.div
          className="w-full flex justify-center mx-auto  flex-col text-center flex-1"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="lg:w-[65%] mx-auto flex flex-col justify-start">
            <h1 className="text-3xl md:text-5xl md:leading-[60px] font-semibold mb-4 mx-auto text-start">
              Say Hi to <span className="text-[#0B8DFF]">Pavlos</span> and get
              started on your bespoke Home Energy Plan
            </h1>
            <Link to={"/login"} className="flex justify-start">
              <motion.button
                className="mt-4 px-6 py-2 bg-gradient-text h-14 lg:w-[60%] text-white rounded-md transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Get started
              </motion.button>
            </Link>
          </div>
        </motion.div>
        {/* Video Player Section */}
        <motion.div
          className="w-full mt-8 lg:mt-0 md:w-1/2 lg:p-4 flex-1 lg:!translate-x-8 h-auto lg:min-h-[300px]"
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <VideoPlayer src="/placeholder-video.mp4" />
        </motion.div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-between lg:w-[90%] lg:pt-[20vh] gap-10">
        {/* 3D House Section */}
        <div
          className="w-full max-w-4xl mt-10 flex-1 lg:min-h-[300px]"
          // initial={{ opacity: 0, y: 100, scale: 0.8 }}
          // whileInView={{ opacity: 1, y: 0, scale: 1 }}
          // viewport={{ once: true, amount: 0.5 }}
          // transition={{ duration: 1, delay: 0.5, type: "spring" }}
        >
          <img
            src="/assets/graphics/about-us-crib.png"
            className="lg:absolute z-50 -bottom-20 left-0 h-[50%]"
            // initial={{ opacity: 0, y: 50 }}
            // animate={{ opacity: inView2 ? 1 : 0, y: inView2 ? 0 : 50 }}
            // transition={{ duration: 0.6 }}
          />
        </div>
        {/* About Us Section */}
        <motion.div
          className="w-full md:w-full p-4 flex-1"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
        >
          <h2 className="text-2xl font-semibold pb-4 border-b border-ca-blue-dark">
            About us
          </h2>
          <p className="my-4 font-medium text-lg text-[#191F23] leading-7">
            On Carbon-Adjust, we recognize that home is a place of great
            emotional significance to you. As committed partners, we are
            empowering you to make your home even more memorable.
          </p>
          <div className="mt-8 space-y-4">
            <motion.div
              className="mb-2 text-black/70 flex gap-3 items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              <div className="size-3 bg-gradient-text rounded-full shrink-0 mt-1" />
              Experience the thrill of your exclusive membership and understand
              measures that make your home tick.
            </motion.div>
            <motion.div
              className="mb-2 text-black/70 flex gap-3 items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            >
              <div className="size-3 bg-gradient-text rounded-full shrink-0 mt-1" />
              Enjoy the complimentary benefit of interacting with our
              experienced experts.
            </motion.div>
            <motion.div
              className="mb-2 text-black/70 flex gap-3 items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            >
              <div className="size-3 bg-gradient-text rounded-full shrink-0" />
              Join other exclusive members in sharing ideas and experiences.
            </motion.div>
            <motion.div
              className="mb-2 text-black/70 flex gap-3 items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            >
              <div className="size-3 bg-gradient-text rounded-full shrink-0 mt-1" />
              Track your carbon footprint and mitigate climate impact.
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeEnergyPlan;
