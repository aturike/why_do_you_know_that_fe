import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

function PrivateRoute({ children }) {
  const { isLoggedin, token, isLoading } = useContext(SessionContext);
    console.log(token)
  if (!isLoggedin && !isLoading) {
    return <Navigate to="/login" />;
  }

  

  return isLoading ? (
    <h1>You are not signed in</h1>
  ) : (
    <>
      <h1>{children}</h1>
    </>
  );
}

export default PrivateRoute;
