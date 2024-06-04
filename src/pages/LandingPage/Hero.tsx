import Image1 from "../../assets/image-1.png";
import Image2 from "../../assets/image-2.png";
import Image3 from "../../assets/image-3.png";
import Image4 from "../../assets/image-4.png";
import Image5 from "../../assets/image-5.png";
import Image6 from "../../assets/image-6.png";
import Image7 from "../../assets/image-7.png";
import Image8 from "../../assets/image-8.png";
import Image9 from "../../assets/image-9.svg";
import Image10 from "../../assets/image-10.svg";

import Banner from "../../assets/Banner.svg";
import { NavLink } from "react-router-dom";
import Marquee from "react-fast-marquee";
// let easeing = [0.6, -0.05, 0.01, 0.99];

// const stagger = {
//   animate: {
//     transition: {
//       delayChildren: 0.4,
//       staggerChildren: 0.2,
//       staggerDirection: 1,
//     },
//   },
// };

// const fadeInUp = {
//   initial: {
//     y: -60,
//     opacity: 0,
//     transition: {
//       duration: 0.6,
//       ease: easeing,
//     },
//   },
//   animate: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.6,
//       delay: 0.5,
//       ease: easeing,
//     },
//   },
// };

// const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

// const firstName = {
//   initial: {
//     y: -20,
//   },
//   animate: {
//     y: 0,
//     transition: {
//       delayChildren: 0.4,
//       staggerChildren: 0.04,
//       staggerDirection: -1,
//     },
//   },
// };

// const lastName = {
//   initial: {
//     y: -20,
//   },
//   animate: {
//     y: 0,
//     transition: {
//       delayChildren: 0.4,
//       staggerChildren: 0.04,
//       staggerDirection: 1,
//     },
//   },
// };

// const letter = {
//   initial: {
//     y: 400,
//   },
//   animate: {
//     y: 0,
//     transition: { duration: 1, ...transition },
//   },
// };

// const btnGroup = {
//   initial: {
//     y: -60,
//     opacity: 0,
//     transition: { duration: 0.6, ease: easeing },
//   },
//   animate: {
//     y: 0,
//     opacity: 1,
//     animation: {
//       duration: 0.6,
//       ease: easeing,
//     },
//   },
// };
// const star = {
//   initial: {
//     y: 60,
//     opacity: 0,
//     transition: { duration: 0.8, ease: easeing },
//   },
//   animate: {
//     y: 0,
//     opacity: 1,
//     animation: {
//       duration: 0.6,
//       ease: easeing,
//     },
//   },
// };

// const header = {
//   initial: {
//     y: -60,
//     opacity: 0,
//     transition: { duration: 0.05, ease: easeing },
//   },
//   animate: {
//     y: 0,
//     opacity: 1,
//     animation: {
//       duration: 0.6,
//       ease: easeing,
//     },
//   },
// };

const Hero = () => {
  const handleScroll = () => {
    const element = document.querySelector("#learn-more");
    if (element !== null) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      // initial={{ opacity: 0, scale: 0 }}
      // animate={{ opacity: 1, scale: 1 }}
      // transition={{ duration: 0.3, ease: easeing }}
      className="relative  font-poppins "
    >
      <div className="lg:container lg:flex flex-row-reverse  lg:flex-row lg:items-center lg:gap-12 mt-14 lg:mt-20 ">
        <div className="lg:hidden px-4 flex justify-center lg:flex-1 mb-10 md:mb-16 lg:mb-0">
          <img
            src={Banner}
            alt=""
            className="max-w-full h-auto sm:max-w-full"
          />
        </div>

        <div className="flex px-4 lg:px-0 flex-1 flex-col items-center lg:items-start mb-8 lg:mb-0">
          <h2 className="text-main text-lg lg:text-3xl text-center lg:text-left mb-6">
            Apply for, or Support the Acquisition of{" "}
            <span className=" text-[#19A9DF]"> Carbon Credit</span>
          </h2>
          <p className="text-main text-xs text-center lg:text-left mb-6 max-w-[720px]">
            As a Home Occupant/Owner, Let us help you register for Carbon Credit
            and let you have access to finance to support your retrofitting
            activities
          </p>

          <div className="flex justify-center flex-wrap gap-6">
            <NavLink to="/register">
              <button className="btn-blue hover:bg-[#19A9DF]">
                Get Started
              </button>
            </NavLink>

            <button
              onClick={handleScroll}
              className="btn  hover:bg-[#19A9DF] hover:text-white"
            >
              Learn More...
            </button>
          </div>
        </div>

        <div className="hidden lg:flex lg:justify-center lg:flex-1 mb-10 md:mb-16 lg:mb-0">
          <img
            src={Banner}
            alt=""
            className="max-w-full h-auto sm:max-w-full"
          />
        </div>
      </div>

      <div className="mt-20 lg:px-0">
        <h2 className="mb-6 text-center">Supported by</h2>

        <Marquee
          pauseOnHover
          // gradient
          // gradientColor={[237, 241, 246]}
          // gradientWidth={100}
          className="flex justify-stretch items-center w-[100vw] pb-10 pt-4"
          autoFill={true}
          speed={30}
        >
          <div className=" flex justify-between gap-x-14 md:gap-x-20 lg:gap-x-36 items-center w-full">
            <img src={Image1} alt="" className="h-20" />
            <img src={Image2} alt="" className="h-20" />
            <img src={Image3} alt="" className="h-20" />
            <img src={Image4} alt="" className="h-20" />
            <img src={Image5} alt="" className="h-20" />
            <img src={Image6} alt="" className="h-20" />
            <img src={Image7} alt="" className="h-20" />
            <img src={Image9} alt="" className="h-20" />
            <img src={Image10} alt="" className="h-20" />
            <img src={Image8} className="mr-28" alt="" />
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default Hero;
