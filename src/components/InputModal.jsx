import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gameId, setGameId] = useState();
  const [inputInvalid, setInputInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = async () => {
    setInputInvalid(false);
    if (!gameId) {
      setInputInvalid(true);
    } else {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://why-do-i-know-that.adaptable.app/decks/${gameId}`
        );
        console.log(response);
        if (response.status === 200) {
          navigate(`/game/${gameId}`);
        }
      } catch (error) {
        setInputInvalid(true);
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      <Box className="btn-alt" onClick={onOpen}>
        <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>
          Play a custom game!
        </Text>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", md: "lg" }}
        isCentered="true"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={"400"}>
            <Text fontSize={{ base: "1rem", md: "1.2rem" }}>
              Place the game`s unique code and play
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              fontWeight={"100"}
              onChange={(event) => {
                setGameId(event.target.value);
              }}
              isInvalid={inputInvalid}
            ></Input>
            {inputInvalid && (
              <Text fontSize={{ base: "0.8rem" }} color={"red"}>
                Invalid game ID
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor={"#f5018a"}
              colorScheme="pink"
              mr={3}
              onClick={() => {
                onClose();
                setInputInvalid(false);
              }}
            >
              <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Close</Text>
            </Button>
            <Button
              variant={"outline"}
              colorScheme="purple"
              fontWeight={"400"}
              fontSize={{ base: "0.8rem", md: "1.2rem" }}
              onClick={handleClick}
              isLoading={isLoading}
            >
              Play!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InputModal;
