import axios from "axios";

function LandingPage() {
  const fetchdata = async () => {
    const response = await axios.get("http://localhost:5005/decks");
    console.log(response);
  };

  fetchdata();

  return <div>Landing Page</div>;
}

export default LandingPage;
