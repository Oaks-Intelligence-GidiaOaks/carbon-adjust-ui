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
          className="text-xl font-semibold leading-8"
        >
          Carbon-Adjust is a pioneering global platform that empowers homeowners
          to confidently carry out end-to-end energy efficiency improvements in
          their homes.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="text-[#191F23]"
        >
          <div className="bg-gradient-text h-[2px] mb-4 w-full my-6 lg:my-0" />
          We capitalize on being the comprehensive one-stop marketplace for
          everything related to home energy efficiency improvements. From
          bespoke energy audits and plans to experienced professionals and an
          extensive catalogue of products and services, you are in safe hands.
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
