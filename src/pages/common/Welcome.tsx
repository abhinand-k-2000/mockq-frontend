import Footer from "../../components/welcome_page/Footer";
import Navbar from "../../components/welcome_page/Navbar";
import PromotionalAd from "../../components/welcome_page/PromotionalAd";
import StackDisplay from "../../components/welcome_page/StackDisplay";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { FaStar, FaUserTie } from "react-icons/fa";
import LandingHero from "../../components/welcome_page/LandingHero";
import DomainsCovered from "../../components/welcome_page/DomainsCovered";
import HowItWorks from "../../components/welcome_page/HowItWorks";

const Welcome = () => {
  return (


    <div className="pt-16">
        <Navbar />
      <main className="flex flex-col items-center justify-center">
        <LandingHero />

        <DomainsCovered />

        <HowItWorks />
        {/* <PromotionalAd /> */}
        {/* Other page sections */}
      </main>
      <Footer />
    </div>
  );
};

export default Welcome;
