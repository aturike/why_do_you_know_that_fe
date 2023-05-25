import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateCardForm from "../components/UpdateCardForm";

function UpdateDeckForm() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [thisDeck, setThisDeck] = useState();
  const [formFields, setFormFields] = useState(false);
  const [cardFields, setCardFields] = useState(false);
  const [valueFields, setValueFields] = useState(true);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = thisDeck;
    try {
      const response = await axios.put(
        `https://why-do-i-know-that.adaptable.app/decks/${deckId}`,
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
            <h2 className="errorText">fill all fields please</h2>
          )}
        </div>
      </form>
      <div className="cardContainer">
        <UpdateCardForm
          thisDeck={thisDeck}
          setThisDeck={setThisDeck}
          index={0}
          setCardFields={setCardFields}
          setValueFields={setValueFields}
        />
        <UpdateCardForm
          thisDeck={thisDeck}
          setThisDeck={setThisDeck}
          index={1}
          setCardFields={setCardFields}
          setValueFields={setValueFields}
        />
        <UpdateCardForm
          thisDeck={thisDeck}
          setThisDeck={setThisDeck}
          index={2}
          setCardFields={setCardFields}
          setValueFields={setValueFields}
        />
        <UpdateCardForm
          thisDeck={thisDeck}
          setThisDeck={setThisDeck}
          index={3}
          setCardFields={setCardFields}
          setValueFields={setValueFields}
        />
        <UpdateCardForm
          thisDeck={thisDeck}
          setThisDeck={setThisDeck}
          index={4}
          setCardFields={setCardFields}
          setValueFields={setValueFields}
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
