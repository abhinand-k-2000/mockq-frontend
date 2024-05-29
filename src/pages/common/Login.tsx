import Navbar from "../../components/welcome_page/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />

      <div className="h-screen flex justify-evenly items-center bg-[#D9E9FF]">
        {/* Card 1 */}

        <div className="w-1/3  h-96 p-8 flex flex-col justify-center items-center text-center space-y-8 bg-[#EEF5FF] shadow-lg rounded-lg">
            <div className="h-8 w-1/3 rounded-full bg-[#65CC6F] font-medium flex justify-center items-center ">Earn & Grow</div>
          <h1 className="text-2xl text-[#142057] font-bold mb-4">Become an Interviewer</h1>
          <p className="mb-4">
            Join our community of freelance interviewers. Gain exposure beyond
            your workspace and exercise the power of your knowledge and freedom
          </p>   
          <button onClick={()=> navigate("/interviewer/login")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Login</button>
        </div>  

        {/* Card 2 */}
        <div className="w-1/3 h-96 flex flex-col justify-center items-center p-8 text-center space-y-8 bg-[#EEF5FF] shadow-lg rounded-lg ml-4">
        <div className="h-8 rounded-full w-1/3 bg-[#6CB8D1] font-medium flex justify-center items-center">Mock Interviews</div>

          <h1 className="text-2xl text-[#142057] font-bold mb-4">For Candidates</h1>
          <p className="mb-4">Get actionable feedback of your interview from industry experts</p>
          <button onClick={()=> navigate("/candidate/login")} className="px-4  py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
