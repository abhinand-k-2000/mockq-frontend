// import Footer from "../../components/welcome_page/Footer";
// import Navbar from "../../components/welcome_page/Navbar";

// import LandingHero from "../../components/welcome_page/LandingHero";
// import DomainsCovered from "../../components/welcome_page/DomainsCovered";
// import HowItWorks from "../../components/welcome_page/HowItWorks";

// const Welcome = () => {
//   return (


//     <div className="pt-16">
//         <Navbar />
//       <main className="flex flex-col items-center justify-center">
//         <LandingHero />

//         <DomainsCovered />

//         <HowItWorks />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Welcome;

import { motion } from 'framer-motion';
import Footer from "../../components/welcome_page/Footer";
import Navbar from "../../components/welcome_page/Navbar";
import LandingHero from "../../components/welcome_page/LandingHero";
import DomainsCovered from "../../components/welcome_page/DomainsCovered";
import HowItWorks from "../../components/welcome_page/HowItWorks";

const Welcome = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-blue-50 to-white min-h-screen"
    >
      <Navbar />
      <main className="flex flex-col items-center justify-center">
        <LandingHero />
        <DomainsCovered />
        <HowItWorks />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Welcome;
