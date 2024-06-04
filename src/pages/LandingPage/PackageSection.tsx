import creditcard from "../../assets/images/creditcard.png";
import HomePackage from "../../assets/images/HomePackage.png";
import { BsDot } from "react-icons/bs";

const PackageSection = () => {
  return (
    <div className=" font-poppins">
      <div className="w-full bg-[#4688E9]">
        <div className="lg:relative lg:flex lg:items-center lg:justify-center w-full lg:container font-poppins lg:h-[50rem] grid grid-cols-1 gap-4 gap-y-16 sm:gap-y-4 sm:grid-cols-2 px-4 place-items-center py-4 lg:px-0 lg:py-0">
          <div className="lg:absolute lg:left-40 lg:top-20  lg:w-[300px]">
            <h2 className="text-lg font-poppins mb-4 text-center md:text-left">
              Create Packages
            </h2>
            <p className=" text-center md:text-left text-xs">
              <span className="text-white text-base">
                {" "}
                Financial Institutions
              </span>{" "}
              can create and publish Financial packages to help home
              owners/occupants apply for loans to finance their retrofitting
              activities
            </p>
            <img src={creditcard} className=" object-cover" alt="" />
          </div>

          <div className=" lg:absolute lg:right-36 lg:top-20 lg:border-l-[1px] lg:border-l-white ">
            <div className="lg:px-10 lg:py-10">
              <h3 className=" font-poppins text-sm text-white mb-4">
                To Create Home Improvement Packages:
              </h3>

              <div className="flex items-center gap-4">
                <BsDot className="text-white" />
                <p className="text-xs font-poppins text-white">
                  Click on create packages button
                </p>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <BsDot className="text-white" />
                <p className="text-xs font-poppins text-white">
                  Fill out the details required
                </p>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <BsDot className="text-white" />
                <p className="text-xs font-poppins text-white">
                  Generate the packages
                </p>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <BsDot className="text-white" />
                <p className="text-xs font-poppins text-white">
                  Publish the package for user to see and Apply
                </p>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <BsDot className="text-white" />
                <p className="text-xs font-poppins text-white">
                  Click on create packages
                </p>
              </div>
              <div className="flex mt-8 items-center lg:pl-12">
                <button className="btn-blue-border whitespace-nowrap">
                  Get started{" "}
                </button>
              </div>
            </div>
          </div>
          <div className=" lg:absolute   lg:left-36 lg:bottom-0 lg:mt-20 lg:border-r-[1px] border-r-white ">
            <div className="lg:px-10 lg:py-10">
              <h3 className=" font-poppins text-sm text-white mb-4">
                To Create Financial Packages:
              </h3>

              <div className="flex items-center gap-4">
                <BsDot className="text-white" />
                <p className="text-xs font-poppins text-white">
                  Click on create packages button
                </p>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <BsDot className="text-white" />
                <p className="text-xs font-poppins text-white">
                  Fill out the details required
                </p>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <BsDot className="text-white" />
                <p className="text-xs font-poppins text-white">
                  Generate the packages
                </p>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <BsDot className="text-white" />
                <p className="text-xs font-poppins text-white">
                  Publish the package for user to see and Apply
                </p>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <BsDot className="text-white" />
                <p className="text-xs font-poppins text-white">
                  Click on create packages
                </p>
              </div>
              <div className="flex mt-8 items-center lg:pl-12">
                <button className="btn-blue-border">Get started </button>
              </div>
            </div>
          </div>

          <div className=" lg:absolute  lg:right-48 lg:bottom-0 lg:mt-20  lg:w-[300px]">
            <h2 className="text-base font-poppins text-center md:text-left mb-1 text-white">
              {" "}
              Home Improvement Agencies
            </h2>
            <p className="md:text-left text-center font-poppins text-xs">
              can create and publish home improvement packages to help home
              owners/occupants apply to retrofit their homes.
            </p>
            <img src={HomePackage} className=" object-cover " alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSection;
