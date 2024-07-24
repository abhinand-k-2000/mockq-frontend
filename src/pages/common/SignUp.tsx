import { FcBusinessman, FcBriefcase } from "react-icons/fc";
import signUpImage from "/signUpImage.png";
import Navbar from "../../components/welcome_page/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D9E9FF] to-[#EEF5FF]">
      <Navbar />
      <div className="pt-32 pb-16"> {/* Added top padding to push content down */}
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left space-y-4">
              <h1 className="text-4xl lg:text-4xl font-bold text-[#142057] leading-tight">
                How do you want to use MockQ?
              </h1>
              <p className="text-xl text-gray-600">
                We'll personalize your experience accordingly
              </p>
            </div>

            <RoleCard
              icon={<FcBusinessman className="text-5xl" />}
              title="I am a tech professional"
              description="I want to take interviews and earn money"
              onClick={() => navigate("/interviewer/sign-up")}
            />

            <RoleCard
              icon={<FcBriefcase className="text-5xl" />}
              title="I am a candidate"
              description="I want real interview experience with industry experts"
              onClick={() => navigate("/candidate/sign-up")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                className="w-full object-cover object-center"
                src={signUpImage}
                alt="signup Image"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                <h2 className="text-3xl font-bold text-white text-center">
                  Made 2X with MockQ
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};


interface IProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void
}

const RoleCard: React.FC<IProps> = ({ icon, title, description, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
    onClick={onClick}
  >
    <div className="p-6 flex items-center space-x-4">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-[#142057] mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default SignUp;