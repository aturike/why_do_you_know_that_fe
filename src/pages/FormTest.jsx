import { useEffect, useState } from "react";
import axios from "axios";
import FormCardTest from "../components/FormCardTest";
import { useNavigate, useParams } from "react-router-dom";

function FormTest() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState([
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      title,
      question,
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
        <button type="submit">Create deck</button>
      </form>

      <FormCardTest index={0} cards={cards} setCards={setCards} />
      <FormCardTest index={1} cards={cards} setCards={setCards} />
      <FormCardTest index={2} cards={cards} setCards={setCards} />
      <FormCardTest index={3} cards={cards} setCards={setCards} />
      <FormCardTest index={4} cards={cards} setCards={setCards} />
    </div>
  );
}

export default FormTest;