import React, { createContext, useEffect, useState } from "react";

// ✅ User type
interface userDetailsTypes {
  email: string;
  password: string;
}

// ✅ Context type
interface storedUserDataTypes {
  userDetails: userDetailsTypes;
  setUserDetails: React.Dispatch<React.SetStateAction<userDetailsTypes>>;
  logout: () => void;
}

// ✅ Initial user
const initialUserDetails: userDetailsTypes = {
  email: "Demo@gamil.com",
  password: "Demo@123.",
};

// ✅ Create Context
export const storedUserData = createContext<storedUserDataTypes | null>(null);

// ✅ Props type
type childrenType = {
  children: React.ReactNode;
};

// ✅ Provider Component
const AuthContext = ({ children }: childrenType) => {
  const [userDetails, setUserDetails] =
    useState<userDetailsTypes>(initialUserDetails);

  // ✅ Load from localStorage (on first load)
  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");

    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Save to localStorage (whenever user changes)
  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  // ✅ Logout function
  const logout = () => {
    setUserDetails(initialUserDetails);
    localStorage.removeItem("userDetails");
    window.location.href = "/";
  };

  return (
    <storedUserData.Provider
      value={{ userDetails, setUserDetails, logout }}
    >
      {children}
    </storedUserData.Provider>
  );
};

export default AuthContext;