import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page-section">
      <Box className="directions" w={{ base: "80%", md: "60%" }}>
        <Text fontSize={{ base: "0.8rem", md: "1.5rem" }}>
          There will be 3 cards placed in front of you - the task is to guess
          which order they should be in, based off of the scores, images, and
          titles. Make sense? Give it a try!
        </Text>
      </Box>
      <div className="preview-container">
        <div className="question-mark animate-flicker">
          <Text fontSize={{ base: "3rem", md: "7rem" }}>?</Text>
        </div>
        <div className="card-preview one">
          <h1>1</h1>
        </div>
        <div className="question-mark animate-flicker">
          <Text fontSize={{ base: "3rem", md: "7rem" }}>?</Text>
        </div>
        <div className="card-preview three">
          <h1>3</h1>
        </div>
        <div className="question-mark animate-flicker">
          <Text fontSize={{ base: "3rem", md: "7rem" }}>?</Text>
        </div>
      </div>
      <div className="card-preview bottom-card animate-pulse">
        <h1>2</h1>
      </div>
      <Link className="btn" to={"/game"}>
        <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Play!</Text>
      </Link>
      <div className="team">
        <h3>Adam Turi</h3>
        <h3>Dani Bravo</h3>
        <h3>August Colonna</h3>
      </div>
    </div>
  );
}

export default LandingPage;
