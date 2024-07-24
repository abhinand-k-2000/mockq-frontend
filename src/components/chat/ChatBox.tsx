import SingleChat from "./SingleChat";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ChatBox = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
      {selectedChat && (
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedChat.chatName}
            </h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
              View Group
            </button>
        </div>
      )}
      <div className="flex-grow overflow-y-auto">
        <SingleChat />
      </div>
    </div>
  );
};

export default ChatBox;
