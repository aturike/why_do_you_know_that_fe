import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

import "../Deck.css";

function DeckDetails() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [thisDeck, setThisDeck] = useState();

  const [userId, setUserId] = useState("");

  const fetchOneDeck = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/decks/${deckId}`);
      if (response.status === 200) {
        setThisDeck(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5005/decks/${deckId}`
      );
      if (response.status === 200) {
        setThisDeck(response.data);
        navigate("/decklist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOneDeck();
  }, []);

  const { tokenInfo } = useContext(SessionContext);

  useEffect(() => {
    setUserId(tokenInfo.payload._id);
  }, []);

  return thisDeck ? (
    <div>
      <Link to={`/decklist/${userId}`}>Back to the list</Link>
      <div className="cardDiv">
        <h1>Title: {thisDeck.title}</h1>
        <h2>Question: {thisDeck.question}</h2>
        {thisDeck.cards.map((card) => (
          <div className="cardDiv" key={card._id}>
            <img src={card.img} />
            <h3>Text: {card.text}</h3>
            <h3>Value: {card.value}</h3>
          </div>
        ))}
      </div>
      <button onClick={handleDelete}>Delete this deck</button>
      <Link to={`/updatedeck/${deckId}`}>Edit this deck</Link>
    </div>
  ) : (
    <p>Loading data...</p>
  );
}

export default DeckDetails;
