import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of user object
type User = {
  name: string | null;
  _id: string | null;
};

type UserContextType = {
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a custom hook to access the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Create a provider component to wrap app
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<User | null>(() => {
    // Initialize authUser from local storage if available
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Update local storage when authUser changes
    localStorage.setItem("authUser", JSON.stringify(authUser));
  }, [authUser]);

  return (
    <UserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </UserContext.Provider>
  );
};