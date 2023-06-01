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
import { useState } from "react";
import { Link } from "react-router-dom";

function InputModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gameId, setGameId] = useState();

  console.log(gameId);
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
            ></Input>
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor={"#f5018a"}
              colorScheme="pink"
              mr={3}
              onClick={onClose}
            >
              <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Close</Text>
            </Button>
            <Button variant={"outline"} colorScheme="purple" fontWeight={"400"}>
              {gameId ? (
                <Link to={"/game/" + gameId}>
                  <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Play!</Text>
                </Link>
              ) : (
                <Link to={"/game"}>
                  <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Play!</Text>
                </Link>
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InputModal;
