import { createContext, useState } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
    const [token, setToken] = useState('')

    return <SessionContext.Provider value={{token, setToken}}>{children}</SessionContext.Provider>
}

export default SessionContextProvider;