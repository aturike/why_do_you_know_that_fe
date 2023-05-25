import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";
import MyHighScore from "../components/MyHighScore";
import "../App.css";
function Profile() {
  const { logout, tokenInfo } = useContext(SessionContext);

  return (
    <div className="mainProfile">
      {tokenInfo.payload ? (
        <h1 className="profileText largeFont">
          Hello {tokenInfo.payload.username}
        </h1>
      ) : (
        <h1 className="profileText">Hello</h1>
      )}

      <MyHighScore />

      <button className="profileButton" type="button" onClick={logout}>
        Log Out
      </button>
    </div>
  );
}

export default Profile;
