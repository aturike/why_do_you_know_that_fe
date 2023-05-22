import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";
import NavBar
 from "../components/Navbar";
function Profile() {
 const { logout } = useContext(SessionContext)

  return  (
  
    <div>
      <NavBar />
      <h1>Profile</h1>
      <button type="button" onClick = {logout}>Log Out</button>
    </div>
  )
}

export default Profile;
