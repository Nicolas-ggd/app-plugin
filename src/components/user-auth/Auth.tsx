import { useState } from "react";

import { SignIn } from "./user-signin/SignIn";
import { SignUp } from "./user-signup/SignUp";

export const Auth = () => {
  const [isAuth, setIsAuth] = useState<Boolean>(true);

  const toggleAuth = () => {
    setIsAuth((prevIsAuth) => !prevIsAuth);
  };

  return (
    <>
      {isAuth ? (
        <SignIn
          closeSignIn={toggleAuth}
        />
      ) : (
        <SignUp
          closeSignUp={toggleAuth}
        />
      )}
    </>
  );
};
