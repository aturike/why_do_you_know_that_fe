import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateCardForm from "../components/UpdateCardForm";

function UpdateDeckForm() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [thisDeck, setThisDeck] = useState();

  // const [title, setTitle] = useState("");
  // const [question, setQuestion] = useState("");
  // const [cards, setCards] = useState([
  //   { text: "", value: 0, img: "" },
  //   { text: "", value: 0, img: "" },
  //   { text: "", value: 0, img: "" },
  //   { text: "", value: 0, img: "" },
  //   { text: "", value: 0, img: "" },
  // ]);

  const [formFields, setFormFields] = useState(false);
  const [cardFields, setCardFields] = useState(false);
  const [valueFields, setValueFields] = useState(true);

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
    const payload = thisDeck;
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

  // useEffect(() => {
  //   if (thisDeck) {
  //     setTitle(thisDeck.title);
  //     setQuestion(thisDeck.question);
  //   }
  // }, [thisDeck]);

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

  useEffect(() => {
    if (thisDeck) {
      const mapedArray = thisDeck.cards.map((card) => card.value);
      console.log(mapedArray);
      console.log(mapedArray.some((val, i) => mapedArray.indexOf(val) === i));
    }
  }, [thisDeck]);

  return thisDeck ? (
    <div style={{ border: "1px lightgrey solid", padding: "10px" }}>
      <form onSubmit={handleSubmit}>
        <h3>Update deck</h3>
        <label>Title: </label>
        <input
          name="title"
          value={thisDeck.title}
          onChange={(e) => {
            // setTitle(e.target.value);
            setThisDeck({ ...thisDeck, title: e.target.value });
          }}
        ></input>
        <label>Question: </label>
        <input
          name="question"
          value={thisDeck.question}
          onChange={(e) => {
            // setQuestion(e.target.value);
            setThisDeck({ ...thisDeck, question: e.target.value });
          }}
        ></input>
        {formFields ? (
          valueFields ? (
            <button type="submit">Update deck</button>
          ) : (
            <h2>Values must be different</h2>
          )
        ) : (
          <h2>fill all fields please</h2>
        )}
        <Link to={`/deckdetails/${deckId}`}>Go back!</Link>
      </form>

      <UpdateCardForm
        thisDeck={thisDeck}
        setThisDeck={setThisDeck}
        index={0}
        // cards={cards}
        // setCards={setCards}
        setCardFields={setCardFields}
      />
      <UpdateCardForm
        thisDeck={thisDeck}
        setThisDeck={setThisDeck}
        index={1}
        // cards={cards}
        // setCards={setCards}
        setCardFields={setCardFields}
      />
      <UpdateCardForm
        thisDeck={thisDeck}
        setThisDeck={setThisDeck}
        index={2}
        // cards={cards}
        // setCards={setCards}
        setCardFields={setCardFields}
      />
      <UpdateCardForm
        thisDeck={thisDeck}
        setThisDeck={setThisDeck}
        index={3}
        // cards={cards}
        // setCards={setCards}
        setCardFields={setCardFields}
      />
      <UpdateCardForm
        thisDeck={thisDeck}
        setThisDeck={setThisDeck}
        index={4}
        // cards={cards}
        // setCards={setCards}
        setCardFields={setCardFields}
      />
    </div>
  ) : (
    <h2>LOADING INFO...</h2>
  );
}

export default UpdateDeckForm;
