import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";
import NavBar from "../components/Navbar";
function Profile() {
  const { logout, tokenInfo } = useContext(SessionContext);

  return (
    <div>
      <NavBar />
      {tokenInfo.payload ? (
        <h1>Hello {tokenInfo.payload.username}</h1>
      ) : (
        <h1>Hello</h1>
      )}

      <button type="button" onClick={logout}>
        Log Out
      </button>
    </div>
  );
}

export default Profile;
