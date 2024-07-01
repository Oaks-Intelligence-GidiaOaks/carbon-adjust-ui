import React from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";

const WhatWeOffer: React.FC = () => {
  const features = [
    {
      id: 1,
      title: "Get your bespoke home energy plan as you interact with Pavlos",
      description:
        "Schedule an appointment for your bespoke home energy plan today",
    },
    {
      id: 2,
      title:
        "Schedule a call back with Artemis and get your complimentary access to an Energy Consultant",
      description:
        "Schedule a call back with one of our qualified consultants for personalized advice on investing in home energy efficiency improvements.",
    },
    {
      id: 3,
      title:
        "Chat up Stella as you download your complementary E-book on Carbon-Adjust",
      description:
        "Download your complimentary E-Book on Carbon-Adjust for tips on the latest innovation in home energy efficiency improvements.",
    },
    {
      id: 4,
      title: "Access to Kommunita",
      description:
        "Join the conversation today on Kommunita with like-minded homeowners documenting and sharing their experiences on home energy efficiency improvements. No sign ups needed!",
    },
    {
      id: 5,
      title:
        "Access Cassandra in generating your complimentary Carbon Footprint Tracker",
      description:
        "Understand how you contribute to climate change through your energy consumption via Carbon-Adjust.",
    },
    {
      id: 6,
      title:
        "Check-in with Anastasia on your complimentary Climate Transition Score",
      description:
        "Leverage Carbon-Adjust in understanding how government policies and your energy use can impact on your energy burden and property value.",
    },
    {
      id: 7,
      title:
        "Engage Yanis in exploring your complimentary access to our Optimal Decarbonisation Scheduler",
      description:
        "Understand via Carbon-Adjust your return on investments from a range of energy efficiency measures.",
    },
  ];

  return (
    <div className="container mx-auto flex-col lg:flex-row lg:w-[80%] px-4 py-12 flex justify-between gap-6 relative">
      <div className="flex flex-col justify-between lg:w-[40%] font-poppins">
        <div className="flex justify-start flex-col">
          <div className="mx-auto flex justify-center lg:justify-start flex-col">
            <h2 className="text-2xl font-semibold text-center mb-4 text-white">
              What we offer
            </h2>
            <Link to={"/login"}>
              <button className="w-fit mb-8 block px-6 py-2 bg-gradient-text text-white rounded-md h-10">
                Get started
              </button>
              `
            </Link>
          </div>
        </div>
      </div>
      <div className="grid flex-1 font-poppins grid-cols-1 sm:grid-cols-2 gap-6 gap-y-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            className="p-6 pt-2 pb-0 rounded-none border-l border-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-white font-semibold text-base">
              0{index + 1}.
            </span>{" "}
            <h3 className="text-xl font-medium mb-2 text-white">
              {feature.title}
            </h3>
            <p className="text-white/70">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;
