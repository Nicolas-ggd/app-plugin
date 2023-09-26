import { useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useUser } from "../../../user-auth/UserContext";
import { ConversationType } from "../../Chat.types";

type ChatConversationType = {
  children: React.ReactNode;
};

export const ChatConversation = (props: ChatConversationType) => {
  const [isType, setIsType] = useState<string>("");
  const [isMessage, setIsMessage] = useState<ConversationType[]>([]);
  const { authUser } = useUser();
  const { id } = useParams();

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
            message: isType,
            recipient: id || undefined,
          },
        ],
      } as const;

      await axios
        .post("http://localhost:8080/chat/create-conversation", conversation)
        .then((res) => {
          const data = res.data;
          setIsMessage(data);
        });
    } catch (err) {
      throw new Error();
    }

    setIsType("");
  };

  return (
    <div className="w-full h-full flex flex-col justify-between h-full">
      {props.children}
      <div className="bg-red-500">
        {isMessage?.map((item, index) => {
          return <div key={index}>{item?.messages[0]?.message}</div>;
        })}
      </div>
      <form className="w-full p-2" onSubmit={submitConversation}>
        <input
          type="text"
          id="text"
          className="bg-gray-50 px-2 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder="Message..."
          required
          value={isType}
          onChange={inputTyping}
        />
      </form>
    </div>
  );
};
