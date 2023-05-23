import { useEffect, useState } from "react";

function UpdateCardForm({ setThisDeck, thisDeck, index, setCardFields }) {
  const [img, setImage] = useState(thisDeck.cards[index].img);
  const [text, setText] = useState(thisDeck.cards[index].text);
  const [value, setValue] = useState(thisDeck.cards[index].value);

  const handleCard = (event) => {
    event.preventDefault();
    const copyArray = [...thisDeck.cards];
    const copyObject = copyArray[index];
    const updatedObject = {
      ...copyObject,
      [event.target.name]: event.target.value,
    };
    copyArray[index] = updatedObject;
    setThisDeck({ ...thisDeck, cards: copyArray });
    // setCards(copyArray);
  };

  useEffect(() => {
    if (img.length > 0 && text.length > 0 && value > 0) {
      setCardFields(true);
    } else {
      setCardFields(false);
    }
  }, [img, text, value]);

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
          handleCard(e);
          setImage(e.target.value);
        }}
      ></input>
      <label> Text: </label>
      <input
        name="text"
        value={text}
        onChange={(e) => {
          handleCard(e);
          setText(e.target.value);
        }}
      ></input>
      <label> Value: </label>
      <input
        type="number"
        name="value"
        value={value}
        onChange={(e) => {
          handleCard(e);
          setValue(e.target.value);
        }}
      ></input>
    </form>
  );
}

export default UpdateCardForm;
