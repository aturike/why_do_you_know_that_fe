import { Box, Text } from "@chakra-ui/react";
import "../styles/Card.css";

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
        className="card"
        w={{ base: "90px", md: "110px", lg: "200px" }}
        h={{ base: "140px", md: "154px", lg: "280px" }}
      >
        <div className="border">
          <div className="top">
            <img className="card-img" src={element.img} />
          </div>
          <div className="center">
            <Text
              fontSize={{ base: "0.8rem", md: "0.8em", lg: "1.2rem" }}
              align={"center"}
            >
              {element.text}
            </Text>
          </div>
          <div className="bot">
            {!target ? (
              <Text
                fontSize={{ base: "0.8rem", md: "1rem", lg: "1.5rem" }}
                align={"center"}
              >
                {element.value}
              </Text>
            ) : (
              <Text
                fontSize={{ base: "0.8rem", md: "1rem", lg: "1.5rem" }}
                align={"center"}
              >
                ?
              </Text>
            )}
          </div>
        </div>
      </Box>
    );
  } else {
    return (
      <Box
        ref={innerRef}
        className="border-question-card"
        border={{ base: "none", md: "5px grey solid" }}
        w={{ base: "10px", md: "120px", lg: "210px" }}
        h={{ base: "140px", md: "154px", lg: "280px" }}
      >
        <Text fontSize={{ base: "3rem", lg: "7rem" }}>?</Text>
      </Box>

      // <Box
      //   // className="Card-drop animate-pulse"
      //   ref={innerRef}
      //   style={stylesDrop}
      // >
      //   {isDraggingOver ? (
      //     <Text></Text>
      //   ) : (
      //     <Text fontSize={{ base: "2rem", md: "8rem" }}>?</Text>
      //   )}

      //   {children}
      // </Box>
    );
  }
}

export default Card;
