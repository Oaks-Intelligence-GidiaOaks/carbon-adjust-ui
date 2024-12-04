import React from "react";
import { motion } from "framer-motion";

const WhatWeOffer = () => {
  const dummyData = [
    {
      id: 1,
      title: "Smart Travel",
      description:
        "Make your trips more efficient with less traffic; discover eco-friendly routes that your carbon footprint.",
      image: "/assets/graphics/whatweoffer4.svg",
      hoverImage: "/assets/graphics/whatweoffer4b.svg",
    },
    {
      id: 2,
      title: "Devices",
      description:
        "Reduce cost, and lower your carbon footprints, all while getting notifications to keep you in control.",
      image: "/assets/graphics/whatweoffer3.svg",
      hoverImage: "/assets/graphics/whatweoffer3b.png",
    },
    {
      id: 3,
      title: "Smart Purchases",
      description:
        "By tracking your purchase, you gain a clear, accurate understanding of your impact on the environment-no more guesswork.",
      image: "/assets/graphics/whatweoffer2.png",
      hoverImage: "/assets/graphics/whatweoffer2b.png",
    },
  ];
  return (
    <>
      <div className=" flex flex-col items-center justify-center p-4 font-poppins my-20">
        <motion.div
          className="w-full my-5"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl md:text-[4rem] md:leading-[60px] font-medium text-center">
              <span className="text-[#043A3A]"> What We </span>
              <span className="text-[#0B8DFF]">Offer</span>
            </h1>
          </div>
        </motion.div>
        <div className="flex flex-col gap-[10rem] mt-20 w-full">
          <motion.div
            className="w-full  "
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div>
              <Heading
                title="Marketplace"
                index="01"
                text=" Our platform offers a vibrant marketplace where merchants can showcase
        their sustainable products and services to individuals and
        corporations."
              />
              {/* <div
                style={{
                  backgroundImage: `url("/assets/graphics/whatweoffer1.png")`,
                }}
                className={`flex rounded-2xl bg-cover lg:bg-cover bg-center h-[350px] lg:h-[80vh] mt-10 md:w-[100%] max-h-[800px]`}
              ></div> */}
              <motion.img
                className="w-full mt-10"
                src="/assets/graphics/whatweoffer1.png"
                alt="Lifecycle Model"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1 }}
              />
            </div>
          </motion.div>

          <div className="mb-[-100px]">
            <Heading
              title="Operations Hub"
              index="02"
              text="Our Operations Hub allows You to stay smart, be efficient and sustainable in how You use energy, make purchases, and travel."
            />
          </div>
          {/* this section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {dummyData.map((item) => (
              <motion.div
                key={item.id}
                className="w-full"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, type: "spring" }}
              >
                <div className="relative group h-[600px] mt-10 md:w-[100%] rounded-2xl overflow-hidden">
                  {/* Default Background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    style={{
                      backgroundImage: `url("${item.image}")`,
                    }}
                  ></div>

                  {/* Hover Background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                      backgroundImage: `url("${item.hoverImage}")`,
                    }}
                  ></div>

                  {/* Content */}
                  <div className="absolute bottom-5 left-5 text-white text-lg z-10 lg:w-[500px]">
                    <h2 className="transition-all duration-300 text-[2rem] lg:text-[3rem] leading-10 font-semibold">
                      {item.title}
                    </h2>

                    <div className="h-0 text-xl lg:text-2xl group-hover:h-auto transition-all duration-300 overflow-hidden my-2">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="w-full  bg-[#F5F8FF] mt-10 py-10 px-10 lg:px-20 rounded-2xl h-[600px] flex items-center justify-center"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <div className="flex flex-col items-center justify-center text-left">
                <h1 className="text-xl md:text-[2rem] md:leading-[38px] font-medium text-left">
                  <span className="text-[#043A3A]">Carbon-Adjust </span>
                  <span className="text-[#0B8DFF]">
                    isn’t just for individuals.
                  </span>
                </h1>
                <p className="text-[##525252] font-[500] text-lg md:leading-[28px] my-10 max-w-[1000px]">
                  We’ve also built a powerful system for businesses, local
                  government authorities, and charities to Measure their Carbon
                  footprint from all Purchase made.
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="w-full mt-[-150px] "
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div className="relative group h-[600px] mt-10 md:w-[100%] rounded-2xl overflow-hidden">
              {/* Default Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                style={{
                  backgroundImage: `url("/assets/graphics/whatweoffer5.png")`,
                }}
              ></div>

              {/* Hover Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  backgroundImage: `url("/assets/graphics/whatweoffer5b.png")`, // Replace with your hover image URL
                }}
              ></div>

              {/* Content */}
              <div className="absolute bottom-5 left-5 text-white text-lg z-10 ">
                <h2 className="transition-all duration-300 text-[2rem] lg:text-[4rem] font-semibold">
                  Built Environment
                </h2>

                <div className="h-0 text-xl lg:text-3xl group-hover:h-auto transition-all duration-300 delay-150 overflow-hidden my-10">
                  <p>
                   Explore best practices in sustainable biomass production and efficient energy conversion technologies that maximize environmental impact.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default WhatWeOffer;

interface HeadingProps {
  title: string;
  index: string;
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ title, index, text }) => {
  return (
    <div className="flex w-full flex-col md:flex-row justify-between items-start gap-5">
      <div className="flex gap-5 items-center">
        <h1 className="text-2xl md:text-3xl font-semibold">{index}</h1>
        <h1 className="text-2xl md:text-4xl font-semibold">{title}</h1>
      </div>
      <div className="text-xl text-[#6B7280] lg:w-[600px]">{text}</div>
    </div>
  );
};
