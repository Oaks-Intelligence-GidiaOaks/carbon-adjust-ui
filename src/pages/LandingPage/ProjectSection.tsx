import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

const ProjectSection = () => {
  return (
    <div className="font-poppins py-20 lg:pb-40 bg-account-setup-image relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col lg:flex-row justify-between gap-[10%] px-4 lg:px-0 lg:w-[70%] max-w-[1440px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="text-2xl font-semibold leading-10"
        >
          Carbon-Adjust is your one-stop shop for staying smart and sustainable.
          Access our Marketplace for the latest in smart appliances and services
          and leverage our Operations Hub to build resilience against climate
          transition risks.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="text-[#191F23]"
        >
          <div className="bg-gradient-text h-[2px] mb-4 w-full my-6 lg:my-0" />
          We capitalise on our ability to enable You utilise the amazing
          capabilities of AI in enhancing your everyday experiences. From
          optimal use of energy to participation in balancing the electricity
          grid we've got You covered. With loads of amazing deals on our
          Marketplace and a community of like minds, You can never get bored on
          Carbon-Adjust.
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        className="mt-10 flex justify-center"
      >
        <Link to={"/login"}>
          <Button className="!bg-gradient-text z-10">Get started</Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ProjectSection;
