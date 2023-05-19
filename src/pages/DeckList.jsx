import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DeckList() {
  const [allDecks, setAllDecks] = useState([]);

  const fetchDecks = async () => {
    try {
      const response = await axios.get("http://localhost:5005/decks");
      if (response.status === 200) {
        setAllDecks(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <div>
      <h1>Decklist</h1>

      {allDecks.map((deck) => (
        <Link key={deck._id} to="/deckDetails">
          <h2>{deck.title}</h2>
        </Link>
      ))}
    </div>
  );
}

export default DeckList;
