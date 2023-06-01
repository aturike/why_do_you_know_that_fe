import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import InputModal from "../components/InputModal";

function IntroPage() {
  const firstCard = {
    text: "Maggie Simpson",
    value: 1,
    img: "https://bbts1.azureedge.net/images/p/full/2021/11/84cdc3c6-bc67-42b5-b2ce-e6f3667b54fa.jpg",
  };
  const secondCard = {
    text: "Grandpa Simpson",
    value: 83,
    img: "https://www.giantbomb.com/a/uploads/scale_small/0/6507/369043-abe_simpson.gif",
  };
  const targetCard = {
    text: "Homer Simpson",
    value: 38,
    img: "https://i.discogs.com/J4bH_-A4UcQHFSUBDyyqXbTzr7XWM8S0NfNoYgwXAiI/rs:fit/g:sm/q:90/h:400/w:400/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTE0MDAz/MTctMTMzNTcxNzQ3/Ni5wbmc.jpeg",
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
          Who is older?
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

      <Flex
        w={{ base: "100%", md: "40%" }}
        justify={"center"}
        align={"center"}
        gap={"30px"}
      >
        <Link className="btn" to={"/game"}>
          <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Play!</Text>
        </Link>
        <InputModal className="game-btn" />
      </Flex>
    </div>
  );
}

export default IntroPage;
