import { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa";
import CarbonAdjustLogo from "../../assets/icons/CarbonAdjustLogo.svg";
// import BgCover from "../../assets/images/BgCover.png";
import Hero from "./Hero";
// import Carousel from "../../components/reuseable/CarouselComponent";
// import CarouselComponent from "../../components/reuseable/CarouselComponent";
// import PackageSection from "./PackageSection";
import ProjectSection from "./ProjectSection";
import Faq from "./Faq";
// import GetStarted from "./GetStarted";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { RootState } from "@/app/store";
// import { useSelector } from "react-redux";
import { Button } from "@/components/ui";
import WhatWeOffer from "./WhatWeOffer";
import HomeEnergyPlan from "./HomeEnergyPlan";
import MarketPlace from "./MarketPlace";
import GetInTouch from "./GetInTouch";

const useScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useScrollToHash();
  // const user = useSelector((state: RootState) => state.user.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div initial="initial" animate="animate" className="overflow-hidden">
      <div
        className="font-poppins relative bg-cover bg-no-repeat bg-origin-content min-h-screen after:absolute after:inset-0 after:-z-[1px] after:bg-[url(/assets/graphics/hero-bg.svg)] after:bg-no-repeat after:bg-cover after:opacity-50"
        // style={{ backgroundImage: `url(/assets/graphics/hero-bg.svg)` }}
      >
        <header className="lg:container px-4 lg:px-0 !border-none relative z-10">
          <nav className="lg:container flex justify-between items-center ">
            <div className="py-3 flex flex-start" id="home">
              <img src={CarbonAdjustLogo} alt="" className="xl:w-[200px]" />
            </div>

            {/* <ul className=" hidden sm:flex justify-center flex-1 items-center gap-6">
              <Link to={"#home"}>
                <li className={`cursor-pointer py-4 base px-2 text-black`}>
                  Home
                </li>
              </Link>
              <Link to={"#about-us"}>
                <li className={`cursor-pointer py-4 base px-2 text-black`}>
                  About us
                </li>
              </Link>
              <Link to={"#what-we-offer"}>
                <li className={`cursor-pointer py-4 base px-2 text-black`}>
                  What we offer
                </li>
              </Link>
              <Link to={"#contact-us"}>
                <li className={`cursor-pointer py-4 base px-2 text-black`}>
                  Contact us
                </li>
              </Link>
            </ul> */}

            <div className="gap-6">
              <Link to={"/login"}>
                <Button className="h-7">Get started</Button>
              </Link>
            </div>

            {/* <div className="flex cursor-pointer sm:hidden text-2xl flex-1 justify-end">
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
            </div> */}
          </nav>
        </header>

        {/* Harmburger menu */}
        <section
          className={`top-0 hidden h-screen w-full text-5xl flex-col opacity- justify-items-center z-20 origin-top animate-open-menu ${
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
        <div className="relative z-10">
          <Hero />
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto" id="about-us">
        <HomeEnergyPlan />
      </div>

      <div className="relative bg-[#F1F7FE]">
        <ProjectSection />
        <img
          src="/assets/graphics/about-us-bg.svg"
          className="absolute bottom-0 left-0 w-full max-h-[100px] z-10"
          // initial={{ opacity: 0, y: 50 }}
          // animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          // transition={{ duration: 0.6 }}
        />
        <img
          src="/assets/graphics/trans-cloud.png"
          className="absolute bottom-0 left-0 w-full h-full z-0"
          // initial={{ opacity: 0, y: 50 }}
          // animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          // transition={{ duration: 0.6 }}
        />
      </div>
      <div className="bg-custom-radial relative" id="what-we-offer">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="p-4 lg:p-8"
        >
          <motion.div variants={itemVariants}>
            <WhatWeOffer />
          </motion.div>
        </motion.div>
        <img
          src={"/assets/graphics/hero-graphic.svg"}
          alt=""
          className="hidden lg:block max-w-full h-auto sm:max-w-full animate-spin-slow absolute top-0 left-0 !-translate-x-1/3 !translate-y-[40%]"
        />
        <motion.img
          src="/assets/graphics/offer-graphic.png"
          className="hidden min-[1330px]:block absolute bottom-0 left-0 min-[1330px]:h-[65%] lg:w-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.6 }}
        />
        <img
          src="/assets/graphics/account-setup-scribble-right.svg"
          className="hidden lg:block absolute bottom-0 -right-[2%] h-fit"
        />
      </div>

      <div className="">{/* <Review /> */}</div>

      <div className="bg-[#F0F0F0]">
        <MarketPlace />
      </div>
      <div id="faqs">
        <Faq />
      </div>
      <div
        className="bg-[url(/assets/graphics/get-in-touch-bg.jpeg)] bg-no-repeat bg-cover bg-gray-900/100"
        id="contact-us"
      >
        <div className="bg-[#003584]/20">
          <GetInTouch />
        </div>
      </div>

      <div className="bg-[#D7E7FF]">
        <Footer />
      </div>
    </motion.div>
  );
};

export default LandingPage;
