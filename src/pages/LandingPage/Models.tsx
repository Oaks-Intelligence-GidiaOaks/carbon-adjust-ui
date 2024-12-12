import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";

const Models = () => {
  return (
    <>
      <div className="flex bg-gradient-to-bl from-[rgba(173,216,230,0.5)] via-white to-[rgba(173,216,230,0.5)] flex-col items-center justify-center p-4 font-poppins">
        <motion.div
          className="w-full my-20"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl lg:text-[2.5rem] max:text-[3rem] md:leading-[60px] font-semibold text-center">
              <span className="text-[#043A3A]">Carbon-Adjust </span>
              <span className="text-[#0B8DFF]">Models</span>
            </h1>
          </div>
        </motion.div>

        <div className="flex flex-col w-full justify-center items-center gap-10 lg:pb-7 lg:px-10 max-w-[1440px]">
          <ModelCard
            title="Payment Models"
            contents={[
              {
                title: "Pre-paid offsets:",
                description:
                  "Credits are paid for based on projected carbon offsets, covering a year’s expected reductions.",
              },
              {
                title: "Post-paid offsets:",
                description:
                  "Credits are paid immediately upon validation of completed load-shifting activities.",
              },
            ]}
          />
          <ModelCard
            title="Value chain of carbon credits"
            contents={[
              {
                title: "Value Creation:",
                description: "Generated by lowering carbon footprint.",
              },
              {
                title: "Value Capture:",
                description:
                  "Optimized by validating energy use through smart plugs",
              },
              {
                title: "Customer Benefit:",
                description:
                  "Reduces carbon footprint, provides platform-specific credits, and offers pro-rated payment for offsets",
              },
            ]}
          />
          <ModelCard
            title="CARBON CREDIT WALLET"
            contents={[
              {
                title: "Credits are stored in a restricted wallet:",
                description: "These credits can only be used on the platform to buy smart plugs, energy-saving devices, or other platform services.",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Models;

interface ContentsProps {
  title: string;
  description: string;
}

interface NewsCardProps {
  contents?: ContentsProps[];
  description?: string;
  title: string;
}

const ModelCard: React.FC<NewsCardProps> = ({ title, contents }) => {
  // Determine classes based on title
  const getClassForTitle = (title: string): string => {
    switch (title) {
      case "Payment Models":
        return "bg-[#FFDBAD] text-[#DC7C00]";
      case "Value chain of carbon credits":
        return "bg-[#87F1FF] text-[#127E8D]";
      case "CARBON CREDIT WALLET":
        return "bg-[#CAFFC2] text-[#429B36]";
      default:
        return "bg-[#FFDBAD] text-[#DC7C00]";
    }
  };

  const getClassForBg = (title: string): string => {
    switch (title) {
      case "Payment Models":
        return "/assets/graphics/model1.png";
      case "Value chain of carbon credits":
        return "/assets/graphics/model2.svg";
      case "CARBON CREDIT WALLET":
        return "/assets/graphics/model3.svg";
      default:
        return "/assets/graphics/model1.png";
    }
  };

  return (
    <motion.div
      className="w-[100%] lg:max-w-[1000px] max:max-w-full bg-white rounded-2xl p-5 py-10 flex justify-center items-center z-10"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <div className="flex gap-10 w-full flex-col md:flex-row items-center">
        <div className="flex flex-col w-[100%] md:w-[60%]">
          <div className="flex flex-col">
            <div
              className={`${getClassForTitle(
                title
              )} p-2  font-medium  lg:text-xl rounded-lg uppercase w-fit shadow-inner`}
            >
              <p>{title}</p>
            </div>
            <div className="mt-10 py-5 max-w-[700px]">
              {contents?.map((item, index) => (
                <div className="flex gap-5 mb-5" key={index}>
                  <div
                    className={`w-[50px] h-[50px] p-4 flex items-center justify-center rounded-[50%] !text-[2rem] ${getClassForTitle(
                      title
                    )}`}
                  >
                    <FaCheck size={90} />
                  </div>

                  <div>
                    <h2 className="font-semibold lg:text-xl">{item.title}</h2>
                    <p className="lg:text-xl">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${getClassForBg(title)})` }}
          className={`flex  bg-cover bg-center h-[200px] w-[100%] md:w-[40%] lg:h-[350px]`}
        ></div>
      </div>
    </motion.div>
  );
};
