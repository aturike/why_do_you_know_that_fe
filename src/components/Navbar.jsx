import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navBar">
      <div className="logo">
        <Link to="/">Why Do You Know that?</Link>
      </div>
      <ul>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/decklist">Decks</Link>
        </li>
        <li>
          <Link to="/createdeck">Create a New Deck</Link>
        </li>
        <li>
          <Link to="/game">Play</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
