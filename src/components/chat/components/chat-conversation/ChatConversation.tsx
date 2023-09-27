import { useState, FormEvent, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useUser } from "../../../user-auth/UserContext";
import { ChatType } from "../../Chat.types";
import { ConversationType } from "../../Chat.types";
import { ConversationResponse } from "../../Chat.types";
import { useOnScreen } from "../../../../hooks/useOnScreen";
import socket from "../../../../api/socket";

import SendIcon from "@mui/icons-material/Send";

type ConversationDescribe = ConversationType | ConversationResponse;

const initialConversationResponse: ConversationDescribe = {
  messages: [],
};

export const ChatConversation = (props: ChatType) => {
  const [isType, setIsType] = useState<string>("");
  const [isMessage, setIsMessage] = useState(initialConversationResponse);
  const { authUser } = useUser();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const isLoading = useRef(null);
  const isOnScreen = useOnScreen(isLoading);

  const inputTyping = (e: FormEvent<HTMLInputElement>) => {
    setIsType(e.currentTarget.value);
  };

  const submitConversation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const conversation: ConversationType = {
        participants: [authUser?._id!, id],
        messages: [
          {
            sender: authUser?._id || undefined,
            message: isType || undefined,
            recipient: id || undefined,
          },
        ],
      } as const;

      socket.emit("new-message", conversation);
    } catch (err) {
      throw new Error();
    }

    setIsType("");
  };

  useEffect(() => {
    socket.on("new-message-received", (data) => {
      setIsMessage((prevData: ConversationResponse) => {
        return {
          messages: [...prevData.messages, ...data?.messages],
        };
      });
    });

    return () => {
      socket.off("new-message-received");
    };
  }, []);

  const getConversation = async () => {
    await axios
      .get(
        `http://localhost:8080/chat/get-conversation?senderId=${
          authUser?._id
        }&recipientId=${id}&page=${currentPage + 1}`
      )
      .then((res) => {
        const data = res.data;
        setIsMessage((prevData: ConversationResponse) => {
          return {
            messages: [...prevData.messages, ...data?.messages],
          };
        });
        setCurrentPage(currentPage + 1);
        setLoadMore(false);
        console.log(data, "davita");
      });
  };

  useEffect(() => {
    if (isOnScreen) {
      setLoadMore(true);
    }
  }, [isOnScreen]);

  useEffect(() => {
    if (loadMore) {
      getConversation();
    }
  }, [loadMore]);

  return (
    <div className="w-full h-full flex flex-col justify-between h-full">
      {props.children}

      <div className="overflow-scroll">
        {isMessage?.messages?.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50"
            >
              <div className="flex items-center bg-gray-200 p-3 rounded-md w-60 ml-4">
                <img
                  className="rounded-full items-start flex-shrink-0 mr-3"
                  src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                  width="32"
                  height="32"
                  alt="Marie Zulfikar"
                />
                <div>
                  <div className="text-[13px]">{item?.message}</div>
                </div>
              </div>
            </div>
          );
        })}
        <span ref={isLoading}></span>
      </div>
      <form
        className="w-full p-2 relative flex items-center"
        onSubmit={submitConversation}
      >
        <input
          type="text"
          id="text"
          className="bg-gray-50 px-2 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder="Message..."
          required
          value={isType}
          onChange={inputTyping}
        />
        <button type="submit" className="absolute right-6">
          <SendIcon className="text-cyan-500 animate-pulse" />
        </button>
      </form>
    </div>
  );
};
