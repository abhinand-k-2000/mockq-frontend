import Footer from "../../components/welcome_page/Footer";
import Navbar from "../../components/welcome_page/Navbar";

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
