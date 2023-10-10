import { useState } from "react";
import { useParams } from "react-router-dom";

import { ChatHeader } from "./components/chat-header/ChatHeader";
import { NewChatButton } from "./components/chat-button/NewChatButton";
import { SearchConversation } from "./components/chat-search-conversation/SearchConversation";
import { ChatConversation } from "./components/chat-conversation/ChatConversation";

export const Chat = () => {
  const [isNewChat, setIsNewChat] = useState<boolean>(false);
  const { id } = useParams();

  return (
    <section className="flex flex-col justify-center antialiased bg-gray-50 text-gray-600 min-h-screen p-4">
      <div className="h-full">
        {/* <!-- Card --> */}
        <div className="relative max-w-[340px] h-full mx-auto bg-white shadow-lg rounded-lg">
          {/* <!-- Card header --> */}
          {!isNewChat && !id && <ChatHeader />}
          {/* <!-- Card body --> */}
          {id && (
            <ChatConversation>
              <ChatHeader />
            </ChatConversation>
          )}
          {/* <!-- Bottom right button --> */}
          {isNewChat && !id && <SearchConversation />}
          {!isNewChat && !id && <NewChatButton newChat={() => setIsNewChat(!isNewChat)} />}
        </div>
      </div>
    </section>
  );
};
