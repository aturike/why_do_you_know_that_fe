import axios from "axios";
import { createContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { VITE_BACKEND_URL } = import.meta.env;

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenInfo, setTokenInfo] = useState({});

  const navigate = useNavigate();

  const verifyToken = async (currentToken) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    };
    const response = await axios.get(
      VITE_BACKEND_URL + "/auth/verify",
      headers
    );
    if (response.status === 200) {
      setToken(currentToken);
      setIsLoggedIn(true);
      setTokenInfo(response.data);
    }
    setIsLoading(false);
  };

  //This is out of the useEffect in order to log in after winning/losing the game
  const localToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (localToken) {
      verifyToken(localToken);
    }
  }, [localToken]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      setIsLoading(false);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const logout = () => {
    setToken();
    setTokenInfo();
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <SessionContext.Provider
        value={{
          token,
          setToken,
          isLoggedin,
          isLoading,
          logout,
          tokenInfo,
        }}
      >
        {children}
      </SessionContext.Provider>
    </div>
  );
};

export default SessionContextProvider;
