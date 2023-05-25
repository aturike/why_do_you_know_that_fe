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
      <div style={stylesDrag} className="Card">
        <img src={element.img} />
        <h2>{element.text}</h2>
        {!target && <h4>{element.value}</h4>}
      </div>
    );
  } else {
    return (
      <div
        className="Card-drop animate-pulse "
        ref={innerRef}
        style={stylesDrop}
      >
        {isDraggingOver ? <p></p> : <p>?</p>}

        {children}
      </div>
    );
  }
}

export default Card;
