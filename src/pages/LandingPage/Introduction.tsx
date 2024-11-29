import { motion } from "framer-motion";

const Introduction = () => {
  return (
    <>
      <div>
        <div className="bg-[#EDF2FF] font-poppins py-5 px-5 lg:px-0  max-width-[1440px]">
          <motion.div
            className="w-full mt-5 lg:mt-20 "
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div className="flex flex-col items-center justify-center text-center px-5 lg:px-[250px]">
              <h1 className="text-2xl md:text-[3rem] md:leading-[60px] font-medium text-center">
                <span className="text-[#043A3A]"> We help</span>
                <span className="text-[#0B8DFF]"> individuals</span>
                <span className="text-[#043A3A]"> and</span>
                <span className="text-[#0B8DFF]"> organizations </span>
                <span className="text-[#043A3A]">
                  lower their respective carbon footprint
                </span>
              </h1>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="relative h-[250px] lg:h-screen bg-cover bg-no-repeat">
            <video
              className="absolute inset-0 w-full h-full object-cover z-[-1]"
              // src="../../assets/hero-bg.mp4"
               src="../../assets/Dasboard-video.mp4"
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </div>
        </motion.div>
      </div>
    </>
  );
};
export default Introduction;
