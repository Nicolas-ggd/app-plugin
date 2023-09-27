import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useUser } from "../UserContext";
import { AuthUser } from "../Auth.types";

interface SignUpProps {
  closeSignIn: () => void;
}

export const SignIn = (props: SignUpProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser>({
    name: "",
  });
  const navigate = useNavigate();
  const { setAuthUser } = useUser();

  const submitSignInData = async (e: FormEvent<HTMLFormElement>) => {
    if (user?.name?.length === 0) {
      return setIsError(true);
    }

    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8080/auth", {
          name: user?.name,
        })
        .then((res: any) => {
          const data = res.data;
          console.log(data)
          setAuthUser((prevAuthUser) => ({
            ...prevAuthUser,
            _id: data._id,
            name: data.name,
          }));
          localStorage.setItem('access_token', data?.access_token);
          navigate("/chat");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center antialiased bg-gray-50 text-gray-600 min-h-screen p-4">
      <div className="h-full">
        <div className="relative max-w-[340px] mx-auto bg-white shadow-lg rounded-lg">
          <form
            onSubmit={submitSignInData}
            className="flex justify-center flex-col w-full p-4"
          >
            <h1 className="text-center">Sign In</h1>
            <div className="px-2 flex flex-col">
              <label className="">Your name</label>
              <input
                type="text"
                className="rounded-full bg-gray-200 my-2 p-2 outline-none w-full"
                placeholder="Your name"
                onChange={(e) => {
                  setUser((prevSendData) => ({
                    ...prevSendData,
                    name: e.target.value,
                  }));
                }}
              />
              {isError && (
                <span className="text-red-400 my-2">Fill user name</span>
              )}
              <p className="block mb-2 text-sm font-medium text-dark text-gray-900 dark:text-white">
                Don't have an account yet?{" "}
                <a
                  onClick={props.closeSignIn}
                  className="font-medium text-sky-400 hover:text-sky-700 transition duration-200 hover:underline dark:text-primary-500 cursor-pointer outline-none"
                >
                  Sign up
                </a>
              </p>
            </div>
            <button
              type="submit"
              className="rounded-full bg-cyan-400 p-2 text-white hover:bg-cyan-500 transition duration-200 w-full"
            >
              Sing In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
