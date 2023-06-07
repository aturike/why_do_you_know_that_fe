import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Deck.css";
import { Button, Text } from "@chakra-ui/react";
const { VITE_BACKEND_URL } = import.meta.env;

function CardForm({ cards, setCards, index, setCardFields }) {
  const [isSubmited, setIsSubmited] = useState(false);
  const [isValueError, setIsValueError] = useState(false);
  const [isUrl, setIsUrl] = useState(false);

  const defaultImg =
    "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image-300x225.jpg";
  const loadingImg =
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921";

  const handleCard = (event) => {
    const copyArray = [...cards];
    const copyObject = copyArray[index];
    let updatedObject = { ...copyObject };
    if (event.target.name === "img" && event.target.value.length === 0) {
      updatedObject = {
        ...copyObject,
        img: defaultImg,
      };
    } else if (event.target.name === "value") {
      const typevalue = event.target.value;
      if (!parseInt(typevalue) && typevalue !== "00" && typevalue !== "") {
        setIsValueError(true);
      } else if (typevalue.length > 5) {
        setIsValueError(true);
      } else {
        const slicedTypeVal = typevalue.slice(0, 5);
        const numericValue = slicedTypeVal.replace(/[^\d]/g, "");
        updatedObject = {
          ...copyObject,
          [event.target.name]: parseInt(numericValue) || 0,
        };
      }
    } else {
      updatedObject = {
        ...copyObject,
        [event.target.name]: event.target.value,
      };
    }

    copyArray[index] = updatedObject;
    setCards(copyArray);
  };

  useEffect(() => {
    if (
      cards[index].img.length > 0 &&
      cards[index].text.length > 0 &&
      cards[index].value
    ) {
      setCardFields(true);
    } else {
      setCardFields(false);
    }
  }, [cards[index].img, cards[index].text, cards[index].value]);

  const fileUploadChange = async (event) => {
    setIsSubmited(true);
    const fData = new FormData();
    const image = event.target.files[0];
    fData.append("imageUrl", image);
    try {
      const response = await axios.post(
        VITE_BACKEND_URL + "/decks/cloudinary",
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
        setCards(copyArray);
        setIsSubmited(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="cardForm"
      encType="multipart/form-data"
      onChange={() => {
        setTimeout(() => {
          setIsValueError(false);
        }, 3000);
      }}
    >
      <h3 className="mainText fontBasics">Card {index + 1}</h3>
      <img
        className="image"
        src={isSubmited ? loadingImg : cards[index].img}
        onError={(event) => {
          event.target.src = defaultImg;
          event.onerror = null;
        }}
      />
      <label className="fontBasics"> Picture </label>
      {isUrl ? (
        <div className="imageForm">
          <button
            className="imageButtonOn inputG"
            type="button"
            onClick={() => setIsUrl(true)}
          >
            Copy Url
          </button>
          <button
            className="imageButtonOff inputG"
            type="button"
            onClick={() => setIsUrl(false)}
          >
            Upload file
          </button>
        </div>
      ) : (
        <div className="imageForm">
          <button
            className="imageButtonOff inputG"
            type="button"
            onClick={() => setIsUrl(true)}
          >
            Copy Url
          </button>
          <button
            className="imageButtonOn inputG"
            type="button"
            onClick={() => setIsUrl(false)}
          >
            Upload file
          </button>
        </div>
      )}
      {isUrl && (
        <input
          className="fontBasics inputG"
          name="img"
          // value={img}
          placeholder="Copy your url"
          onChange={(e) => {
            handleCard(e);
          }}
        ></input>
      )}
      {!isUrl && !isSubmited && (
        <input
          className="fileInput fontBasics inputG"
          name="img"
          type="file"
          accept="image/jpg, image/png"
          onChange={fileUploadChange}
          // value={img}
        ></input>
      )}

      <label className="fontBasics"> Text </label>
      <input
        className="fontBasics inputG"
        name="text"
        value={cards[index].text}
        onChange={(e) => {
          handleCard(e);
        }}
      ></input>
      <label className="fontBasics"> Value </label>
      <input
        className="fontBasics inputG"
        type="text"
        name="value"
        value={cards[index].value}
        onChange={(e) => {
          setIsValueError(false);
          handleCard(e);
        }}
      ></input>
      {isValueError && (
        <Text fontSize={"0.8rem"} color="red" align={"center"}>
          Value has to be a number of max 5 digits
        </Text>
      )}
    </form>
  );
}

export default CardForm;
