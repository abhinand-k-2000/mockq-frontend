import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { interviewerLogout } from "../../redux/slice/authSlice";
import { logout } from "../../api/adminApi";



const InterviewerSidebar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const response = await logout()
        if(response.success){
          toast.success("Log out successfull")
          dispatch(interviewerLogout())
          navigate('/')
        }
      }


  return (
    <aside className="bg-[#142057]  flex flex-col space-y-10 items-center p-10  text-white w-72">
      <div>
        <h2 className="text-4xl font-bold mb-4 text-center p-1">MockQ</h2>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="  px-4">
          <img
            src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
            alt="..."
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
      </div>

      <div className="w-full">
        <ul className='flex flex-col space-y-5'>
            <Link to="/interviewer/home"><li className="bg-[#EEF5FF] cursor-pointer text-[#142057] text-center font-semibold  py-2 px-6 rounded-md">Profile</li></Link>
            <Link to="/interviewer/slots-list"><li className="bg-[#EEF5FF] cursor-pointer text-[#142057] text-center font-semibold py-2 px-6 rounded-md">My Slots</li></Link>
            <li className="bg-[#EEF5FF] cursor-pointer text-[#142057] text-center font-semibold py-2 px-6 rounded-md">Payments</li>
            <li onClick={handleLogout} className="bg-red-400 cursor-pointer text-white text-center font-semibold py-2 px-6 rounded-md">Logout</li>
        </ul>
      </div>
    </aside>
  );
};

export default InterviewerSidebar;
