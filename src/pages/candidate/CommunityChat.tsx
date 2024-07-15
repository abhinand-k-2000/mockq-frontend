import { FaPaperPlane, FaUsers, FaCog, FaSearch } from "react-icons/fa";
import CandidateNavbar from "../../components/candidate/CandidateNavbar";

const CommunityChat = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <CandidateNavbar />
      <div className="flex flex-1 overflow-hidden pt-20">
        {/* Sidebar */}
        <div className="w-64 bg-indigo-800 text-white flex flex-col">
          <div className="p-4 flex-shrink-0">
            <h1 className="text-2xl font-bold mb-4">Community Chat</h1>
            <div className="flex items-center bg-indigo-700 rounded-full p-2">
              <FaSearch className="text-indigo-300 mr-2" />
              <input
                type="text"
                placeholder="Search chats..."
                className="bg-transparent text-white placeholder-indigo-300 focus:outline-none w-full"
              />
            </div>
          </div>
          <nav className="mt-4 flex-1 overflow-y-auto">
            {["MERN", "Flutter", "Data Science"].map((item) => (
              <a
                key={item}
                href="#"
                className="flex items-center py-3 px-4 hover:bg-indigo-700 transition duration-200"
              >
                <FaUsers className="mr-3" /> {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat header */}
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">General Chat</h2>
            <button className="text-gray-500 hover:text-indigo-600 transition duration-200">
              <FaCog className="text-xl" />
            </button>
          </header>

          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-indigo-100 rounded-lg p-4 text-center text-indigo-800 max-w-md mx-auto">
              Welcome to the Community Chat!
            </div>
          </div>

          {/* Message input */}
          <div className="bg-white p-4 border-t">
            <div className="flex items-center bg-gray-100 rounded-full p-2 max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-transparent focus:outline-none px-4"
              />
              <button className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition duration-300 ease-in-out ml-2">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;