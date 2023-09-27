import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

import Aos from "aos";

import { useUser } from "../../../user-auth/UserContext";
import { ChatUserList } from "../chat-user-list/ChatUserList";

import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";

import "aos/dist/aos.css";

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
      await axios
        .get(
          `http://localhost:8080/user/search-user?value=${isSearch}&userId=${authUser?._id}`
        )
        .then((res) => {
          const data = res.data;
          setIsChat(data);
          console.log(data);
        });
    } catch (err) {
      throw new Error();
    }
  };

  useEffect(() => {
    searchChatConversation();
  }, [isSearch]);

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="px-4">
      <div className="flex items-center justify-center py-2">
        <h3 className="text-gray-900">Search user to start conversation!</h3>
      </div>

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
      {isChat?.length === 0 && (
        <div data-aos="fade-right" className="p-2 flex flex-col w-full mt-5">
          <div className="flex justify-center py-4">
            <ChatIcon
              className="text-cyan-500 animate-pulse"
              style={{ fontSize: "70px" }}
            />
          </div>
          <p className="text-gray-700 text-center">No chat found yet!</p>
        </div>
      )}
      {isChat && <ChatUserList userList={isChat} />}
    </div>
  );
};
