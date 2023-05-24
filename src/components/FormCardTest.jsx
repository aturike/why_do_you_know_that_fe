import { useEffect, useState } from "react";

function FormCardTest({
  cards,
  setCards,
  index,
  setCardFields,
  setValueFields,
}) {
  //  TRY WITH STATES
  const [img, setImage] = useState(cards[index].img);
  const [text, setText] = useState(cards[index].text);
  const [value, setValue] = useState(cards[index].value);

  const handleCard = (event) => {
    event.preventDefault();
    const copyArray = [...cards];
    const copyObject = copyArray[index];
    const updatedObject = {
      ...copyObject,
      [event.target.name]: event.target.value,
    };
    copyArray[index] = updatedObject;
    setCards(copyArray);
  };

  useEffect(() => {
    if (img.length > 0 && text.length > 0 && value) {
      setCardFields(true);
    } else {
      setCardFields(false);
    }
  }, [img, text, value]);

  return (
    <form style={{ border: "1px lightgrey solid", padding: "10px" }}>
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

export default FormCardTest;
