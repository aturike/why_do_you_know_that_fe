import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import "../styles/Deck.css";
import "../styles/Deck-Table.css";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import ShareModal from "../components/ShareModal";
const { VITE_BACKEND_URL } = import.meta.env;

function DeckList() {
  const [allDecks, setAllDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { tokenInfo } = useContext(SessionContext);

  const fetchDecks = async () => {
    try {
      const response = await axios.get(
        VITE_BACKEND_URL + `/decks/user/${tokenInfo.payload._id}`
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

  const handleDelete = async (deckid) => {
    try {
      const response = await axios.delete(
        VITE_BACKEND_URL + `/decks/${deckid}`
      );
      if (response.status === 200) {
        fetchDecks()
      }
    } catch (error) {
      console.log(error);
    }
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
        <div>
          <button className="navButton" onClick={handlePlayGame}>
            Play your game
          </button>
          <ShareModal gameId={tokenInfo.payload._id} />
        </div>
      )}

      <h1 className="largeFont fontBasics">Decks</h1>
      <input
        className="search fontBasics inputG"
        type="text"
        name="search"
        placeholder="search"
        value={search}
        onChange={handleSearch}
      ></input>
      <div className="deckInfo-Container">
        {filteredDecks &&
          filteredDecks.map((deck) => (
            <div className="deckInformation" key={deck._id}>
              <div className="deckInfo-first">
                <Link to={`/deckdetails/${deck._id}`}>
                  <h1 className="deckFontClass">{deck.title}</h1>
                </Link>
                <h2 className="fontBasics">{deck.question}</h2>
                {/* <h2 className="fontBasics" isNumeric>
                      {deck.cards.length}
                    </h2> */}
                <hr className="hr-style"></hr>
              </div>
              <div className="editDeck-btn">
                <EditIcon
                  onClick={() => {
                    navigate(`/updatedeck/${deck._id}`);
                  }}
                  w={5}
                  h={5}
                  color="white"
                />
                <DeleteIcon
                  onClick={() => {
                    handleDelete(deck._id);
                  }}
                  w={5}
                  h={5}
                  color="white"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DeckList;
