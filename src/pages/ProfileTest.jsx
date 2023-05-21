import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";

function ProfileTest() {
 const { logout } = useContext(SessionContext)

  return  (
  
    <div>
      <h1>Profile</h1>
      <button type="button" onClick = {logout}>Log Out</button>
    </div>
  )
}

export default ProfileTest;
