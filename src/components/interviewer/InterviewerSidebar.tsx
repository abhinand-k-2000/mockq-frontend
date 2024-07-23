import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { interviewerLogout } from "../../redux/slice/authSlice";
import { logout } from "../../api/adminApi";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser, FiCalendar, FiDollarSign, FiLogOut } from 'react-icons/fi';
import { FaCheckToSlot } from "react-icons/fa6";
import { getInterviewerDetails } from "../../api/interviewerApi";

const InterviewerSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture]  = useState<string>("https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg")


  useEffect(() => {
    const interviewerDetails = async () => {
      const response = await getInterviewerDetails()
      console.log('response', response)
      setProfilePicture(response.data.profilePicture)
    }
    interviewerDetails();
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success("Log out successful");
      dispatch(interviewerLogout());
      navigate("/");
    }
  };

  const menuItems = [
    { path: "/interviewer/home", label: "Profile", icon: <FiUser /> },
    { path: "/interviewer/slots-list", label: "My Slots", icon: <FiCalendar /> },
    { path: "/interviewer/scheduled-interviews", label: "Scheduled", icon: <FaCheckToSlot/> },
    { path: "/interviewer/payments", label: "Payments", icon:  <FiDollarSign />}
  ];

  return (
    <>
      {/* Menu button for smaller screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#142057] text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-[#142057] to-[#1e3a8a] flex flex-col items-center p-6 text-white w-72 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-all duration-300 ease-in-out fixed md:relative h-full z-40 shadow-2xl`}
      >
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-center p-1 bg-clip-text text-transparent text-white">MockQ</h2>
        </div>

        <div className="mb-8">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-fill border-4 border-white shadow-lg"
          />
        </div>

        <nav className="w-full flex-grow">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-white text-[#142057] shadow-md'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="w-full mt-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </aside>

      {/* Overlay for smaller screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default InterviewerSidebar;