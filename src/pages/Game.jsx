import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gameCardsSelect from "../Hooks/gamedata";
import "../Game.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Game() {
  const [randomDecks, setrandomDecks] = useState([]);
  const [gameSet, setgameSet] = useState({
    cards: [],
    columns: { firstcolumn: { id: "column-1" } },
    columnsOrder: [],
  });
  const [score, setscore] = useState(0);
  //to test lives = 100
  const [lives, setlives] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomDeck();
  }, []);

  useEffect(() => {
    if (lives === 0) {
      navigate("/lose");
    }
  }, [lives]);

  useEffect(() => {
    if (score === randomDecks.length && score !== 0) {
      navigate("/win");
    } else if (randomDecks.length !== 0) {
      setgameSet({ ...gameSet, cards: gameCardsSelect(3, randomDecks, score) });
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

  function handleClick(event) {
    const diffIndex = parseInt(event.target.name);

    const [targetValue] = gameSet.cards.slice(-1);
    const lowBound = gameSet.cards[diffIndex - 1];
    const highBound = gameSet.cards[diffIndex + 1];

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
      setlives(lives - 1);
    }
  }

  const handleDropEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    } else {
      console.log(result);

      // const diffIndex = destination.index;

      // const [targetValue] = gameSet.cards.slice(-1);
      // const lowBound = gameSet.cards[diffIndex - 1];
      // const highBound = gameSet.cards[diffIndex + 1];

      // if (!lowBound && targetValue.value < highBound.value) {
      //   console.log("");
      //   setscore(score + 1);
      // } else if (
      //   highBound.value === targetValue.value &&
      //   targetValue.value > lowBound.value
      // ) {
      //   setscore(score + 1);
      // } else if (
      //   targetValue.value < highBound.value &&
      //   targetValue.value > lowBound.value
      // ) {
      //   setscore(score + 1);
      // } else {
      //   setlives(lives - 1);
      // }
    }
  };

  return (
    <div>
      {randomDecks[score] ? (
        <DragDropContext onDragEnd={handleDropEnd}>
          <div>
            <h4>Score: {score}</h4>
            <h3>{randomDecks[score].question}</h3>
            <Droppable droppableId={gameSet.columns.firstcolumn.id}>
              {(provided) => (
                <div
                  className="game-grid"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {gameSet.cards.map((element, index) => {
                    if (element.value) {
                      if (index === gameSet.cards.length - 1) {
                        return (
                          <Draggable
                            key={element._id}
                            draggableId={element._id}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <div
                                  className="Card"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    style={{ height: "50px" }}
                                    src={element.img}
                                  />
                                  <h2>{element.text}</h2>
                                  <h4>{element.value}</h4>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      } else {
                        return (
                          <Draggable
                            key={element._id}
                            draggableId={element._id}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <div
                                  className="Card"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    style={{ height: "50px" }}
                                    src={element.img}
                                  />
                                  <h2>{element.text}</h2>
                                  <h4>{element.value}</h4>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      }
                    } else {
                      return (
                        <Droppable
                          droppableId={"first" + element._id}
                          key={element._id}
                          index={index}
                        >
                          {(provided) => {
                            return (
                              <div
                                className="Card"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                <button onClick={handleClick} name={index}>
                                  Click here{" "}
                                </button>
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
                      );
                    }
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default Game;
