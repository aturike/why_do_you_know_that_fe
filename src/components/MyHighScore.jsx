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
    const isAdmin = tokenInfo.payload.isAdmin;

    try {
      const userScores = await axios.get(
        `https://why-do-i-know-that.adaptable.app/leaderboard/user/${userId}`
      );

      const sliceduserScores = userScores.data
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      setmyHighScoreList(sliceduserScores);

      if (isAdmin) {
        const gameScores = await axios.get(
          `https://why-do-i-know-that.adaptable.app/leaderboard/game/admin`
        );

        const slicedGameScores = gameScores.data
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);
        setgameHighscore(slicedGameScores);
      } else {
        const gameScores = await axios.get(
          `https://why-do-i-know-that.adaptable.app/leaderboard/game/${userId}`
        );
        const slicedGameScores = gameScores.data
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);
        setgameHighscore(slicedGameScores);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (myHighScoreList && gameHighscore) {
    return (
      <div className="profileText">
        <div>
          <h2 className="mainText">My Highscore</h2>
          <div className="columns">
            <ul className="listed">
              {myHighScoreList.map((highscore) => (
                <li key={highscore._id + "score"}>
                  Score: {highscore.score} -
                </li>
              ))}
            </ul>
            <ul className="listed">
              {myHighScoreList.map((highscore) => (
                <li className="listElement" key={highscore._id + "game"}>
                  On {highscore.gameUserName}`s game
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="mainText">My Game's Highscore</h2>
          <div className="columns">
            <ul className="listed">
              {gameHighscore.map((highscore) => (
                <li key={highscore._id + "score"}>
                  Score: {highscore.score} -
                </li>
              ))}
            </ul>
            <ul className="listed">
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
