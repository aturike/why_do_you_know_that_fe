import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Game.css";

function Game() {
  const [randomDecks, setrandomDecks] = useState([]);
  const [gameSet, setgameSet] = useState([]);
  const [score, setscore] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchRandomDeck();
  }, []);

  useEffect(() => {
    if (score === randomDecks.length && score !== 0) {
      navigate("/win");
    } else if (randomDecks.length !== 0) {
      console.log(score);
      gameCardsSelect(3);
    }
  }, [randomDecks, score]);

  const fetchRandomDeck = async () => {
    try {
      const { data } = await axios.get("http://localhost:5005/decks/random");

      setrandomDecks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const gameCardsSelect = (nrDisplayCards) => {
    const indexArr = [];
    const gameCardsDiv = [];

    const getRandomCardIndex = () => {
      const newIndex = Math.floor(Math.random() * randomDecks.length);

      if (indexArr.indexOf(newIndex) !== -1) {
        getRandomCardIndex();
      } else {
        indexArr.push(newIndex);
      }
    };

    for (let i = 0; i < nrDisplayCards; i++) {
      getRandomCardIndex();
    }

    const targetIndex = Math.floor(Math.random() * indexArr.length);
    const targetCard = randomDecks[score].cards[targetIndex];
    const gameCards = indexArr
      .filter((indexElement) => indexElement !== targetIndex)
      .map((element) => randomDecks[score].cards[element])
      .sort((a, b) => a.value - b.value);

    gameCards.push(targetCard);

    for (let i = 1; i <= nrDisplayCards * 2; i++) {
      if (i % 2 === 0) {
        const index = i / 2 - 1;
        gameCardsDiv.push(gameCards[index]);
      } else {
        gameCardsDiv.push({ _id: Math.random() * 1000 });
      }
    }

    setgameSet(gameCardsDiv);
  };

  function handleClick(event) {
    const diffIndex = parseInt(event.target.name);

    const [targetValue] = gameSet.slice(-1);
    const lowBound = gameSet[diffIndex - 1];
    const highBound = gameSet[diffIndex + 1];

    if (!lowBound && targetValue.value < highBound.value) {
      setscore(score + 1);
    } else if (
      highBound.value === targetValue.value &&
      targetValue.value > lowBound.value
    ) {
      setscore(score + 1);
    } else if (
      targetValue.value < highBound.value &&
      targetValue.value > lowBound.value
    ) {
      setscore(score + 1);
    } else {
      console.log("lose");
    }
  }

  return (
    <div>
      {randomDecks[score] ? (
        <div>
          <h3>{randomDecks[score].question}</h3>
          <div className="game-grid">
            {gameSet.map((element, index) => {
              if (element.value) {
                return (
                  <div key={element._id}>
                    <img style={{ height: "50px" }} src={element.img} />
                    <h2>{element.text}</h2>
                    <h4>{element.value}</h4>
                  </div>
                );
              } else {
                return (
                  <div key={element._id}>
                    <button onClick={handleClick} name={index}>
                      Click here{" "}
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default Game;
