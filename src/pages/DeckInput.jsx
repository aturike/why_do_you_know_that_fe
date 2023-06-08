import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import "../styles/Deck.css";
import CardForm from "../components/CardForm";
const { VITE_BACKEND_URL } = import.meta.env;

function DeckInput({ create }) {
  const defaultImg =
    "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image-300x225.jpg";
  let cardDef = [
    { text: "", value: 0, img: defaultImg },
    { text: "", value: 0, img: defaultImg },
    { text: "", value: 0, img: defaultImg },
    { text: "", value: 0, img: defaultImg },
    { text: "", value: 0, img: defaultImg },
  ];
  let titleDef = "";
  let questionDef = "";
  const { deckId } = useParams();

  const fetchOneDeck = async () => {
    try {
      const response = await axios.get(VITE_BACKEND_URL + `/decks/${deckId}`);
      if (response.status === 200) {
        setTitle(response.data.title);
        setQuestion(response.data.question);
        setCards(response.data.cards);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const [title, setTitle] = useState(titleDef);
  const [question, setQuestion] = useState(questionDef);
  const [userId, setUserId] = useState("");
  const [cards, setCards] = useState(cardDef);
  const [formFields, setFormFields] = useState(false);
  const [cardFields, setCardFields] = useState(false);
  const [valueFields, setValueFields] = useState(false);
  const { tokenInfo } = useContext(SessionContext);

  const findDuplicates = (array) => {
    const newArray = array.filter(
      (item, index) => array.indexOf(item) !== index
    );
    return newArray.length === 0;
  };

  useEffect(() => {
    //When update
    if (!create) {
      fetchOneDeck();
    }
  }, []);

  useEffect(() => {
    const mapedArray = cards.map((card) => card.value);
    setValueFields(findDuplicates(mapedArray));
  }, [cards]);

  useEffect(() => {
    if (title.length > 0 && question.length > 0 && cardFields) {
      setFormFields(true);
    } else {
      setFormFields(false);
    }
  }, [title, question, cardFields]);

  useEffect(() => {
    setUserId(tokenInfo.payload._id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (create) {
        const payload = {
          title,
          question,
          userId,
          cards,
        };
        const response = await axios.post(VITE_BACKEND_URL + "/decks", payload);
        if (response.status === 201) {
          navigate(`/decklist/${tokenInfo.payload._id}`);
        }
      } else {
        const payload = {
          title,
          question,
          cards,
        };
        const response = await axios.put(
          VITE_BACKEND_URL + `/decks/${deckId}`,
          payload
        );
        if (response.status === 200) {
          navigate(`/deckdetails/${deckId}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formMain">
      <form
        className="deckForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        {create && <h1 className="largeFont fontBasics">NEW DECK</h1>}
        <label className="mainText fontBasics ">Title </label>
        <input
          className="mainInputs fontBasics inputG"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <label className="mainText fontBasics">Question </label>
        <input
          className="mainInputs fontBasics inputG"
          name="question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        ></input>
        <div className="creationContainer">
          {formFields ? (
            valueFields ? (
              <button type="submit" className="submitDeck">
                {create ? "Create deck!" : "Update deck!"}
              </button>
            ) : (
              <h2 className="errorText">Values must be different</h2>
            )
          ) : (
            <h2 className="errorText">Fill all fields please</h2>
          )}
        </div>
      </form>

      <div className="cardContainer">
        <CardForm
          index={0}
          cards={cards}
          setCards={setCards}
          setCardFields={setCardFields}
        />
        <CardForm
          index={1}
          cards={cards}
          setCards={setCards}
          setCardFields={setCardFields}
        />
        <CardForm
          index={2}
          cards={cards}
          setCards={setCards}
          setCardFields={setCardFields}
        />
        <CardForm
          index={3}
          cards={cards}
          setCards={setCards}
          setCardFields={setCardFields}
        />
        <CardForm
          index={4}
          cards={cards}
          setCards={setCards}
          setCardFields={setCardFields}
        />
      </div>
      <div className="creationContainer" style={{ width: "18%" }}>
        {formFields ? (
          valueFields ? (
            <button type="button" className="submitDeck" onClick={handleSubmit}>
              {create ? "Create deck!" : "Update deck!"}
            </button>
          ) : (
            <h2 className="errorText">Values must be different</h2>
          )
        ) : (
          <h2 className="errorText">Fill all fields please</h2>
        )}
      </div>

      <Link className="navButton" to={`/decklist/${tokenInfo.payload._id}`}>
        Go back!
      </Link>
    </div>
  );
}

export default DeckInput;
