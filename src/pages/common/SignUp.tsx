import { FcBusinessman } from "react-icons/fc";
import { FcBriefcase } from "react-icons/fc";
import signUpImage from "/signUpImage.png"
import Navbar from "../../components/welcome_page/Navbar";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate()
  return (
    <>
    <Navbar/>
    <div className="h-screen bg-[#D9E9FF] grid grid-cols-12">
      <div className=" col-span-7 flex flex-col justify-center items-center">
        <div className="text-center m-5 space-y-2">
          <h1 className="text-3xl font-bold text-[#142057]">
            How do you want to use MockQ
          </h1>
          <p>Will personlize your experience accordingly</p>
        </div>

        <div onClick={()=> navigate("/interviewer/sign-up")} className="h-20 flex justify-evenly text-[#142057] items-center bg-[#EEF5FF] w-[60%] m-2 cursor-pointer  rounded-md shadow-lg shadow-[#142057] hover:border-gray-700 border-transparent border-2">
          <FcBusinessman />
          <div>
            <p className="font-medium text-sm">
              {" "}
              I am a tech professional and want to become an interviewer
            </p>
            <p className="font-light">
              I want to take interviews and earn money
            </p>
          </div>
        </div>

        <div onClick={()=> navigate("/candidate/sign-up")} className="h-20 flex justify-evenly text-[#142057] items-center p-2 w-[60%] bg-[#EEF5FF] cursor-pointer m-2 rounded-md shadow-lg shadow-[#142057] hover:border-gray-700 border-transparent border-2">
          <FcBriefcase />
          <div>
            <p className="font-medium text-sm">
              {" "}
              I am a candidate and want to test my skills through mock
              interviews
            </p>
            <p className="font-light">
              I want real interview experience with industry experts
            </p>
          </div>
        </div>
      </div>

      <div className=" col-span-5 flex justify-center items-center">
       <div>
       <img className="h-1/2 rounded-t-md" src={signUpImage} alt="signup Image" />
       <div className="h-24 font-medium text-lg bg-black text-[#EEF5FF] flex justify-center items-center">
        <h1>Made 2X with MockQ</h1>
       </div>
       </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;
