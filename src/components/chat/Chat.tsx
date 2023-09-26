import { useState } from "react";
import { useParams } from "react-router-dom";

import { ChatHeader } from "./components/chat-header/ChatHeader";
import { NewChatButton } from "./components/chat-button/NewChatButton";
import { SearchConversation } from "./components/chat-search-conversation/SearchConversation";
import { ChatConversation } from "./components/chat-conversation/ChatConversation";

export const Chat = () => {
  const [isNewChat, setIsNewChat] = useState<boolean>(false);
  const { id } = useParams();
  console.log(id);
  return (
    <section className="flex flex-col justify-center antialiased bg-gray-50 text-gray-600 min-h-screen p-4">
      <div className="h-full">
        {/* <!-- Card --> */}
        <div className="relative max-w-[340px] min-h-[40vw] mx-auto bg-white shadow-lg rounded-lg">
          {/* <!-- Card header --> */}
          {!isNewChat && !id && <ChatHeader />}
          {/* <!-- Card body --> */}
          <div className="py-3 px-3" style={{ minHeight: "inherit" }}>
            {id && (
              <ChatConversation>
                <ChatHeader />
              </ChatConversation>
            )}
          </div>
          {/* <!-- Bottom right button --> */}
          {isNewChat && !id ? (
            <SearchConversation />
          ) : (
            <NewChatButton newChat={() => setIsNewChat(!isNewChat)} />
          )}
        </div>
      </div>
    </section>
  );
};
