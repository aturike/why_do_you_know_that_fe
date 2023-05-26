import { useState } from "react";

function UpdateCardForm({ thisDeck, cards, setCards, index }) {
  const handleCard = (event) => {
    event.preventDefault();
    const copyArray = [...cards];
    copyArray[index] = { text, value, img };
    setCards(copyArray);
  };

  const [img, setImg] = useState(thisDeck.cards[index].img);
  const [text, setText] = useState(thisDeck.cards[index].text);
  const [value, setValue] = useState(thisDeck.cards[index].value);
  return (
    <form
      onSubmit={handleCard}
      style={{ border: "1px lightgrey solid", padding: "10px" }}
    >
      <h3>Card {index + 1}</h3>
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
        type="number"
        name="value"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <button type="submit">Update card</button>
    </form>
  );
}

export default UpdateCardForm;
