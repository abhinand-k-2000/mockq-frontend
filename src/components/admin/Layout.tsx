// import {ReactNode} from 'react'
// import Sidebar from './Sidebar'
// import Navbar from './Navbar'   


// interface Props {
//     children: ReactNode
// }

// const Layout = ({children}: Props) => {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex flex-col w-full">
//         <Navbar />
//         <main className="flex-1 p-4 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   )
// }

// export default Layout


import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { FiMenu } from 'react-icons/fi';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;