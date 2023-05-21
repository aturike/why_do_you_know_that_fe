function Card({ element, isDragging, isDraggingOver, children, innerRef }) {
  const stylesDrag = isDragging
    ? {
        height: "100%",
        boxShadow: "1px 3px 1px #9E9E9E",
        backgroundColor: "white",
      }
    : { height: "100%", backgroundColor: "white" };

  const stylesDrop = isDraggingOver
    ? { height: "100%", backgroundColor: "blue" }
    : { height: "100%" };

  if (element) {
    return (
      <div style={stylesDrag}>
        <img style={{ height: "50px" }} src={element.img} />
        <h2>{element.text}</h2>
        <h4>{element.value}</h4>
      </div>
    );
  } else {
    return (
      <div className="Card" ref={innerRef} style={stylesDrop}>
        {children}
      </div>
    );
  }
}

export default Card;
