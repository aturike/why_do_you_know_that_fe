import { Box, Text } from "@chakra-ui/react";

function Card({
  element,
  isDragging,
  isDraggingOver,
  children,
  innerRef,
  target,
}) {
  const stylesDrag = isDragging
    ? {
        height: "100%",
      }
    : { height: "100%" };

  const stylesDrop = isDraggingOver ? { width: "50%" } : { width: "50%" };

  if (element) {
    return (
      <Box
        style={stylesDrag}
        className="Card"
        w={{ base: "4.5rem", md: "12rem" }}
        h={{ base: "8rem", md: "18rem" }}
      >
        <img src={element.img} />
        <Text className="Card-text" fontSize={{ base: "0.8rem", md: "1.1rem" }}>
          {element.text}
        </Text>
        {!target && (
          <Text
            className="Card-text"
            fontSize={{ base: "0.8rem", md: "1.1rem" }}
          >
            {element.value}
          </Text>
        )}
      </Box>
    );
  } else {
    return (
      <Box
        className="Card-drop animate-pulse "
        ref={innerRef}
        style={stylesDrop}
      >
        {isDraggingOver ? (
          <Text></Text>
        ) : (
          <Text fontSize={{ base: "2rem", md: "8rem" }}>?</Text>
        )}

        {children}
      </Box>
    );
  }
}

export default Card;
