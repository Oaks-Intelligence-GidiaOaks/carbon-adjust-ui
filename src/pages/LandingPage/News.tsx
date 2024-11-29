import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const News = () => {
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
            <h1 className="text-3xl md:text-[4rem] md:leading-[60px] font-semibold text-center">
              <span className="text-[#0B8DFF]">New Articles</span>
              <span className="text-[#043A3A]"> and Knowledge </span>
            </h1>

            <p className="text-[#191F23] font-[500] text-lg md:leading-[35px] my-10 max-w-[1000px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              hendrerit suscipit egestas. Nunc eget congue ante. Vivamus ut
              sapien et ex volutpat tincidunt eget at felis vivamus hendrerit.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <NewsCard
              title="Tips for Cost-Effective Projects"
              description="Vivamus accumsan diam eget ultricies auctor. Proin iaculis metus vel condimentum tincidunt."
              date={"18 October 2024"}
            />
            <NewsCard
              title="Tips for Cost-Effective Projects"
              description="Vivamus accumsan diam eget ultricies auctor. Proin iaculis metus vel condimentum tincidunt."
              date={"18 October 2024"}
            />
            <NewsCard
              title="Tips for Cost-Effective Projects"
              description="Vivamus accumsan diam eget ultricies auctor. Proin iaculis metus vel condimentum tincidunt."
              date={"18 October 2024"}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default News;

interface NewsCardProps {
  date: string;
  description: string;
  title: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, date }) => {
  return (
    <div className="bg-white rounded-2xl flex flex-col gap-3 justify-center max-w-[500px] shadow-2xl">
      <div className="flex items-center gap-5 h-[250px] bg-gray-600 rounded-t-2xl"></div>
      <div className="flex flex-col py-5 px-7">
        <p className="gradient-text font-[mulish] text-base mt-2">{date}</p>
        <h2 className="text-[#043A3A] font-semibold font-[Bricolage-Grotesque] text-3xl my-5">
          {title}
        </h2>
        <p className="text-[#525252] font-[mulish] font-medium text-xl">{description}</p>
        <div className="flex mt-3">
          <Link to={"/login"} preventScrollReset={false}>
            <div className="gradient-text flex items-center gap-2">
              <span>Read More...</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
