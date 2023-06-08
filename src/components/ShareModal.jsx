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

function ShareModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gameId, setGameId] = useState("testtest");
  const [isCopied, setIsCopied] = useState(false);

  const shareUrl = "https://why-do-you-know-that.netlify.app/";

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
                beforeOnClick={() => {
                  handleCopy();
                }}
                url={shareUrl}
                title={"My gameId: " + gameId}
                separator=" "
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              <TwitterShareButton
                beforeOnClick={() => {
                  handleCopy();
                }}
                title={"My gameId: " + gameId}
                hashtags={["why-do-you-know-that"]}
                url={shareUrl}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <FacebookShareButton
                beforeOnClick={() => {
                  handleCopy();
                }}
                url={shareUrl}
                quote={"My gameId: " + gameId}
                hashtag={"#" + gameId}
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <LinkedinShareButton
                beforeOnClick={() => {
                  handleCopy();
                }}
                url={shareUrl}
                title={"My gameId: " + gameId}
                summary={"My gameId: " + gameId}
                source={"My gameId: " + gameId}
              >
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
              <EmailShareButton
                beforeOnClick={() => {
                  handleCopy();
                }}
                url={shareUrl}
                subject={"Why-do-you-know that game"}
                body={"My gameId: " + gameId}
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
