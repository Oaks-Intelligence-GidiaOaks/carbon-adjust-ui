import Get1 from "../../assets/Get1.svg";
import Get2 from "../../assets/Get2.svg";
import Get3 from "../../assets/Get3.svg";

const GetStarted = () => {
  return (
    <div className="lg:container font-poppins">
      <div className="mt-10 pb-10">
        <h2 className="text-2xl mb-8 lg:mb-0  font-poppins text-ca-blue font-medium flex justify-center items-center ">
          To Get Started
        </h2>

        <div className="flex px-4 lg:px-0 flex-col items-center mt-4 justify-center">
          <div>
            <h2 className="text-sm font-medium font-poppins text-ca-blue">
              As an Individual
            </h2>

            <div className="">
              <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                <div className="bg-[#F7EEF4]  lg:w-[275px] py-3 mt-2 px-3 rounded">
                  <span className="text-sm font-medium font-poppins text-[#A19E9E]">
                    01
                  </span>

                  <div className="flex items-center justify-center">
                    <img className="w-20" src={Get1} alt="" />
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <h1 className=" font-poppins text-sm font-semibold text-[#393535]">
                      Get Registered
                    </h1>
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <p className=" text-center text-sm p-4">
                      Enter Personal Details to get Registered.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F7EEF4]  lg:w-[275px] py-3 mt-2 px-3 rounded">
                  <span className="text-sm font-medium font-poppins text-[#A19E9E]">
                    02
                  </span>

                  <div className="flex items-center justify-center">
                    <img className="w-20" src={Get2} alt="" />
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <h1 className=" font-poppins text-sm font-semibold text-[#393535]">
                      Get Verified
                    </h1>
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <p className=" text-center text-sm p-4">
                      Upload required Documents and get Verified.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F7EEF4]  lg:w-[275px] py-3 mt-2 px-3 rounded">
                  <span className="text-sm font-medium font-poppins text-[#A19E9E]">
                    03
                  </span>

                  <div className="flex items-center justify-center">
                    <img className="w-20" src={Get3} alt="" />
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <h1 className=" font-poppins text-sm font-semibold text-[#393535]">
                      Start Applications
                    </h1>
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <p className=" text-center text-sm p-4">
                      Start Applying as a Home Occupant to Aggregators,
                      Financial Institutes, or Home Improvement Agencies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-sm font-medium font-poppins text-ca-blue">
              As an Organization
            </h2>

            <div className="">
              <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                <div className="bg-[#F7EEF4]  lg:w-[275px] py-3 mt-2 px-3 rounded">
                  <span className="text-sm font-medium font-poppins text-[#A19E9E]">
                    01
                  </span>

                  <div className="flex items-center justify-center">
                    <img className="w-20" src={Get1} alt="" />
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <h1 className=" font-poppins text-sm font-semibold text-[#393535]">
                      Get Registered
                    </h1>
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <p className=" text-center text-sm p-4">
                      Enter Organization Details to get Registered.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F7EEF4]  lg:w-[275px] py-3 mt-2 px-3 rounded">
                  <span className="text-sm font-medium font-poppins text-[#A19E9E]">
                    02
                  </span>

                  <div className="flex items-center justify-center">
                    <img className="w-20" src={Get2} alt="" />
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <h1 className=" font-poppins text-sm font-semibold text-[#393535]">
                      Get Verified
                    </h1>
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <p className=" text-center text-sm p-4">
                      Upload required Documents and get Verified.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F7EEF4]  lg:w-[275px] py-3 mt-2 px-3 rounded">
                  <span className="text-sm font-medium font-poppins text-[#A19E9E]">
                    03
                  </span>

                  <div className="flex items-center justify-center">
                    <img className="w-20" src={Get3} alt="" />
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <h1 className=" font-poppins text-sm font-semibold text-[#393535">
                      Start Applications
                    </h1>
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <p className=" text-center text-sm p-4">
                      Create packages that will be published and available for
                      individuals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-6">
          <button className="btn-blue">Get started</button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
