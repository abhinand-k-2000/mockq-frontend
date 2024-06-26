// import { Link } from 'react-router-dom'

// const Sidebar = () => {
//   return (
//     <aside className="bg-blue-800 text-white w-64">
//     <div className="p-4 ">
//       <h2 className="text-4xl font-bold mb-4 text-center p-1" >MockQ</h2>
//       <ul className='mt-10 flex flex-col space-y-5'>
//         <li className='bg-[#D9E9FF] text-black hover:bg-[#BCD8FF] shadow-lg rounded-lg text-center'><Link to="/admin/dashboard" className="block py-2">Home</Link></li>
//         <li className='bg-[#D9E9FF] text-black hover:bg-[#BCD8FF] shadow-lg rounded-lg text-center'><Link to="/admin/candidates" className="block py-2">Candidates</Link></li>
//         <li className='bg-[#D9E9FF] text-black hover:bg-[#BCD8FF] shadow-lg rounded-lg text-center'><Link to="/admin/interviewers" className="block py-2">Interviewers</Link></li>
//         <li className='bg-[#D9E9FF] text-black hover:bg-[#BCD8FF] shadow-lg rounded-lg text-center'><Link to="/admin/stacks" className="block py-2">Stacks</Link></li>
//       </ul>
//     </div>
//   </aside>
//   )
// }

// export default Sidebar


import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiUserCheck, FiLayers, FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", label: "Home", icon: <FiHome /> },
    { path: "/admin/candidates", label: "Candidates", icon: <FiUsers /> },
    { path: "/admin/interviewers", label: "Interviewers", icon: <FiUserCheck /> },
    { path: "/admin/stacks", label: "Stacks", icon: <FiLayers /> },
  ];

  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} transform fixed z-30 inset-y-0 left-0 w-64 transition duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}>
      <div className="flex flex-col h-full bg-gradient-to-b from-blue-800 to-blue-600 text-white shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 h-20 bg-blue-900">
          <h2 className="text-3xl font-bold">MockQ</h2>
          <button onClick={() => setIsOpen(false)} className="md:hidden">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;