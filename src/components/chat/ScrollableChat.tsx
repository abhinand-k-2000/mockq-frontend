import {  Tooltip } from "@material-tailwind/react";
import  { useEffect, useRef } from "react";
import Avatar from 'react-avatar';
import {isLastMessage, isSameSender, isSameSenderMargin} from "../../config/chatLogic";

interface IUser {
  _id: string;
  name: string
}
interface IMessage {
  _id: string;
  sender: IUser;
  content: string
}
interface ScrollableChatProps {
  messages: IMessage[];
  userId: string
}


const ScrollableChat: React.FC<ScrollableChatProps> = ({ messages, userId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBotton = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBotton();
  }, [messages]);

  return (
    <div className="h-[400px] overflow-y-auto p-4">
      {messages &&
        messages.map((m, i) => (
          <div key={m._id} className="flex items-start mb-4">
            {(isSameSender(messages, m, i, userId) ||
              isLastMessage(messages, i, userId)) && (
              <Tooltip content={m.sender.name}>
                <Avatar
                  size="50px"
                  name={m.sender.name}
                  round="100%"
                  className="mr-3"
                  alt="avatar"
                />
              </Tooltip>
            )}
            <span
              style={{
                background: `${m.sender._id == userId ? "#BEE3F8" : "#B9F5D0"}`,
                marginLeft: isSameSenderMargin(messages, m, i, userId),
                // marginTop: isSameUser(messages, m, i) ? 3 : 10
              }}
              className=" rounded-lg p-3 max-w-[50%]"
            >
              {m.content}
            </span>
          </div>
        ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ScrollableChat;
