import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

const MarketPlace = () => {
  return (
    <div className="container mx-auto lg:w-[80%] px-4 py-12 pt-14 font-poppins flex flex-col justify-between gap-6 relative">
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl text-center font-bold gradient-text"
      >
        Explore the Marketplace{" "}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="w-[clamp(200px,100%,580px)] text-center leading-6 mx-auto"
      >
        Access a rich catalogue of products, services and complimentary packages
        on Carbon-Adjust. Share your experience and learn.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="w-full mt-10"
      >
        <div className="flex justify-center sm:justify-end">
          <Link to={"/register"}>
            <Button className="bg-gradient-text font-normal rounded-none mb-6">
              GET STARTED
            </Button>
          </Link>
        </div>
        <img
          src="/assets/graphics/ho-dash.svg"
          className="w-full drop-shadow-2xl"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        className="w-full mt-10 flex flex-col justify-start p-0!"
      >
        <div className="flex gap-4 flex-col sm:flex-row justify-between items-center">
          <p className="font-inter">Financial Institution</p>
          <Link to={"/merchant/register"}>
            <Button className="bg-gradient-text font-normal rounded-none mb-6">
              GET STARTED
            </Button>
          </Link>
        </div>
        <img
          src="/assets/graphics/merchant-dash.svg"
          className="w-[80%] !p-0 drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default MarketPlace;
