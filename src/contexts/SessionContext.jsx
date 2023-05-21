import { createContext, useState } from "react";
import { useEffect } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async (currentToken) => {
    const response = await fetch("http://localhost:5005/auth/auth/verify", {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    if (response.status === 200) {
      const parsed = await response.json();
      setToken(currentToken);
      setIsLoggedIn(true);
      console.log(parsed);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    if (localToken) {
      verifyToken(localToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      setIsLoading(false);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const logout = () => {
    setToken();
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <SessionContext.Provider
        value={{ token, setToken, isLoggedin, isLoading, logout }}
      >
        {children}
      </SessionContext.Provider>
    </div>
  );
};

export default SessionContextProvider;
