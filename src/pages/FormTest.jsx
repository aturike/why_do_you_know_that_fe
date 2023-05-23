import { useContext, useEffect, useState } from "react";
import axios from "axios";
import FormCardTest from "../components/FormCardTest";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

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

  useEffect(() => {
    const mapedArray = cards.map((card) => card.value);
    setValueFields(new Set(mapedArray).size === mapedArray.length);
  }, [cards]);

  useEffect(() => {
    if (title.length > 0 && question.length > 0 && cardFields) {
      setFormFields(true);
    } else {
      setFormFields(false);
    }
  }, [title, question, cardFields]);

  const { tokenInfo } = useContext(SessionContext);

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

    try {
      const response = await axios.post("http://localhost:5005/decks", payload);
      if (response.status === 201) {
        navigate("/decklist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ border: "1px lightgrey solid", padding: "10px" }}>
      <form onSubmit={handleSubmit}>
        <h3>New deck</h3>
        <label>Title: </label>
        <input
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <label>Question: </label>
        <input
          name="question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        ></input>
        {formFields ? (
          valueFields ? (
            <button type="submit">Create deck</button>
          ) : (
            <h2>Values must be different</h2>
          )
        ) : (
          <h2>fill all fields please</h2>
        )}
      </form>

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
  );
}

export default FormTest;
