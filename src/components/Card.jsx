import { Box, Text } from "@chakra-ui/react";
import "../styles/Card.css";
import { transform } from "framer-motion";

function Card({
  element,
  isDragging,
  isDraggingOver,
  children,
  innerRef,
  target,
}) {
  const stylesDrag = isDragging && "#f0f0f0 0 0 30px";

  const stylesDrop = isDraggingOver
    ? { color: "#f0f0f0", transform: "scale(1.2)", border: "5px white solid" }
    : { color: "grey", transform: "", border: "5px grey solid" };

  if (element) {
    return (
      <Box
        className="card"
        w={{ base: "90px", md: "110px", lg: "200px" }}
        h={{ base: "140px", md: "154px", lg: "280px" }}
        boxShadow={stylesDrag}
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
        border={{ base: "none", md: stylesDrop.border }}
        w={{ base: "100%", md: "120px", lg: "210px" }}
        h={{ base: "140px", md: "154px", lg: "280px" }}
      >
        <Text
          fontSize={{ base: "3rem", lg: "7rem" }}
          color={stylesDrop.color}
          transform={stylesDrop.transform}
        >
          ?
        </Text>
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
