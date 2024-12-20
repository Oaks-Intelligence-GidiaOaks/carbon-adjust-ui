import { Button } from "@/components/ui";
import { motion } from "framer-motion";

const _503 = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-[100vh] p-10 gap-3">
      <div className="flex flex-col items-center text-center sm:text-start w-[80%] md:w-[500px]">
        <motion.div
          className=" flex justify-center flex-col "
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className=" flex flex-col">
            {/* <h1 className="text-5xl md:leading font-semibold mb-4 ">
              <span className="text-[#0B8DFF]"> 404 </span>
            </h1> */}
            <h1 className="text-3xl md:leading font-semibold mb-4">
              Uh-oh! Looks like we hit a{" "}
              <span className="text-[#0B8DFF]">bump</span>.
              <br />
              Don’t worry, we’re <span className="text-[#0B8DFF]">on it</span>!
            </h1>

            <div className="flex justify-center md:justify-start  gap-6">
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-text px-10"
              >
                Reload
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className="hidden lg:block w-[500px] h-[500px] bg-cover bg-center rounded-bl-[100px] rounded-tr-[200px]"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dfljnnxln/image/upload/v1673973818/404_jiua0p.png)`,
        }}
      ></div>
    </div>
  );
};

export default _503;