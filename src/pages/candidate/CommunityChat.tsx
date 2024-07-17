import CandidateNavbar from "../../components/candidate/CandidateNavbar";
import Sidebar from "../../components/chat/Sidebar";
import ChatBox from "../../components/chat/ChatBox";

const CommunityChat = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <CandidateNavbar />
      <div className="flex flex-1 overflow-hidden pt-20">
        {/* Sidebar */}
        <Sidebar />

        {/* Main chat area */}
        <div className="flex-1 flex flex-col bg-blue-50 overflow-hidden">
          {/* Chat header */}

          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto p-4  space-y-4">
            {/* <SingleChat/> */}
            <ChatBox />
          </div>

          {/* Message input */}
          {/* <div className="bg-white p-4 border-t">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
