import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import "../Deck.css";

function DeckList() {
  const [allDecks, setAllDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { tokenInfo } = useContext(SessionContext);

  const fetchDecks = async () => {
    try {
      const response = await axios.get(
        `https://why-do-i-know-that.adaptable.app/decks/user/${tokenInfo.payload._id}`
      );
      if (response.status === 200) {
        setAllDecks(response.data);
        setFilteredDecks(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function filterList(search) {
    if (search.length > 0) {
      const copyArray = JSON.parse(JSON.stringify(allDecks));
      const updatedArray = copyArray.filter((deck) =>
        deck.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredDecks(updatedArray);
    } else {
      setFilteredDecks(allDecks);
    }
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
    filterList(event.target.value);
  };

  const handlePlayGame = () => {
    navigate(`/game/${tokenInfo.payload._id}`);
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <div className="mainList">
      <Link className="navButton" to="/createdeck">
        Create a new deck!
      </Link>
      {filteredDecks && filteredDecks.length > 0 && (
        <button className="navButton" onClick={handlePlayGame}>
          Play your game
        </button>
      )}

      <h1 className="largeFont fontBasics">Decklist</h1>
      <input
        className="search fontBasics inputG"
        type="text"
        name="search"
        placeholder="search"
        value={search}
        onChange={handleSearch}
      ></input>
      <div>
        {filteredDecks &&
          filteredDecks.map((deck) => (
            <Link key={deck._id} to={`/deckdetails/${deck._id}`}>
              <h2 className="fontBasics">{deck.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default DeckList;
