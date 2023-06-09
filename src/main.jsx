// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import SessionContextProvider from "./contexts/SessionContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <SessionContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </SessionContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
