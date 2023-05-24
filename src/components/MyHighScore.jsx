import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

function MyHighScore() {
  const [myHighScoreList, setmyHighScoreList] = useState();
  const [gameHighscore, setgameHighscore] = useState();
  const { tokenInfo } = useContext(SessionContext);

  useEffect(() => {
    fetchMyHighScore();
  }, []);

  const fetchMyHighScore = async () => {
    const userId = tokenInfo.payload._id;
    try {
      const userScores = await axios.get(
        `https://why-do-i-know-that.adaptable.app/leaderboard/user/${userId}`
      );
      userScores.data.sort((a, b) => b.score - a.score).slice(0, 5);

      setmyHighScoreList(userScores.data);
      const gameScores = await axios.get(
        `https://why-do-i-know-that.adaptable.app/leaderboard/game/${userId}`
      );

      gameScores.data.sort((a, b) => b.score - a.score).slice(0, 5);

      setgameHighscore(gameScores.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (myHighScoreList && gameHighscore) {
    return (
      <div>
        <div>
          <h2>My Highscore</h2>
          <div>
            <ul>
              {myHighScoreList.map((highscore) => (
                <li key={highscore._id + "score"}>Score: {highscore.score}</li>
              ))}
            </ul>
            <ul>
              {myHighScoreList.map((highscore) => (
                <li key={highscore._id + "game"}>
                  On {highscore.gameUserName}`s game
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2>My Game`s Highscore</h2>
          <div>
            <ul>
              {gameHighscore.map((highscore) => (
                <li key={highscore._id + "score"}>{highscore.score}</li>
              ))}
            </ul>
            <ul>
              {gameHighscore.map((highscore) => (
                <li key={highscore._id + "user"}>by {highscore.username}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default MyHighScore;
