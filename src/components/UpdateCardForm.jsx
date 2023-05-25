import axios from "axios";
import { useEffect, useState } from "react";

function UpdateCardForm({
  setValueFields,
  setThisDeck,
  thisDeck,
  index,
  setCardFields,
}) {
  const [img, setImage] = useState(thisDeck.cards[index].img);
  const [text, setText] = useState(thisDeck.cards[index].text);
  const [value, setValue] = useState(thisDeck.cards[index].value);

  //upload image
  const uploadImage = async (event) => {
    event.preventDefault();
    console.log("mat rules");
    const fData = new FormData();

    const image = event.target[0].files[0];
    fData.append("imageUrl", image);
    try {
      const response = await axios.post(
        "https://why-do-i-know-that.adaptable.app/decks/cloudinary",
        fData
      );
      const copyArray = [...thisDeck.cards];
      const copyObject = copyArray[index];
      const updatedObject = {
        ...copyObject,
        img: response.data,
      };
      copyArray[index] = updatedObject;
      setThisDeck({ ...thisDeck, cards: copyArray });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // upload image

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
  };

  useEffect(() => {
    if (img.length > 0 && text.length > 0 && value > 0) {
      setCardFields(true);
    } else {
      setCardFields(false);
    }
  }, [img, text, value]);

  const findDuplicates = (array) => {
    const newArray = array.splice(index, 1);
    const found = array.includes(Number(newArray[0]));
    return found;
  };

  useEffect(() => {
    const mapedArray = thisDeck.cards.map((card) => card.value);
    setValueFields(!findDuplicates(mapedArray));
  }, [value]);

  return (
    <form className="cardForm" onSubmit={uploadImage}>
      <h3 className="mainText">Card {index + 1}</h3>
      <label> Picture </label>
      <input
        className="fileInput"
        name="img"
        type="file"
        accept="image/jpg, image/png"
        // value={img}
      ></input>
      <button className="submitImage" type="submit">
        submit image
      </button>
      <label> Text </label>
      <input
        name="text"
        value={text}
        onChange={(e) => {
          handleCard(e);
          setText(e.target.value);
        }}
      ></input>
      <label> Value </label>
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
