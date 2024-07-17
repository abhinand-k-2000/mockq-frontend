import React, { useEffect, useState } from "react";
import { FaPlus, FaUsers } from "react-icons/fa";
import GroupChatModal from "./GroupChatModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getAllChats } from "../../api/candidateApi";
import { setChats, setSelectedChat } from "../../redux/slice/chatSlice";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => setIsModalOpen((cur) => !cur);

  const { chats, selectedChat } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  const fetchChats = async () => {
    try {
      const response = await getAllChats();
      dispatch(setChats(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="w-72 bg-gradient-to-br from-[#19328F] to-[#0F1F5C] text-white flex flex-col shadow-xl">
      <div className="p-6 flex-shrink-0">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <FaUsers className="mr-3" />
          Communities
        </h2>
        <button
          onClick={handleModalToggle}
          className="w-full bg-white text-[#19328F] font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-opacity-90 transition duration-300 flex items-center justify-center transform hover:scale-105"
        >
          <FaPlus className="mr-2" />
          Create Community
        </button>
      </div>

      <div className="flex-grow overflow-y-auto px-4 py-2 space-y-3">
        {chats ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => dispatch(setSelectedChat(chat))}
              className={`cursor-pointer px-4 py-3 ${
                selectedChat === chat
                  ? "bg-[#9be6e2] text-[#19328F] hover:bg-opacity-60"
                  : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"
              } rounded-lg transition duration-300  hover:shadow-md`}
            >
              <h3 className="font-semibold truncate">{chat.chatName}</h3>
              <p className="text-xs opacity-70 mt-1">
                {chat.users?.length} Members
              </p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white border-opacity-20">
        {/* Add user profile or logout button here */}
      </div>

      <GroupChatModal handleOpen={handleModalToggle} open={isModalOpen} />
    </div>
  );
};

export default Sidebar;