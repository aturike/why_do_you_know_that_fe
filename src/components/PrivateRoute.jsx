import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

function PrivateRoute({ children }) {
  const { isLoggedin, isLoading } = useContext(SessionContext);

  if (!isLoggedin && !isLoading) {
    return <Navigate to="/login" />;
  }

  return isLoading ? <h1>You are not signed in</h1> : <div>{children}</div>;
}

export default PrivateRoute;
