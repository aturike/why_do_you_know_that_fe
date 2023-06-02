import { Text, Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <Box className="landing-page-section">
      <Flex
        className="landing-directions"
        w={{ base: "90%", md: "65%" }}
        flexDir={"column"}
        justify={"center"}
      >
        <Text
          fontSize={{ base: "1rem", lg: "1.5rem" }}
          lineHeight={{ base: "2rem", lg: "2.5rem" }}
        >
          "Why do You know that" is a captivating online card game that
          stimulates critical thinking as players evaluate and rank a diverse
          range of intriguing scenarios, offering an intellectually engaging and
          enjoyable experience.
        </Text>
      </Flex>
      <Link className="btn" to={"/intro-game"}>
        <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Play!</Text>
      </Link>
      <Flex
        className="team"
        fontSize={{ base: "0.8rem", lg: "1rem" }}
        gap={"20px"}
      >
        <h3>Adam Turi</h3>
        <h3>Dani Bravo</h3>
        <h3>August Colonna</h3>
      </Flex>
    </Box>
  );
}

export default LandingPage;
