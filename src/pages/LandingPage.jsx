import axios from "axios";
import NavBar from "../components/Navbar";

function LandingPage() {
  const fetchdata = async () => {
    const response = await axios.get("http://localhost:5005/decks");
    console.log(response);
  };

  fetchdata();

  return (
    <div>
      <NavBar />
    </div>
  );
}

export default LandingPage;
