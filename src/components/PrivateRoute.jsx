import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";


function PrivateRoute() {
  
  const {isLoggedin, isLoading} = useContext(SessionContext)

  if(!isLoggedin && !isLoading){
    return <Navigate to='/login' />
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1>Profile</h1>
    </>
  )
}

export default PrivateRoute;