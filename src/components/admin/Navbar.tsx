// import toast from "react-hot-toast"
// import { logout } from "../../api/adminApi"
// import { useDispatch } from "react-redux"
// import { adminLogout } from "../../redux/slice/authSlice"
// import { useNavigate } from "react-router-dom"

// const Navbar = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

// const handleLogout = async () => {
//   const response = await logout()
//   if(response.success){
//     toast.success("Log out successful")
//     dispatch(adminLogout())
//     navigate('/admin')
//   }
// }

//   return (

//     <nav className="bg-blue-800 p-6 ">
//       <div className="container mx-auto">
//         <div className="flex items-center justify-end">
//           {/* <div className="text-white font-bold text-xl">MockQ</div> */}
//           <div className="text-white font-medium">
//             <button onClick={handleLogout} className="font-bold cursor-pointer">Logout</button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../redux/slice/authSlice';
import { logout } from '../../api/adminApi';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success('Log out successful');
      dispatch(adminLogout());
      navigate('/admin');
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-600 md:hidden">
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
              <FiBell className="h-6 w-6" />
            </button>
            <div className="ml-4 relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                <FiUser className="h-8 w-8 rounded-full" />
              </button>
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                  <div className="py-1 rounded-md bg-white shadow-xs">
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;