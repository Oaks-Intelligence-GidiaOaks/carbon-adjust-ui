import { motion } from "framer-motion";
import { Button, Input } from "@/components/ui";
import TextArea from "@/components/ui/TextArea";

const Waitlist = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-poppins p-5 my-10 lg:my-[10rem]">
        <motion.div
          className="w-full my-5"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="flex flex-col items-center lg:items-start justify-center ">
            <h1 className="text-3xl md:text-[3rem] md:leading-[60px] font-semibold text-center lg:text-left">
              <span className="text-[#043A3A]"> Fill the Form to </span>
              <span className="text-[#0B8DFF]">join the Waitlist</span>
            </h1>
          </div>
        </motion.div>

        <motion.div
          className="w-full  "
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="bg-white rounded-2xl max-w-[700px] shadow-2xl p-4">
            <form>
              <div className=" flex flex-col gap-5 justify-center my-10">
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="space-y-2 w-full">
                    <Input
                      className="border-x-0 border-b-2 px-2 text-sm"
                      type="text"
                      name="licensePlateNumber"
                      placeholder="Full Name"
                      // value={formData.licensePlateNumber}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Input
                      className="border-x-0 border-b-2 px-2 text-sm"
                      type="text"
                      name="licensePlateNumber"
                      placeholder="Email"
                      // value={formData.licensePlateNumber}
                      // onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="space-y-2 w-full">
                    <Input
                      className="border-x-0 border-b-2 px-2 text-sm"
                      type="text"
                      name="licensePlateNumber"
                      placeholder="Telephone"
                      // value={formData.licensePlateNumber}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Input
                      className="border-x-0 border-b-2 px-2 text-sm"
                      type="text"
                      name="licensePlateNumber"
                      placeholder="Service"
                      // value={formData.licensePlateNumber}
                      // onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2 w-full">
                  <TextArea
                    className="border-x-0 border-b-2 px-2 text-sm"
                    placeholder="Message"
                    name="message"
                  />
                </div>
                <div className="w-[50%] mx-auto ">
                  <Button disabled={false} className="w-full">
                    <span>Join the Waitlist</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Waitlist;


