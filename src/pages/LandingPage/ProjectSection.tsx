import project1 from "../../assets/project1.svg";
import project2 from "../../assets/project2.svg";
import project3 from "../../assets/project3.svg";
import Group from "../../assets/Group.svg";

const ProjectSection = () => {
  return (
    <div className="bg-[#F7EEF4] font-poppins bg">
      <div className=" lg:container flex items-center justify-center">
        <div className="mt-20">
          <h2 className="text-lg font-poppins text-ca-blue font-medium">
            Projects
          </h2>
          <p className="text-xs pt-2 mb-4 font-poppins text-left">
            Projects are created and assigned to organizations <br /> staff to
            supervise and allocate carbon credit.
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
            <img src={project1} alt="" />

            <div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <img src={project2} alt="" />
                <img src={project3} alt="" />
              </div>
              <div className="flex items-center justify-center mt-10">
                <button className="btn-blue">Get started</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex items-center justify-center lg:px-16">
        <div className="mt-20 ">
          <h2 className="text-lg  font-poppins text-ca-blue font-medium">
            Why Choose Carbon Adjust?
          </h2>
          <p className="text-xs pt-2 mb-4 font-poppins text-justify ">
            At Carbon Adjust, we're not just a platform – we're your partner in
            making a positive impact on our planet. <br /> Here's why you should
            choose us for your carbon credit journey:
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-10 pb-20 gap-4 mt-10">
            <div className="lg:px-6 lg:border-r-[1px] lg:border-r[#A19E9E]">
              <img src={Group} alt="" />
              <h1 className="text-base text-[#A19E9E] font-poppins py-2">01</h1>
              <h1 className=" font-poppins  font-medium">
                Verified by Verra and ICR
              </h1>
              <p className="text-xs mb-4 font-poppins  mt-4">
                {" "}
                Collaborate with other organizations and make a real difference.{" "}
              </p>
            </div>
            <div className="lg:px-6 lg:border-r-[1px] lg:border-r[#A19E9E]">
              <img src={Group} alt="" />
              <h1 className="text-base text-[#A19E9E] font-poppins  py-2">
                02
              </h1>
              <h1 className=" font-poppins  font-medium">Easy to use</h1>
              <p className="text-xs mb-4 font-poppins  mt-4">
                Seamlessly Navigate your sustainability Journey.
              </p>
            </div>
            <div className="lg:px-6 lg:border-r-[1px] lg:border-r[#A19E9E]">
              <img src={Group} alt="" />
              <h1 className="text-base text-[#A19E9E] font-poppins  py-2">
                03
              </h1>
              <h1 className=" font-poppins font-medium">
                Carbon Credit Opportunities
              </h1>

              <p className="text-xs mb-4 font-poppins mt-4  ">
                Earn, Trade or Retire Carbon Credit for Positive Environmental
                impact.
              </p>
            </div>
            <div className="lg:px-6 ">
              <img src={Group} alt="" />
              <h1 className="text-base text-[#A19E9E] font-poppins py-2">04</h1>
              <h1 className=" font-poppins font-medium">
                Effortless Documentation
              </h1>
              <p className="text-xs mb-4 font-poppins  mt-4 ">
                {" "}
                Manage Projects and documents with ease.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
