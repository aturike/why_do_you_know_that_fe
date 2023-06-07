import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateCardForm from "../components/UpdateCardForm";
import CreateCardForm from "../components/CardForm";
const { VITE_BACKEND_URL } = import.meta.env;

function UpdateDeckForm() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [thisDeckCard, setThisDeckCard] = useState();
  const [thisDeck, setThisDeck] = useState();
  const [formFields, setFormFields] = useState(false);
  const [cardFields, setCardFields] = useState(false);
  const [valueFields, setValueFields] = useState(true);

  const fetchOneDeck = async () => {
    try {
      const response = await axios.get(VITE_BACKEND_URL + `/decks/${deckId}`);
      if (response.status === 200) {
        setThisDeck(response.data);
        setThisDeckCard(response.data.cards);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCards = thisDeckCard;
    const payload = { ...thisDeck, cards: updatedCards };
    try {
      const response = await axios.put(
        VITE_BACKEND_URL + `/decks/${deckId}`,
        payload
      );
      if (response.status === 200) {
        navigate(`/deckdetails/${deckId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOneDeck();
  }, []);

  useEffect(() => {
    if (thisDeck) {
      if (
        thisDeck.title.length > 0 &&
        thisDeck.question.length > 0 &&
        cardFields
      ) {
        setFormFields(true);
      } else {
        setFormFields(false);
      }
    }
  }, [thisDeck, cardFields]);

  return thisDeck ? (
    <div className="formMain">
      <form className="deckForm" onSubmit={handleSubmit}>
        <label className="mainText fontBasics">Title </label>
        <input
          className="mainInputs fontBasics inputG"
          name="title"
          value={thisDeck.title}
          onChange={(e) => {
            setThisDeck({ ...thisDeck, title: e.target.value });
          }}
        ></input>
        <label className="mainText fontBasics">Question </label>
        <input
          className="mainInputs fontBasics inputG"
          name="question"
          value={thisDeck.question}
          onChange={(e) => {
            setThisDeck({ ...thisDeck, question: e.target.value });
          }}
        ></input>
        <div className="creationContainer">
          {formFields ? (
            valueFields ? (
              <button type="submit" className="submitDeck">
                Update deck
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
        <CreateCardForm
          index={0}
          cards={thisDeckCard}
          setCards={setThisDeckCard}
          setCardFields={setCardFields}
        />
        <CreateCardForm
          index={1}
          cards={thisDeckCard}
          setCards={setThisDeckCard}
          setCardFields={setCardFields}
        />
        <CreateCardForm
          index={2}
          cards={thisDeckCard}
          setCards={setThisDeckCard}
          setCardFields={setCardFields}
        />
        <CreateCardForm
          index={3}
          cards={thisDeckCard}
          setCards={setThisDeckCard}
          setCardFields={setCardFields}
        />
        <CreateCardForm
          index={4}
          cards={thisDeckCard}
          setCards={setThisDeckCard}
          setCardFields={setCardFields}
        />
      </div>
      <Link className="navButton" to={`/deckdetails/${deckId}`}>
        Go back!
      </Link>
    </div>
  ) : (
    <h2 className="fontBasics">LOADING INFO...</h2>
  );
}

export default UpdateDeckForm;
