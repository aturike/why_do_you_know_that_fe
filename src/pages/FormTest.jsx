import { useState } from "react";
import axios from "axios";

function FormTest() {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState([]);

  const [img, setImg] = useState("");
  const [text, setText] = useState("");
  const [value, setValue] = useState(0);

  const [img2, setImg2] = useState("");
  const [text2, setText2] = useState("");
  const [value2, setValue2] = useState(0);

  const handleCard1 = (event) => {
    event.preventDefault();
    setCards([{ img, text, value }]);
  };

  const handleCard2 = (event) => {
    event.preventDefault();
    const copyArray = [...cards];
    copyArray.push({ img2, text2, value2 });
    setCards(copyArray);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const payload = {
  //     title,
  //     question,
  //     cards,
  //   };
  //   try {
  //     const response = await axios.create(
  //       "http://localhost:5005/decks",
  //       payload
  //     );
  //     if (response.status === 201) {
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      title,
      question,
      cards,
    };
    console.log(payload);
  };

  return (
    <div>
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

      <form
        onSubmit={handleCard1}
        style={{ border: "1px lightgrey solid", padding: "10px" }}
      >
        <h3>Card 1</h3>
        <label> Picture: </label>
        <input
          name="img"
          value={img}
          onChange={(e) => {
            setImg(e.target.value);
          }}
        ></input>
        <label> Text: </label>
        <input
          name="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></input>
        <label> Value: </label>
        <input
          name="value"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
        <button type="submit">Create card 1</button>
      </form>

      <form
        onSubmit={handleCard2}
        style={{ border: "1px lightgrey solid", padding: "10px" }}
      >
        <h3>Card 2</h3>
        <label> Picture: </label>
        <input
          name="img2"
          value={img2}
          onChange={(e) => {
            setImg2(e.target.value);
          }}
        ></input>
        <label> Text: </label>
        <input
          name="text2"
          value={text2}
          onChange={(e) => {
            setText2(e.target.value);
          }}
        ></input>
        <label> Value: </label>
        <input
          name="value2"
          value={value2}
          onChange={(e) => {
            setValue2(e.target.value);
          }}
        ></input>
        <button type="submit">Create card 2</button>
      </form>
    </div>
  );
}

export default FormTest;
