import { useState, FormEvent } from "react";
import axios from "axios";

import { AuthUser } from "../Auth.types";

interface SignUpProps {
  closeSignUp: () => void;
}

export const SignUp = (props: SignUpProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser>({
    name: "",
  });

  const submitSignUpData = async (e: FormEvent<HTMLFormElement>) => {
    if (user?.name?.length === 0) {
      return setIsError(true);
    }

    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8080/register", {
          name: user?.name,
        })
        .then((res) => {
          const data = res.data;
          props.closeSignUp();
          console.log(data);
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
            onSubmit={submitSignUpData}
            className="flex justify-center flex-col w-full p-4"
          >
            <h1 className="text-center">Sign Up</h1>
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
              <p className="block mb-2 text-sm font-medium dark:text-white">
                Already have an account?{" "}
                <a
                  onClick={props.closeSignUp}
                  className="font-medium text-sky-400 hover:text-sky-700 transition duration-200 text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                >
                  Sign in here
                </a>
              </p>
            </div>
            <button
              type="submit"
              className="rounded-full bg-cyan-400 p-2 text-white hover:bg-cyan-500 transition duration-200 w-full"
            >
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
