import { motion } from "framer-motion";
import { FaQuestion } from "react-icons/fa";

const Faq = () => {
  return (
    <>
      <div className=" flex flex-col items-center justify-center p-4 font-poppins my-10">
        <motion.div
          className="w-full my-5"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl lg:text-[2.5rem] max:text-[3rem] md:leading-[60px] font-semibold text-center">
              <span className="text-[#043A3A]"> Frequently Asked </span>
              <span className="text-[#0B8DFF]">Questions</span>
            </h1>

            <p className="text-[##525252] font-[500] text-lg md:leading-[28px] my-5 max-w-[900px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              hendrerit suscipit egestas. Nunc eget congue ante. Vivamus ut
              sapien et ex volutpat tincidunt eget at felis vivamus hendrerit.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="w-full mt-5"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FaqCard
              title="What is Carbon-Adjust?"
              description="Carbon-Adjust is the world's largest and most geographically diverse flexibility and sustainability platform offering you access to amazing products and services that enable your journey to a cleaner and more sustainable lifestyle. We welcome you to the future today."
            />
            <FaqCard
              title="Why do I need Carbon-Adjust?"
              description="You need Carbon-Adjust to enable You contribute towards building a resilient and cleaner world. Without Carbon-Adjust, You lose the opportunity to contribute to and be part of the community of individuals and businesses making a difference."
            />
            <FaqCard
              title="Is this any different from what's out there?"
              description="We don't have any competition and that's why we've been funded with over £1m by the UK Department of Energy Security and Net Zero (DESNZ). We offer You opportunities to be both Smart and Sustainable whether in energy use, purchases or travel, we've got You covered. No other entity comes this close."
            />
            <FaqCard
              title="What benefits can I get from Carbon-Adjust?"
              description="More than you can imagine. Amazing range of smart offers across energy, purchases and travel, a dynamic reward system that pays You more than Your investment and access to the world's biggest and most geographically diverse flexibility market. Still in doubt? Trial our amazing finance options that allows You to lease our smart products while still earning benefits."
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Faq;

interface FaqCardProps {
  title: string;
  description: string;
}

const FaqCard: React.FC<FaqCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg p-8 flex gap-3 justify-center  max:max-w-[700px] shadow-2xl z-10">
      <div className="w-[50px] h-[50px] p-3 flex items-center justify-center rounded-[50%] border-[5px] border-[#1944B7] bg-white">
        <FaQuestion color="#1944B7" size={20} /> {/* Fixed icon size */}
      </div>
      <div className="flex flex-col">
        <h2 className="text-[#043A3A] text-xl lg:text-2xl font-medium leading-10">
          {title}
        </h2>
        <p className="text-[#404745] text-sm lg:text-lg mt-2">{description}</p>
      </div>
    </div>
  );
};
