import { useState } from "react";

function FormCardTest({ cards, setCards, index }) {
  const handleCard = (event) => {
    event.preventDefault();
    const copyArray = [...cards];
    copyArray[index] = { text, value, img };
    setCards(copyArray);
  };

  const [img, setImg] = useState("");
  const [text, setText] = useState("");
  const [value, setValue] = useState(0);

  return (
    <form
      onSubmit={handleCard}
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
  );
}

export default FormCardTest;
