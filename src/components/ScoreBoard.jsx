import { Flex, Text } from "@chakra-ui/react";

function ScoreBoard({ children, score, color }) {
  return (
    <Flex
      align={"center"}
      justify={{ base: "center", md: "end" }}
      fontSize={{ base: "0.8rem", md: "0.8rem", lg: "1.5rem" }}
      gap={"10px"}
      p={{ base: "5px", lg: "10px" }}
      mr={"3dvw"}
    >
      <Text color={color}>Lives:</Text>
      <Flex gap={"5px"} mr={"2dvw"}>
        {children}
      </Flex>
      <Text color={color}>Score:</Text>
      <Text color={"#5800ff"}>{score}</Text>
    </Flex>
  );
}

export default ScoreBoard;
