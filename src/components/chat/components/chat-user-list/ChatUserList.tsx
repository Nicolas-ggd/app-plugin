import { Link } from "react-router-dom";

import { UserProps } from "../../../user-auth/User.types";

type ChatUsersType = {
  userList: UserProps[];
};

export const ChatUserList = (props: ChatUsersType) => {
  return (
    <>
      {props.userList.map((item, index) => {
        return (
          <Link to={`/chat/${item?._id}`} key={index} className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
            <div className="flex items-center">
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
    </>
  );
};
