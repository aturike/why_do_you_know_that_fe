import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gameCardsSelect from "../Hooks/gamedata";
import "../styles/Game.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../components/Card";
import EndGame from "../components/EndGame";
import heart from "../assets/heart.svg";
import heart2 from "../assets/heart2.svg";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";
import NavBar from "../components/Navbar";
import ScoreBoard from "../components/ScoreBoard";
const { VITE_BACKEND_URL } = import.meta.env;

function Game() {
  const [randomDecks, setrandomDecks] = useState([]);
  const [gameSet, setgameSet] = useState([]);
  const [creatorName, setcreatorName] = useState("main");
  const [isConfetti, setIsConfetti] = useState(false);
  const [gridStyle, setGridStyle] = useState({
    gridColumnStart: "3",
    gridColumnEnd: "4",
    height: "100%",
  });
  const [score, setscore] = useState(0);
  const [lives, setlives] = useState(3);
  const navigate = useNavigate();
  const timeout = 2000;
  const showNumberofCards = 3;
  const { userId } = useParams();
  const windowProps = useWindowSize();

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
    setGridStyle({
      gridColumnStart: "3",
      gridColumnEnd: "4",
      height: "100%",
    });
  }, [randomDecks, score]);

  const fetchCreatorName = async () => {
    if (userId) {
      try {
        const { data } = await axios.get(
          VITE_BACKEND_URL + `/auth/user/${userId}`
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
    ];
    setGridStyle({
      height: "100%",
    });
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
          VITE_BACKEND_URL + "/decks/random/admin"
        );
        setrandomDecks(data);
      } else {
        const { data } = await axios.get(
          VITE_BACKEND_URL + `/decks/random/${userId}`
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
      <Box>
        {windowProps.height < 500 ? (
          <NavBar gameNav={true}>
            <ScoreBoard score={score} color={"white"}>
              {renderHearts(lives).map((life) => (
                <img
                  className="heart-img"
                  key={life.id}
                  src={heart2}
                  alt="heart-icon"
                ></img>
              ))}
            </ScoreBoard>
          </NavBar>
        ) : (
          <NavBar />
        )}
        {isConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            initialVelocityY={{ min: 10, max: 30 }}
          />
        )}

        <Box>
          <DragDropContext onDragEnd={handleDropEnd}>
            <div>
              <Text
                fontSize={{ base: "1rem", md: "1.7rem", lg: "2.7rem" }}
                align={"center"}
                color={"#f0f0f0"}
              >
                {randomDecks[score].question}
              </Text>
              {windowProps.height > 500 && (
                <ScoreBoard score={score} color={"grey"}>
                  {renderHearts(lives).map((life) => (
                    <img
                      className="heart-img"
                      key={life.id}
                      src={heart}
                      alt="heart-icon"
                    ></img>
                  ))}
                </ScoreBoard>
              )}

              <Grid
                templateColumns="repeat(5, 1fr)"
                templateRows="repeat(2, 1fr)"
                gap={"5px"}
                rowGap={"2dvh"}
                pl={"10px"}
                p={"10px"}
              >
                {gameSet.map((element, index) => {
                  if (typeof element.value === "number") {
                    if (element.target) {
                      return (
                        <Flex
                          key={element._id}
                          justify={"center"}
                          style={gridStyle}
                        >
                          <Droppable
                            key={element._id}
                            droppableId={index + "target-column"}
                          >
                            {(provided) => (
                              <Box
                                ref={provided.innerRef}
                                {...provided.droppableProps}
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
                        </Flex>
                      );
                    } else {
                      return (
                        <Flex justify={"center"} key={element._id}>
                          <Card element={element} target={false} />
                        </Flex>
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
                            <Flex justify={"center"}>
                              <Card
                                innerRef={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                                target={false}
                              >
                                {provided.placeholder}
                              </Card>
                            </Flex>
                          );
                        }}
                      </Droppable>
                    );
                  }
                })}
              </Grid>
            </div>
          </DragDropContext>
        </Box>
      </Box>
    );
  } else if (score === randomDecks.length && score !== 0) {
    return (
      <div>
        <NavBar />
        <EndGame
          score={score}
          lives={lives}
          gameId={userId}
          gameUserName={creatorName}
        />
      </div>
    );
  } else if (lives === 0) {
    return (
      <div>
        <NavBar />
        <EndGame
          score={score}
          lives={lives}
          gameId={userId}
          gameUserName={creatorName}
        />
      </div>
    );
  }
}

export default Game;
