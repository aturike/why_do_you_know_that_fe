import { Flex, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";

function IntroPage() {
  const { userId } = useParams();

  const firstCard = {
    text: " 1st reference",
    value: 1,
    img: "/src/assets/intro-imgs/num1.png",
  };
  const secondCard = {
    text: " 2nd reference",
    value: 3,
    img: "/src/assets/intro-imgs/num3.png",
  };
  const targetCard = {
    text: " 1+1",
    value: 2,
    img: "/src/assets/intro-imgs/num2.png",
  };

  return (
    <div className="landing-page-section">
      <Flex
        className="directions"
        w={{ base: "90%", md: "80%" }}
        flexDir={"column"}
        justify={"start"}
      >
        <Text
          fontSize={{ base: "0.8rem", md: "1.5rem" }}
          lineHeight={"1.6rem"}
          mb={{ base: "0.2rem", md: "1.5rem" }}
        >
          You will see two rows of cards. The first row contains the reference
          cards, the second the target card.
        </Text>
        <Text
          fontSize={{ base: "0.8rem", md: "1.5rem" }}
          lineHeight={"1.6rem"}
          mb={{ base: "1.5rem", md: "1.5rem" }}
        >
          You have to guess where the target card fits in the series of the
          reference cards in ascending order!
        </Text>
        <Text fontSize={{ base: "1rem", md: "2.5rem" }} lineHeight={"1.6rem"}>
          Which number is bigger?
        </Text>
      </Flex>

      <div className="preview-container">
        <div className="question-mark animate-flicker">
          <Text fontSize={{ base: "3rem", md: "7rem" }}>?</Text>
        </div>
        <Card element={firstCard} target={false} />
        <div className="question-mark animate-flicker">
          <Text fontSize={{ base: "3rem", md: "7rem" }}>?</Text>
        </div>
        <Card element={secondCard} target={false} />
        <div className="question-mark animate-flicker">
          <Text fontSize={{ base: "3rem", md: "7rem" }}>?</Text>
        </div>
      </div>
      <div className="animate-pullcard">
        <Card element={targetCard} target={true} />
      </div>
      {userId === "main" ? (
        <Link className="btn" to={"/game"}>
          <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Play!</Text>
        </Link>
      ) : (
        <Link className="btn" to={"/game/" + { userId }}>
          <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Play!</Text>
        </Link>
      )}
    </div>
  );
}

export default IntroPage;
