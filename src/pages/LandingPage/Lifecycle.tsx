import { motion } from "framer-motion";

const Lifecycle = () => {
  const cycleData = [
    {
      mode: "1",
      title: "Carbon Credit Set-Up",
      description:
        "Smart plugs monitor and shift device usage (e.g., washing machines, EV chargers) to reduce emissions and generate carbon credits.",
      class: "bg-gradient-text",
    },
    {
      mode: "2",
      title: "Carbon Credits Issued",
      description:
        "Escrow-Tech earns carbon credits based on verified energy savings from load-shifting. These credits are assigned a value.",
      class: "bg-[#9698F8]",
    },
    {
      mode: "3",
      title: "Carbon Credits Listed for Sale",
      description:
        "Escrow-Tech lists carbon credits on the platform for purchase by financial players or platform users.",
      class: "bg-[#F1BA40]",
    },
    {
      mode: "4",
      title: "Carbon Credits Bought",
      description: "Purchased credits are recorded in a registry and either:",
      extras:
        "Used as real-time benefits or vouchers on the Carbon-Adjust platform.",
      extras1: "Transferred to a company's carbon offset portfolio.",
      class: "bg-[#EF8534]",
    },
    {
      mode: "5",
      title: "Carbon Credits Retired",
      description:
        "Retired credits are marked as used in the registry and can no longer be traded or counted toward offsets.",
      class: "bg-gradient-text",
    },
  ];
  return (
    <>
      <div className="flex bg-gradient-to-bl from-[rgba(173,216,230,0.5)] via-white to-[rgb(173,216,230)] p-4 flex-col justify-center items-center font-poppins">
       
          <motion.div
            className="w-full  my-20"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-3xl lg:text-[3rem] md:leading-[60px] font-semibold text-center">
                <span className="text-[#0B8DFF]">Life Cycle </span>
                <span className="text-[#043A3A]">of an Escrow-Tech</span>
                <span className="text-[#0B8DFF]"> Carbon Credit </span>
              </h1>
            </div>
          </motion.div>
          <div className="hidden lg:flex flex-col gap-2 pb-7 w-[80%] items-center">
            <div className="flex items-start justify-end w-[80%] max-w-[1200px] gap-10">
              <CycleCard
                title="Carbon Credits Issued"
                description="Escrow-Tech earns carbon credits based on verified energy savings from load-shifting. These credits are assigned a value."
                mode="2"
              />
              <CycleCard
                title="Carbon Credits Bought"
                description="Purchased credits are recorded in a registry and either:"
                mode="4"
                extras="Used as real-time benefits or vouchers on the Carbon-Adjust platform."
                extras1="Transferred to a company's carbon offset portfolio."
              />
            </div>

            <motion.img
              className="w-full hidden lg:block"
              src="/assets/graphics/cycle.png"
              alt="Lifecycle Model"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1 }}
            />

            <div className=" hidden lg:grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <CycleCard
                title="Carbon Credit Set-Up"
                description="Smart plugs monitor and shift device usage (e.g., washing machines, EV chargers) to reduce emissions and generate carbon credits."
                mode="1"
                className="text-right"
              />
              <CycleCard
                title="Carbon Credits Listed for Sale"
                description="Escrow-Tech lists carbon credits on the platform for purchase by financial players or platform users."
                mode="3"
                className="text-right"
              />
              <CycleCard
                title="Carbon Credits Retired"
                description="Retired credits are marked as used in the registry and can no longer be traded or counted toward offsets."
                mode="5"
              />
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:hidden">
            {cycleData.map((data, index) => (
              <div className="flex gap-5 max-w-[400px]" key={index}>
                <div
                  className={`w-[35px] h-[15px] p-5 text-white flex items-center justify-center rounded-[50%] ${data.class}`}
                >
                  {data.mode}
                </div>
                <div>
                  <h2 className="font-medium text-xl mb-2">{data.title}</h2>
                  <p className="text-base">{data.description}</p>
                  {data.extras && (
                    <>
                      <p className="text-base my-2">{data.extras}</p>
                      <p className="text-base">{data.extras1}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
    
    </>
  );
};

export default Lifecycle;

interface NewsCardProps {
  mode: string;
  description: string;
  title: string;
  extras?: string;
  extras1?: string;
  className?: string;
}

const CycleCard: React.FC<NewsCardProps> = ({
  title,
  description,
  mode,
  extras,
  extras1,
  className,
}) => {
  // Determine classes based on title
  const getClassForTitle = (mode: string): string => {
    switch (mode) {
      case "2":
        return "bg-[#9698F8]";
      case "4":
        return "bg-[#EF8534]";
      case "1":
        return "bg-gradient-text order-2";
      case "3":
        return "bg-[#F1BA40] order-2";
      case "5":
        return "bg-gradient-text order-2";
      default:
        return "bg-[#FFDBAD] text-[#DC7C00]";
    }
  };

  return (
    <div className="flex gap-5 max-w-[400px]">
      <div
        className={`w-[35px] h-[15px] p-5 text-white flex items-center justify-center rounded-[50%] ${getClassForTitle(
          mode
        )}`}
      >
        {mode}
      </div>
      <div className={`${className}`}>
        <h2 className="font-medium text-xl mb-2">{title}</h2>
        <p className="text-base ">{description}</p>
        {extras && (
          <>
            <p className="text-base my-2">{extras}</p>
            <p className="text-base ">{extras1}</p>
          </>
        )}
      </div>
    </div>
  );
};
