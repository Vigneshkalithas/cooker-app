import React, { createContext, useState, useEffect } from "react";
import { Config } from "./Config/Config";

export const MyContext = createContext("");

const AppContext = ({ children }) => {
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log(user);
      fetch(`${Config}/user/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => setUserRole(data.role));
    }
  }, [isAuthenticated]);
  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default AppContext;