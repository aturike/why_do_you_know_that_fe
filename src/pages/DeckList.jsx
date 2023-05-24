import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";

function DeckList() {
  const [allDecks, setAllDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { tokenInfo } = useContext(SessionContext);

  const fetchDecks = async () => {
    try {
      const response = await axios.get("http://localhost:5005/decks");
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
    <div>
      <h1>Decklist</h1>
      <Link to="/createdeck">Create a new deck!</Link>
      <hr />
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleSearch}
      ></input>
      <hr />
      {filteredDecks.map((deck) => (
        <Link key={deck._id} to={`/deckdetails/${deck._id}`}>
          <h2>{deck.title}</h2>
        </Link>
      ))}
      <button onClick={handlePlayGame}>Play your game</button>
    </div>
  );
}

export default DeckList;
