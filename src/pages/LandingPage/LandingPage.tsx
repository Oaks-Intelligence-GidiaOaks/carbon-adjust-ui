import { useState } from "react";
import { FaBars } from "react-icons/fa";
import CarbonAdjustLogo from "../../assets/icons/CarbonAdjustLogo.svg";
import BgCover from "../../assets/images/BgCover.png";
import Hero from "./Hero";
// import Carousel from "../../components/reuseable/CarouselComponent";
// import CarouselComponent from "../../components/reuseable/CarouselComponent";
import PackageSection from "./PackageSection";
import ProjectSection from "./ProjectSection";
import Faq from "./Faq";
import GetStarted from "./GetStarted";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";

// let easeing = [0.6,-0.05,0.01,0.99];

// const stagger = {
//   animate:{
//     transition:{
//       delayChildren:0.4,
//       staggerChildren:0.2,
//
//     }
//   }
// }

// const fadeInUp = {
//   initial:{
//     y:-60,
//     opacity:0,
//     transition:{
//       duration:0.6, ease:easeing
//     }
//   },
//   animate:{
//     y:0,
//     opacity:1,
//     transition:{
//       duration:0.6,
//       delay:0.5,
//       ease:easeing
//     }
//   }
// };

// const transition = {duration:1.4,ease:[0.6,0.01,-0.05,0.9]};

// const firstName = {
//   initial:{
//     y:-20,
//   },
//   animate:{
//     y:0,
//     transition:{
//       delayChildren:0.4,
//       staggerChildren:0.04,
//       staggerDirection:-1
//     }
//   }
// }

// const lastName = {
//   initial:{
//     y:-20,
//   },
//   animate:{
//     y:0,
//     transition:{
//       delayChildren:0.4,
//       staggerChildren:0.04,
//       staggerDirection:1
//     }
//   }
// }

// const letter = {
//   initial:{
//     y:400,
//   },
//   animate:{
//     y:0,
//     transition:{duration:1, ...transition}
//   }
// };

// const btnGroup={
//   initial:{
//     y:-60,
//     opacity:0,
//     transition:{duration:0.6, ease:easeing}
//   },
//   animate:{
//     y:0,
//     opacity:1,
//     animation:{
//       duration:0.6,
//       ease:easeing
//     }
//   }
// };
// const star={
//   initial:{
//     y:60,
//     opacity:0,
//     transition:{duration:0.8, ease:easeing}
//   },
//   animate:{
//     y:0,
//     opacity:1,
//     animation:{
//       duration:0.6,
//       ease:easeing
//     }
//   }
// };

