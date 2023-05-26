import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gameCardsSelect from "../Hooks/gamedata";
import "../Game.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../components/Card";
import EndGame from "../components/EndGame";
import heart from "../assets/heart.svg";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Confetti from "react-confetti";

function Game() {
  const [randomDecks, setrandomDecks] = useState([]);
  const [gameSet, setgameSet] = useState([]);
  const [creatorName, setcreatorName] = useState("main");
  const [isConfetti, setIsConfetti] = useState(false);
  const [score, setscore] = useState(0);
  const [lives, setlives] = useState(3);
  const navigate = useNavigate();
  const timeout = 2000;
  const showNumberofCards = 3;
  const { userId } = useParams();

  useEffect(() => {
    fetchRandomDeck();
    fetchCreatorName();
  }, []);

  useEffect(() => {
    if ((score === randomDecks.length && score !== 0) || lives === 0) {
      setgameSet([]);
    } else if (randomDecks.length !== 0) {
      if (randomDecks[score].cards.length < showNumberofCards) {
        navigate("/");
      } else {
        setgameSet(
          gameCardsSelect(showNumberofCards, randomDecks, score, userId)
        );
      }
    }
    setIsConfetti(false);
  }, [randomDecks, score]);

  const fetchCreatorName = async () => {
    if (userId) {
      try {
        const { data } = await axios.get(
          `https://why-do-i-know-that.adaptable.app/auth/user/${userId}`
        );
        setcreatorName(data.username);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const reArrangeGame = (targetIndex) => {
    const updategameSet = [
      ...gameSet.slice(0, targetIndex),
      ...gameSet.slice(-1),
      ...gameSet.slice(targetIndex + 1, -1),
      ...gameSet.slice(targetIndex, targetIndex + 1),
    ];

    setgameSet(updategameSet);
    setIsConfetti(true);

    setTimeout(() => {
      setscore(score + 1);
    }, timeout);
  };

  const fetchRandomDeck = async () => {
    try {
      if (!userId) {
        const { data } = await axios.get(
          "https://why-do-i-know-that.adaptable.app/decks/random/admin"
        );
        setrandomDecks(data);
      } else {
        const { data } = await axios.get(
          `https://why-do-i-know-that.adaptable.app/decks/random/${userId}`
        );
        setrandomDecks(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      const diffIndex = parseInt(destination.droppableId.slice(0, 1));

      const [targetValue] = gameSet.slice(-1);
      const lowBound = gameSet[diffIndex - 1];
      const highBound = gameSet[diffIndex + 1];

      if (!lowBound && targetValue.value < highBound.value) {
        reArrangeGame(diffIndex);
      } else if (
        highBound.value === targetValue.value &&
        targetValue.value > lowBound.value
      ) {
        reArrangeGame(diffIndex);
      } else if (
        targetValue.value < highBound.value &&
        targetValue.value > lowBound.value
      ) {
        reArrangeGame(diffIndex);
      } else {
        setlives(lives - 1);
      }
    }
  };

  const renderHearts = (n) => {
    const heartArr = [];

    for (let i = 0; i < n; i++) {
      heartArr.push({ id: Math.floor(Math.random() * 1000) });
    }

    return heartArr;
  };

  if (randomDecks[score] && score < randomDecks.length && lives > 0) {
    return (
      <div>
        {isConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            initialVelocityY={{ min: 10, max: 30 }}
            // initialVelocityX={1000}
          />
        )}
        <div className="heart-div">
          {renderHearts(lives).map((life) => (
            <img
              className="heart-img"
              key={life.id}
              src={heart}
              alt="heart-icon"
            ></img>
          ))}
        </div>
        <DragDropContext onDragEnd={handleDropEnd}>
          <div>
            <div className="score-board">
              <Text fontSize={{ base: "2rem", md: "3.5rem" }}>
                Score:
                <span>
                  <Text fontSize={{ base: "1.5rem", md: "3rem" }}>{score}</Text>
                </span>
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2.7rem" }}>
                {randomDecks[score].question}
              </Text>
            </div>
            <SimpleGrid
              className="game-grid"
              templateColumns={{
                base: "repeat(5, 1fr)",
                md: "repeat(5, 1fr)",
              }}
            >
              {gameSet.map((element, index) => {
                if (element.value) {
                  if (index === gameSet.length - 1) {
                    return (
                      <Droppable
                        key={element._id}
                        droppableId={index + "target-column"}
                      >
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            w={{ base: "6.5rem", md: "12rem" }}
                            h={{ base: "8rem", md: "18rem" }}
                          >
                            <Draggable
                              key={element._id}
                              draggableId={element._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    w={{ base: "6.5rem", md: "12rem" }}
                                    h={{ base: "8rem", md: "18rem" }}
                                  >
                                    <Card
                                      isDragging={snapshot.isDragging}
                                      element={element}
                                      target={true}
                                    />
                                  </Box>
                                );
                              }}
                            </Draggable>
                            {provided.placeholder}
                          </Box>
                        )}
                      </Droppable>
                    );
                  } else {
                    return (
                      <Card
                        key={element._id}
                        element={element}
                        target={false}
                      />
                    );
                  }
                } else {
                  return (
                    <Droppable
                      droppableId={index + "index" + element._id}
                      key={element._id}
                    >
                      {(provided, snapshot) => {
                        return (
                          <Card
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            target={false}
                          >
                            {provided.placeholder}
                          </Card>
                        );
                      }}
                    </Droppable>
                  );
                }
              })}
            </SimpleGrid>
          </div>
        </DragDropContext>
      </div>
    );
  } else if (score === randomDecks.length && score !== 0) {
    return (
      <EndGame
        score={score}
        lives={lives}
        gameId={userId}
        gameUserName={creatorName}
      />
    );
  } else if (lives === 0) {
    return (
      <EndGame
        score={score}
        lives={lives}
        gameId={userId}
        gameUserName={creatorName}
      />
    );
  }
}

export default Game;
