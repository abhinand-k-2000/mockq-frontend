import React from "react";
import Navbar from "../../components/welcome_page/Navbar";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaUserGraduate, FaArrowRight } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#D9E9FF]">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold text-center text-[#142057] mb-16 leading-tight">
          Elevate Your Career<br />Choose Your Path
        </h1>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-12">
          <RoleCard
            title="Become an Interviewer"
            description="Join our elite community of freelance interviewers. Expand your horizons, share your expertise, and shape the future of tech talent."
            icon={<FaUserTie className="text-6xl text-[#142057]" />}
            badgeText="Earn & Grow"
            badgeColor="bg-[#65CC6F]"
            onClick={() => navigate("/interviewer/login")}
            cardColor="bg-[#EEF5FF]"
          />

          <RoleCard
            title="For Candidates"
            description="Unlock your potential with expert-led mock interviews. Gain invaluable insights, boost your confidence, and ace your next tech interview."
            icon={<FaUserGraduate className="text-6xl text-[#142057]" />}
            badgeText="Mock Interviews"
            badgeColor="bg-[#6CB8D1]"
            onClick={() => navigate("/candidate/login")}
            cardColor="bg-[#EEF5FF]"
          />
        </div>
      </div>
    </div>
  );
};

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badgeText: string;
  badgeColor: string;
  onClick: () => void;
  cardColor: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  icon,
  badgeText,
  badgeColor,
  onClick,
  cardColor,
}) => {
  return (
    <div className={`w-full lg:w-[450px] ${cardColor} rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-3xl`}>
      <div className="p-10">
        <div className="flex justify-between items-center mb-8">
          {icon}
          <span className={`${badgeColor} text-white text-sm font-bold px-4 py-2 rounded-full`}>
            {badgeText}
          </span>
        </div>
        <h2 className="text-3xl font-bold text-[#142057] mb-6">{title}</h2>
        <p className="text-[#142057] text-lg mb-10 leading-relaxed">{description}</p>
        <button
          onClick={onClick}
          className="w-full bg-[#142057] text-white py-4 rounded-full font-bold text-lg transition-all hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#142057] focus:ring-offset-2 group"
        >
          Login
          <FaArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Login;