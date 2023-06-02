import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import InputModal from "../components/InputModal";
import { useWindowSize } from "@uidotdev/usehooks";

function IntroPage() {
  const windowProps = useWindowSize();

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

  if (windowProps.width < 750) {
    return (
      <Flex w={"100%"} h={"50dvh"} flexDir={"column"} justify={"center"}>
        <Text
          fontSize={{ base: "0.8rem", md: "1.5rem" }}
          lineHeight={"1.6rem"}
          mb={{ base: "0.2rem", md: "1.5rem" }}
          align={"center"}
          color={"white"}
        >
          Please turn your device to play the game
        </Text>
      </Flex>
    );
  } else {
    return (
      <div>
        <Flex
          flexDir={"column"}
          justify={"start"}
          align={"center"}
          color={"#f0f0f0"}
        >
          <Text
            fontSize={{ base: "0.8rem", md: "1.5rem" }}
            lineHeight={"1.6rem"}
            mb={{ base: "1.5rem", md: "3rem" }}
            w={"80%"}
            align={"center"}
          >
            Drag YOUR card where it fits in the series of the reference cards in
            an ascending order!
          </Text>
          <Flex
            w={{ base: "100%", md: "40%" }}
            justify={"center"}
            align={"center"}
            gap={"30px"}
            mb={{ base: "1.5rem", md: "3rem" }}
          >
            <Link className="btn" to={"/game"}>
              <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Play!</Text>
            </Link>
            <InputModal />
          </Flex>
          <Text
            fontSize={{ base: "1rem", md: "2.5rem" }}
            lineHeight={"1.6rem"}
            mb={{ base: "1.5rem", md: "2rem" }}
          >
            Who is older?
          </Text>
        </Flex>

        <Grid
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap={"5px"}
          pl={"10px"}
          p={"10px"}
        >
          <Flex justify={"center"}>
            <Card />
          </Flex>
          <Flex justify={"center"}>
            <Card element={firstCard} target={false} />
          </Flex>
          <Flex justify={"center"}>
            <Card />
          </Flex>
          <Flex justify={"center"}>
            <Card element={secondCard} target={false} />
          </Flex>
          <Flex justify={"center"}>
            <Card />
          </Flex>

          <Flex
            justify={"center"}
            style={{ gridColumnStart: "3", gridColumnEnd: "4" }}
            className="animate-pullcard"
          >
            <Card element={targetCard} target={true} />
          </Flex>
        </Grid>
      </div>
    );
  }
}

export default IntroPage;
