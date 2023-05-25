import { useContext, useEffect, useState } from "react";
import axios from "axios";
import FormCardTest from "../components/FormCardTest";
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import "../Deck.css";

function FormTest() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [userId, setUserId] = useState("");
  const [cards, setCards] = useState([
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
  ]);
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

    const payload = {
      title,
      question,
      userId,
      cards,
    };
    console.log(payload);
    try {
      const response = await axios.post(
        "https://why-do-i-know-that.adaptable.app/decks",
        payload
      );
      if (response.status === 201) {
        navigate(`/decklist/${tokenInfo.payload._id}`);
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
        <h1>Create a new DECK</h1>
        <label className="mainText">Title </label>
        <input
          className="mainInputs"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <label className="mainText">Question </label>
        <input
          className="mainInputs"
          name="question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        ></input>
        <div className="creationContainer">
          {" "}
          {formFields ? (
            valueFields ? (
              <button type="submit" className="submitDeck">
                Create deck!
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
        <FormCardTest
          index={0}
          cards={cards}
          setCards={setCards}
          setCardFields={setCardFields}
          setValueFields={setValueFields}
        />
        <FormCardTest
          index={1}
          cards={cards}
          setCards={setCards}
          setCardFields={setCardFields}
          setValueFields={setValueFields}
        />
        <FormCardTest
          index={2}
          cards={cards}
          setCards={setCards}
          setCardFields={setCardFields}
          setValueFields={setValueFields}
        />
        <FormCardTest
          index={3}
          cards={cards}
          setCards={setCards}
          setCardFields={setCardFields}
          setValueFields={setValueFields}
        />
        <FormCardTest
          index={4}
          cards={cards}
          setCards={setCards}
          setCardFields={setCardFields}
          setValueFields={setValueFields}
        />
      </div>

      <Link className="navButton" to={`/decklist/${tokenInfo.payload._id}`}>
        Go back!
      </Link>
    </div>
  );
}

export default FormTest;
