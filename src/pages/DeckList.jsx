import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import "../styles/Deck.css";
import "../styles/Deck-Table.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
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

      <h1 className="largeFont fontBasics">Decks</h1>
      <input
        className="search fontBasics inputG"
        type="text"
        name="search"
        placeholder="search"
        value={search}
        onChange={handleSearch}
      ></input>
      <div className="chakra-table-style">
        <TableContainer className="fontBasics">
          <Table variant="unstyled">
            <TableCaption className="fontBasics">
              List of Playable Decks
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Question</Th>
                <Th isNumeric>Number of Cards</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredDecks &&
                filteredDecks.map((deck) => (
                  <Tr key={deck._id}>
                    <Link to={`/deckdetails/${deck._id}`}>
                      <Td className="fontBasics">{deck.title}</Td>
                    </Link>
                    <Td className="fontBasics">{deck.question}</Td>
                    <Td className="fontBasics" isNumeric>
                      {deck.cards.length}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default DeckList;
