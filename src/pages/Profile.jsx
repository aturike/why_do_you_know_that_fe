import { SessionContext } from "../contexts/SessionContext";
import { useContext, useEffect } from "react";
import NavBar from "../components/Navbar";
function Profile() {
  const { logout } = useContext(SessionContext);
  
  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    if (localToken) {
      console.log(localToken)
    }
  }, []);


  return (
    <div>
      <NavBar />
      <h1>Profile</h1>
      <button type="button" onClick={logout}>
        Log Out
      </button>
    </div>
  );
}

export default Profile;