// const header={
//   initial:{
//     y:-60,
//     opacity:0,
//     transition:{duration:0.05, ease:easeing}
//   },
//   animate:{
//     y:0,
//     opacity:1,
//     animation:{
//       duration:0.6,
//       ease:easeing
//     }
//   }
// };

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useSelector((state: RootState) => state.user.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.div initial="initial" animate="animate" className="overflow-hidden">
      <div
        className="font-poppins  bg-cover bg-no-repeat bg-origin-content min-h-screen"
        style={{ backgroundImage: `url(${BgCover})` }}
      >
        <header className="lg:container px-4 lg:px-0 ">
          <nav className="lg:container flex justify-between items-center ">
            <div className="py-3 flex flex-start">
              <img src={CarbonAdjustLogo} alt="" className="" />
            </div>

            {/* <ul className=" hidden sm:flex justify-center flex-1 items-center gap-6 text-main">
            <li
              className={`cursor-pointer py-4 text-xs px-2 ${
                activeNavItem === 0
                  ? "bg-ca-blue-dark shadow-md text-white"
                  : "bg-transparent text-main"
              }`}
              onClick={() => handleNavItemClick(0)}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-4 text-xs px-2 ${
                activeNavItem === 1
                  ? "bg-ca-blue-dark shadow-md text-white"
                  : "bg-transparent text-main"
              }`}
              onClick={() => handleNavItemClick(1)}
            >
              Service
            </li>
            <li
              className={`cursor-pointer py-4 text-xs px-2 ${
                activeNavItem === 2
                  ? "bg-ca-blue-dark shadow-md text-white"
                  : "bg-transparent text-main"
              }`}
              onClick={() => handleNavItemClick(2)}
            >
              Blog
            </li>
            <li
              className={`cursor-pointer py-4 text-xs px-2 ${
                activeNavItem === 3
                  ? "bg-ca-blue-dark shadow-md text-white"
                  : "bg-transparent text-main"
              }`}
              onClick={() => handleNavItemClick(3)}
            >
              Contact us
            </li>
          </ul> */}

            <div className="hidden sm:flex gap-6">
              <NavLink
                to="https://kommunita-web.netlify.app/login"
                className="btn"
              >
                Kommunita
              </NavLink>
              <NavLink to="/register" className="btn">
                Sign up
              </NavLink>
              {user ? (
                <NavLink to="/login" className="">
                  {user.dp ? (
                    <div className="size-8 rounded-full shadow-lg">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        alt="avatar"
                        src={user.dp}
                      />
                    </div>
                  ) : (
                    <div className="size-8 shadow-lg flex items-center justify-center rounded border border-ca-blue">
                      <BiUser
                        fontSize={20}
                        width={40}
                        className="text-ca-blue text-3xl"
                      />
                    </div>
                  )}
                </NavLink>
              ) : (
                <NavLink to="/login" className="btn">
                  Login
                </NavLink>
              )}
            </div>

            <div className="flex cursor-pointer sm:hidden text-2xl flex-1 justify-end">
              {isMenuOpen ? (
                <AiOutlineClose
                  size={24}
                  onClick={toggleMenu}
                  className={`rotate text-ca-blue ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              ) : (
                <FaBars
                  size={24}
                  onClick={toggleMenu}
                  className=" text-ca-blue"
                />
              )}
            </div>
          </nav>
          <div className="bg-ca-blue-dark w-full h-[1px]"> </div>
        </header>

        {/* Harmburger menu */}
        <section
          className={`fixed top-0 sm:hidden h-screen  w-full text-5xl flex-col opacity- justify-items-center z-20 origin-top animate-open-menu ${
            isMenuOpen ? "animation-open-menu" : "hidden"
          }`}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(15px)",
          }}
        >
          {/* Close button */}
          {isMenuOpen && (
            <button
              className="absolute top-0 right-0 px-4 py-[18px]"
              onClick={toggleMenu}
            >
              <AiOutlineClose
                size={25}
                className={`rotate text-ca-blue ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
          <nav
            className="flex flex-col  items-center py-8 px-40 rounded-b-lg"
            aria-label="mobile"
          >
            <NavLink
              to="/"
              onClick={toggleMenu}
              className="font-poppins text-xl flex items-center justify-center font-medium w-full text-center py-3 text-ca-blue"
            >
              Home
            </NavLink>

            <div className="flex flex-col w-full absolute top-40 px-10">
              <NavLink
                to="https://kommunita-web.netlify.app/login"
                className="font-poppins text-lg font-medium w-full text-center bg-ca-blue text-white rounded-md py-2 mt-4"
              >
                Kommunita
              </NavLink>
              <NavLink
                to="/register"
                className="font-poppins text-lg font-medium w-full text-center py-2 bg-ca-blue  text-white rounded-md mt-4"
              >
                Sign up
              </NavLink>
              <NavLink
                to="/login"
                className="font-poppins text-lg font-medium w-full text-center bg-ca-blue text-white rounded-md py-2 mt-4"
              >
                Login
              </NavLink>
            </div>
          </nav>
        </section>

        {/* Hero section */}
        <Hero />
      </div>
      {/* Carousel */}

      <div className="bg-[#F7EEF4]">
        <div className="lg:container">{/* <CarouselComponent /> */}</div>
      </div>

      {/* Packages */}

      <div className="">
        <PackageSection />
      </div>

      <div className="">
        <ProjectSection />
      </div>

      <div>
        <Faq />
      </div>

      <div className="">{/* <Review /> */}</div>

      <div>
        <GetStarted />
      </div>

      <div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default LandingPage;
