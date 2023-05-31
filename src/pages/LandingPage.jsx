import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page-section">
      <Link className="btn" to={"/intro-game"}>
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
