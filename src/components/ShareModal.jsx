import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
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
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CopyIcon } from "@chakra-ui/icons";

function ShareModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gameId, setGameId] = useState();
  const [isCopied, setIsCopied] = useState(false);

  const inputRef = useRef(null);

  const handleCopy = () => {
    const inputValue = inputRef.current.value;
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box className="btn-alt" onClick={onOpen}>
        <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>
          Share your gameId
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
            <Text fontSize={{ base: "1rem", md: "1.2rem" }}>Your gameId</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <Input
                fontWeight={"100"}
                ref={inputRef}
                value={"Testtest"}
              ></Input>
              <InputRightElement>
                <Button
                  variant={"outline"}
                  colorScheme="black"
                  fontWeight={"400"}
                  fontSize={{ base: "0.8rem" }}
                  onClick={handleCopy}
                >
                  <CopyIcon w={4} />
                </Button>
              </InputRightElement>
            </InputGroup>
            {isCopied && (
              <Text fontSize={{ base: "0.8rem" }}>GameId copied</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor={"#f5018a"}
              colorScheme="pink"
              mr={3}
              onClick={() => {
                onClose();
                setIsCopied(false);
              }}
            >
              <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Close</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShareModal;
