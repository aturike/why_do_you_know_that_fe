import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";
import MyHighScore from "../components/MyHighScore";
function Profile() {
  const { logout, tokenInfo } = useContext(SessionContext);

  return (
    <div>
      {tokenInfo.payload ? (
        <h1>Hello {tokenInfo.payload.username}</h1>
      ) : (
        <h1>Hello</h1>
      )}

      <button type="button" onClick={logout}>
        Log Out
      </button>

      <MyHighScore />
    </div>
  );
}

export default Profile;
