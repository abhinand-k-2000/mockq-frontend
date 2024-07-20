import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [navBg, setNavBg] = useState("#EAF2FF");
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setNavBg("#FFFFFF");
    } else {
      setNavBg("#EAF2FF");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ backgroundColor: navBg }}
      className="h-16 fixed top-0 left-0 shadow-sm transition-colors duration-300 w-full flex justify-between items-center p-10 z-50"
    >
      <div>
        <h1 onClick={() => navigate('/')} className="font-bold text-4xl cursor-pointer text-[#142057]">
          MockQ
        </h1>
      </div>
      <div className="flex space-x-10 m-10">
        <p onClick={() => navigate('/sign-up')} className="bg-[#142057] px-5 py-2 rounded-lg font-semibold text-[#EEF5FF] cursor-pointer hover:bg-[#19328F]">
          Sign Up
        </p>
        <p onClick={() => navigate('/login')} className="text-[#142057] font-bold text-lg mt-1 cursor-pointer">
          Login
        </p>
      </div>
    </div>
  );
};

export default Navbar;
