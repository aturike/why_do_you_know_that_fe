import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
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
import { CopyIcon } from "@chakra-ui/icons";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

function ShareModal({ gameId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isCopied, setIsCopied] = useState(false);

  const shareUrl = `https://why-do-you-know-that.netlify.app/game/${gameId}`;

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
      <Box className="navButton" onClick={onOpen}>
        <Text fontSize={{ base: "0.8rem", md: "1rem" }}>Share your game</Text>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", md: "lg" }}
        isCentered="true"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={"400"}></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftAddon children="Your gameID" />
              <Input
                fontWeight={"100"}
                ref={inputRef}
                onClick={handleCopy}
                readOnly
                cursor={"pointer"}
                value={gameId}
              ></Input>
              <InputRightElement cursor={"pointer"} onClick={handleCopy}>
                <CopyIcon w={4} />
              </InputRightElement>
            </InputGroup>
            {isCopied && (
              <Text fontSize={{ base: "0.8rem" }} align={"center"}>
                GameId copied
              </Text>
            )}
            <Flex pt={"10px"} justify={"center"} gap="10px">
              <WhatsappShareButton
                url={shareUrl}
                title={"Hey, try out my amazing game: "}
                separator=" "
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              <TwitterShareButton
                title={"Hey, try out my amazing game: "}
                url={shareUrl}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <FacebookShareButton
                url={shareUrl}
                quote={"Hey, try out my amazing game: "}
                hashtag={"#why-do-you-know-that"}
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <LinkedinShareButton
                url={shareUrl}
                title={"Hey, try out my amazing game: "}
              >
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
              <EmailShareButton
                beforeOnClick={() => {
                  handleCopy();
                }}
                url={shareUrl}
                subject={"Why-do-you-know that game"}
                body={"Hey, try out my amazing game: "}
              >
                <EmailIcon size={40} round />
              </EmailShareButton>
            </Flex>
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
