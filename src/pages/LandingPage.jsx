import axios from "axios";
import { Link } from "react-router-dom";

function LandingPage() {
  const fetchdata = async () => {
    const response = await axios.get("http://localhost:5005/decks");
    console.log(response);
  };

  fetchdata();

  return (
    <div>
      <h1>WHY DO YOU KNOW THAT?!</h1>
      <Link to="/game">PLAY!</Link>
      <Link>Create you own game!</Link>
    </div>
  );
}

export default LandingPage;
