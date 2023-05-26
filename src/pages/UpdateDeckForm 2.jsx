import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateCardForm from "../components/UpdateCardForm";

function UpdateDeckForm() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [thisDeck, setThisDeck] = useState();

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState([
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
    { text: "", value: 0, img: "" },
  ]);

  const fetchOneDeck = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/decks/${deckId}`);
      if (response.status === 200) {
        setThisDeck(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      title,
      question,
      cards,
    };
    try {
      const response = await axios.put(
        `http://localhost:5005/decks/${deckId}`,
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
      setTitle(thisDeck.title);
      setQuestion(thisDeck.question);
    }
  }, [thisDeck]);

  return thisDeck ? (
    <div style={{ border: "1px lightgrey solid", padding: "10px" }}>
      <form onSubmit={handleSubmit}>
        <h3>Update deck</h3>
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
        <button type="submit">Update deck</button>
      </form>

      <UpdateCardForm
        thisDeck={thisDeck}
        index={0}
        cards={cards}
        setCards={setCards}
      />
      <UpdateCardForm
        thisDeck={thisDeck}
        index={1}
        cards={cards}
        setCards={setCards}
      />
      <UpdateCardForm
        thisDeck={thisDeck}
        index={2}
        cards={cards}
        setCards={setCards}
      />
      <UpdateCardForm
        thisDeck={thisDeck}
        index={3}
        cards={cards}
        setCards={setCards}
      />
      <UpdateCardForm
        thisDeck={thisDeck}
        index={4}
        cards={cards}
        setCards={setCards}
      />
    </div>
  ) : (
    <h2>LOADING INFO...</h2>
  );
}

export default UpdateDeckForm;
