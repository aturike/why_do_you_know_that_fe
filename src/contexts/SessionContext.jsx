import { createContext, useState } from "react";
import { useEffect } from "react";



export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  
const verifyToken = async () => {
    const response = await fetch('http://localhost:5005/auth/auth/verify')
}


  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    if (localToken) {

      setToken(localToken);
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, []);

  useEffect (() => {
    if(token){
        localStorage.setItem("authToken", token);
       // setIsLoggedIn(true)
    }else{
        localStorage.removeItem("authToken")
        //setIsLoggedIn(false)
    }
  }, [token])
  
  

  return (
    <div>
      <SessionContext.Provider value={{ token, setToken, isLoggedin, isLoading }}>
        {children}
      </SessionContext.Provider>
    </div>
  );
};

export default SessionContextProvider;
