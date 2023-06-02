import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

import "../styles/Deck.css";

function DeckDetails() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [thisDeck, setThisDeck] = useState();
  const { tokenInfo } = useContext(SessionContext);

  const fetchOneDeck = async () => {
    try {
      const response = await axios.get(
        `https://why-do-i-know-that.adaptable.app/decks/${deckId}`
      );
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
        `https://why-do-i-know-that.adaptable.app/decks/${deckId}`
      );
      if (response.status === 200) {
        setThisDeck(response.data);
        navigate(`/decklist/${tokenInfo.payload._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOneDeck();
  }, []);

  return thisDeck ? (
    <div className="mainDetails">
      <Link className="navButton" to={`/decklist/${tokenInfo.payload._id}`}>
        Back to the list
      </Link>
      <div className="cardDiv">
        <div className="centerText">
          <h1 className="largeFont fontBasics">Title: {thisDeck.title}</h1>
          <h2 className="fontBasics">Question: {thisDeck.question}</h2>
        </div>

        <div className="cardContainer">
          {thisDeck.cards.map((card) => (
            <div className="cardDetails" key={card._id}>
              <img className="deckImg" src={card.img} />
              <h3 className="fontBasics">Text: {card.text}</h3>
              <h3 className="fontBasics">Value: {card.value}</h3>
            </div>
          ))}
        </div>
      </div>
      <button className="navButton" onClick={handleDelete}>
        Delete this deck
      </button>
      <Link className="navButton" to={`/updatedeck/${deckId}`}>
        Edit this deck
      </Link>
    </div>
  ) : (
    <p>Loading data...</p>
  );
}

export default DeckDetails;
