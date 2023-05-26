import axios from "axios";
import { useEffect, useState } from "react";
import "../Deck.css";

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
  const [isSubmited, setIsSubmited] = useState(false);

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
      const copyArray = [...cards];
      const copyObject = copyArray[index];
      if (response.status === 201) {
        const updatedObject = {
          ...copyObject,
          img: response.data,
        };
        copyArray[index] = updatedObject;
        setImage(response.data);
        setCards(copyArray);
        setIsSubmited(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCard = (event) => {
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
    <form
      className="cardForm"
      onSubmit={uploadImage}
      encType="multipart/form-data"
    >
      <h3 className="mainText fontBasics">Card {index + 1}</h3>
      <label className="fontBasics"> Picture </label>
      <input
        className="fileInput fontBasics inputG"
        name="img"
        type="file"
        accept="image/jpg, image/png"
        // value={img}
      ></input>
      {isSubmited ? (
        <button className="submitImage inputG" type="submit">
          Submited!
        </button>
      ) : (
        <button className="submitImage inputG" type="submit">
          Submit Image
        </button>
      )}

      <label className="fontBasics"> Text </label>
      <input
        className="fontBasics inputG"
        name="text"
        value={text}
        onChange={(e) => {
          handleCard(e);
          setText(e.target.value);
        }}
      ></input>
      <label className="fontBasics"> Value </label>
      <input
        className="fontBasics inputG"
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
