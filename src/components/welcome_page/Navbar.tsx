import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const Navbar = () => {
  const [navBg, setNavBg] = useState("transparent");
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavBg("white");
    } else {
      setNavBg("transparent");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: navBg }}
      className="fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-300"
    >
      <div className="container  mx-auto px-6 py-4 flex justify-between items-center">
        <h1 onClick={() => navigate('/')} className="font-bold text-4xl cursor-pointer text-blue-900">
          MockQ
        </h1>
        <div className="flex space-x-6">
          <button onClick={() => navigate('/sign-up')} className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300">
            Sign Up
          </button>
          <button onClick={() => navigate('/login')} className="text-blue-900 font-semibold hover:text-blue-700 transition-colors duration-300">
            Login
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;





// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [navBg, setNavBg] = useState("#EAF2FF");
//   const navigate = useNavigate();

//   const handleScroll = () => {
//     if (window.scrollY > 0) {
//       setNavBg("#FFFFFF");
//     } else {
//       setNavBg("#EAF2FF");
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       style={{ backgroundColor: navBg }}
//       className="h-16 fixed top-0 left-0 shadow-sm transition-colors duration-300 w-full flex justify-between items-center p-10 z-50"
//     >
//       <div>
//         <h1 onClick={() => navigate('/')} className="font-bold text-4xl cursor-pointer text-[#142057]">
//           MockQ
//         </h1>
//       </div>
//       <div className="flex space-x-10 m-10">
//         <p onClick={() => navigate('/sign-up')} className="bg-[#142057] px-5 py-2 rounded-lg font-semibold text-[#EEF5FF] cursor-pointer hover:bg-[#19328F]">
//           Sign Up
//         </p>
//         <p onClick={() => navigate('/login')} className="text-[#142057] font-bold text-lg mt-1 cursor-pointer">
//           Login
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
