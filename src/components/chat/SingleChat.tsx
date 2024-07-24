import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { getAllMessages, saveMessage } from "../../api/candidateApi";
import { FaPaperPlane } from "react-icons/fa";
import ScrollableChat from "./ScrollableChat";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "@material-tailwind/react";
import io, { Socket } from "socket.io-client"

const ENDPOINT = "http://localhost:3000"
let socket: Socket;

interface DecodedToken {
  id: string;
}
interface IMessage {
  _id: string;
  sender: {_id: string; name: string};
  content: string
}

const SingleChat = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat);
  const { candidateInfo } = useSelector((state: RootState) => state.auth);
  const decoded: DecodedToken = jwtDecode(candidateInfo);
  const userId = decoded.id;

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false)

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const response = await getAllMessages(selectedChat._id);
      setMessages(response.data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id)
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to fetch messages");
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userId);
    socket.on("connected", () => {
      setSocketConnected(true)
    })


    socket.on("message received", (newMessageRecieved) => {
      console.log('mesg redcied form sockert: ', newMessageRecieved)
      setMessages((prevMsg) => [...prevMsg, newMessageRecieved])
    })


    return () => {
      socket.disconnect()
    }
  }, [userId])

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const typingHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async (event: KeyboardEvent<HTMLInputElement> | {key: string}) => {
    if (event.key === "Enter" && newMessage) {
      setNewMessage("");
      try {
        if(!selectedChat) return toast.error("No chat selected!")
        const response = await saveMessage(newMessage, selectedChat._id);
        
        socket.emit("new message", response.data)
        setMessages((prevMsg) => [...prevMsg, response.data]);
      } catch (error) {
        toast.error("Failed to send message");
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {selectedChat ? (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Spinner className="h-12 w-12 text-blue-900" />
              </div>
            ) : (
              <ScrollableChat messages={messages} userId={userId} />
            )}
          </div>
          <div className="bg-white p-4 shadow-md">
            <div className="flex items-center bg-gray-100 rounded-full p-2 max-w-4xl mx-auto">
              <input
                onKeyDown={sendMessage}
                onChange={typingHandler}
                value={newMessage}
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-transparent focus:outline-none px-4 py-2"
              />
              <button 
                onClick={() => sendMessage({ key: "Enter" })}
                className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 transition duration-300 ease-in-out ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full bg-gray-100 p-8 text-center">

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to Community Chat!
        </h1>
        <p className="text-lg text-gray-600 max-w-md mb-6">
          Connect with peers, share ideas, and grow together. Join a community to start your conversation.
        </p>
        <ul className="text-left text-gray-700 mb-6">
          <li className="flex items-center mb-2">
            <span className="mr-2">👥</span> Browse communities in the sidebar
          </li>
          <li className="flex items-center mb-2">
            <span className="mr-2">🔍</span> Find a topic that interests you
          </li>
          <li className="flex items-center">
            <span className="mr-2">💬</span> Click to join and start chatting!
          </li>
        </ul>
 
      </div>
      )}
    </div>
  );
};

export default SingleChat;