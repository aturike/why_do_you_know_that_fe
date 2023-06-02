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
        style={stylesDrag}
        className="card"
        w={{ base: "100px", md: "150px", lg: "200px" }}
        h={{ base: "140px", md: "210px", lg: "280px" }}
      >
        <div className="border">
          <div className="top">
            <img className="card-img" src={element.img} />
          </div>
          <div className="center">
            <Text
              fontSize={{ base: "0.8rem", md: "0.8em", lg: "1.5rem" }}
              align={"center"}
            >
              {element.text}
            </Text>
          </div>
          <div className="bot">
            {!target ? (
              <Text
                fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}
                align={"center"}
              >
                {element.value}
              </Text>
            ) : (
              <Text
                fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}
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
        w={{ base: "100%", lg: "80%" }}
      >
        <Text fontSize={{ base: "3rem", md: "7rem" }}>?</Text>
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
