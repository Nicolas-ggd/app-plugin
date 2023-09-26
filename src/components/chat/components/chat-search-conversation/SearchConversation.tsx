import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

import { useUser } from "../../../user-auth/UserContext";

import SearchIcon from "@mui/icons-material/Search";

import { ChatUserList } from "../chat-user-list/ChatUserList";

export const SearchConversation = () => {
  const [isSearch, setIsSearch] = useState("");
  const [isChat, setIsChat] = useState<[] | null>();
  const { authUser } = useUser();

  const inputeTyping = (e: FormEvent<HTMLInputElement>) => {
    setIsSearch(e.currentTarget.value);
  };

  const submitSearchResult = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearch("");
  };

  const searchChatConversation = async () => {
    if (isSearch.trim() === "") {
        setIsChat([]);
    }

    try {
      await axios.get(
        `http://localhost:8080/user/search-user?value=${isSearch}&userId=${authUser?._id}`
      )
      .then((res) => {
        const data = res.data;
        setIsChat(data)
        console.log(data)
      })
    } catch (err) {
      throw new Error();
    }
  };

  useEffect(() => {
    searchChatConversation();
  }, [isSearch]);

  return (
    <div className="px-4">
      <form
        onSubmit={submitSearchResult}
        className="flex items-center relative"
      >
        <div className="absolute m-2">
          <SearchIcon />
        </div>
        <input
          type="text"
          id="text"
          className="bg-gray-50 px-8 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder="Search conversation..."
          required
          value={isSearch}
          onChange={inputeTyping}
        />
      </form>
      {isChat && <ChatUserList userList={isChat} />}
    </div>
  );
};
