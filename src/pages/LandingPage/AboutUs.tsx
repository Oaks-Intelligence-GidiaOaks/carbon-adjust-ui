import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import { IoMdArrowForward } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";

const AboutUs = () => {
  return (
    <>
      <div className=" flex flex-col  p-4 font-poppins">
        <motion.div
          className="w-full my-5"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl md:text-[4rem] md:leading-[60px] font-semibold text-center">
              <span className="text-[#043A3A]"> About </span>
              <span className="text-[#0B8DFF]">Us</span>
            </h1>

            <p className="text-[#191F23] font-[500] text-lg lg:text-2xl md:leading-[35px] my-10 max-w-[1000px]">
              Carbon-Adjust is world's largest and most geographically diverse
              flexibility and sustainability platform offering You access to
              amazing products and services that enable Your journey to a
              cleaner and more sustainable lifestyle. We welcome You to the
              Future today.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="w-full  "
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center place-content-start px-2">
            {/* <div className="flex flex-col lg:flex-row gap-5"> */}
            <AboutCard
              icon={AiOutlineLike}
              title="Circular Cities"
              description="Carbon-Adjust enables local and regional government authorities purchase carbon offsets generated from local residents and businesses in meeting its net zero targets."
            />
            <AboutCard
              icon={AiOutlineLike}
              title="Smart Cities"
              description="Carbon-Adjust facilitates smart city operations across energy use through flexibility and demand response, smart purchases through the carbon footprint tracker, and smart travels through the operationalisation of dynamic clean air zones."
            />
            <AboutCard
              icon={AiOutlineLike}
              title="Social Values"
              description="Carbon-Adjust provides the only viable platform for mitigating issues of fuel poverty by enabling residents and businesses build resilience against climate transition risks."
            />

            <AboutCard
              icon={AiOutlineLike}
              title="Local Actions"
              description="Carbon-Adjust empowers local residents and businesses to drive transformational change from the grassroots. Through the leaderboard, top performing individuals and businesses gain visibility and recognition across a global audience."
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutUs;

interface AboutCardProps {
  icon: IconType;
  title: string;
  description: string;
}
const AboutCard: React.FC<AboutCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col min-h-[350px]">
      <div className="group">
        <div className="flex bg-gray-100  hover:bg-custom-radial p-4 gap-5 items-center">
          <div className="w-[60px] h-[60px] p-5 flex items-center justify-center rounded-[50%] border-2 border-[#1944B7] bg-white">
            <Icon size={70} />
          </div>
          <div className="w-[150px]">
            <h2 className="bg-gradient-text bg-clip-text text-transparent text-xl md:text-[2rem] leading-[45px] font-semibold group-hover:text-white">
              {title}
            </h2>
          </div>
        </div>
        <div className="bg-gray-300 group-hover:bg-gradient-text h-[5px] w-full" />
      </div>

      <div className="flex flex-col border lg:min-h-[500px] p-4">
        <p className="text-[#404745] my-10 px-4 text-xl">{description}</p>
        {/* Description text */}
        <div className="flex ml-4 mt-auto">
          <Link to={"/login"} preventScrollReset={false}>
            <div className="gradient-text flex items-center gap-2">
              <span>Learn More</span>
              <IoMdArrowForward className="text-lg gradient-text" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
