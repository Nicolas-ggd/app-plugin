import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useUser } from "../../../user-auth/UserContext";
import { UserProps } from "../../../user-auth/User.types";
import socket from "../../../../api/socket";

import Aos from "aos";
import "aos/dist/aos.css";

type ChatUsersType = {
  userList: UserProps[];
};

export const ChatUserList = (props: ChatUsersType) => {
  const { authUser } = useUser();

  useEffect(() => {
    Aos.init();
  }, []);

  const joinUserInConversation = () => {
    socket.emit("join-user", authUser?._id);
  };

  return (
    <div className="p-4">
      {props.userList.map((item, index) => {
        return (
          <Link onClick={joinUserInConversation} data-aos="fade-right" to={`/chat/${item?._id}`} key={index} className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
            <div className="flex items-center bg-gray-200 p-3 rounded-md">
              <img
                className="rounded-full items-start flex-shrink-0 mr-3"
                src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                width="32"
                height="32"
                alt="Marie Zulfikar"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{item?.name}</h4>
                <div className="text-[13px]">The video chat ended · 2hrs</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
