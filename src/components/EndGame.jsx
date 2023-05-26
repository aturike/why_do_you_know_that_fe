import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import { useBoolean } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Confetti from "react-confetti";

function EndGame({ score, lives, gameId, gameUserName }) {
  const [userName, setuserName] = useState("");
  const { tokenInfo } = useContext(SessionContext);
  const [loginShow, setLoginShow] = useBoolean();
  const [signupShow, setsignupShow] = useBoolean();
  const [isSignedup, setisSignedup] = useState(false);

  useEffect(() => {
    if (tokenInfo && tokenInfo.payload) {
      setuserName(tokenInfo.payload.username);
    }
  }, [tokenInfo]);

  useEffect(() => {
    createHighscore();
  }, [tokenInfo]);

  const createHighscore = async () => {
    if (tokenInfo && tokenInfo.payload) {
      const sendHighscore = {
        userId: tokenInfo.payload._id,
        username: tokenInfo.payload.username,
        gameUserName: gameUserName,
        gameId: gameId,
        score: score,
      };
      try {
        await axios.post(
          "https://why-do-i-know-that.adaptable.app/leaderboard",
          sendHighscore
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (userName) {
    return (
      <div className="win-or-lose">
        {lives === 0 ? <h1>Lose {userName}!</h1> : <h1>Win {userName}!</h1>}
        <h2>
          Registered highscore: <br></br>
          <span>{score}</span> <br></br>on {gameUserName}`s game
        </h2>
        {lives !== 0 && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
      </div>
    );
  } else {
    return (
      <div className="win-or-lose">
        {lives === 0 ? <h1>Lose!</h1> : <h1>Win!</h1>}
        <h2>
          Unregistered highscore:<br></br>
          <span>{score}</span> <br></br> on {gameUserName}`s game!
        </h2>
        <h2>Do you want to register your score? Please login or Sign up</h2>
        {isSignedup && <h2>Sign up complete, please log in</h2>}
        <div className="win-lose-container">
          <button
            className="win-lose-btn"
            onClick={() => {
              setLoginShow.toggle();
              if (signupShow) {
                setsignupShow.toggle();
              }
            }}
          >
            Log in
          </button>
          <button
            className="win-lose-btn"
            onClick={() => {
              if (!isSignedup) {
                setsignupShow.toggle();
                if (loginShow) {
                  setLoginShow.toggle();
                }
              }
            }}
          >
            Sign up
          </button>
        </div>
        {loginShow && <LoginForm gameUserName={setuserName} />}
        {signupShow && (
          <SignUpForm
            setsignupShow={setsignupShow}
            setLoginShow={setLoginShow}
            setisSignedup={setisSignedup}
          />
        )}
      </div>
    );
  }
}

export default EndGame;
