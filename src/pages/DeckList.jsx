import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DeckList() {
  const [allDecks, setAllDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [search, setSearch] = useState("");

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
    </div>
  );
}

export default DeckList;
