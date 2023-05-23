import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import { useBoolean } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function EndGame({ score, lives, gameId }) {
  const [userName, setuserName] = useState("");
  const [creatorName, setcreatorName] = useState("main");
  const { tokenInfo } = useContext(SessionContext);
  const [loginShow, setLoginShow] = useBoolean();
  const [signupShow, setsignupShow] = useBoolean();

  useEffect(() => {
    if (tokenInfo && tokenInfo.payload) {
      setuserName(tokenInfo.payload.username);
    }
  }, []);

  useEffect(() => {
    createHighscore();
  }, []);

  const createHighscore = async () => {
    if (tokenInfo && tokenInfo.payload) {
      const sendHighscore = {
        userId: tokenInfo.payload._id,
        username: tokenInfo.payload.username,
        gameId: gameId,
        score: score,
      };
      try {
        await axios.post("http://localhost:5005/leaderboard", sendHighscore);

        if (gameId) {
          const { data } = await axios.get(
            `http://localhost:5005/auth/user/${gameId}`
          );
          setcreatorName(data.username);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (userName) {
    return (
      <div>
        {lives === 0 ? <h1>Lose {userName}!</h1> : <h1>Win {userName}!</h1>}
        <h2>
          Registered highscore: {score} on {creatorName}`s game
        </h2>
      </div>
    );
  } else {
    return (
      <div>
        {lives === 0 ? <h1>Lose!</h1> : <h1>Win!</h1>}
        <h2>
          Unregistered highscore: {score} on {creatorName}`s game
        </h2>
        <h2>Do you want to register your score? Please login or Sign up</h2>
        <button
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
          onClick={() => {
            setsignupShow.toggle();
            if (loginShow) {
              setLoginShow.toggle();
            }
          }}
        >
          Sign up
        </button>
        {loginShow && <LoginForm setuserName={setuserName} />}
        {signupShow && <SignUpForm setuserName={setuserName} />}
      </div>
    );
  }
}

export default EndGame;
