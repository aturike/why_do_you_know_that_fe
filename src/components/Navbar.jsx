import { Link } from "react-router-dom";

import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";

function NavBar() {
  const { token } = useContext(SessionContext);

  return (
    <div>
      
      <div className="navBar wavy">
        <div className="logo">
          <Link to="/">
            <span>Why</span> Do You Know that?
          </Link>
        </div>
        <ul>
          {!token && (
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          )}
          {!token && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {token && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {token && (
            <li>
              <Link to="/decklist">Decks</Link>
            </li>
          )}
          {token && (
            <li>
              <Link to="/createdeck">Create a New Deck</Link>
            </li>
          )}
          <li>
            <Link to="/game">Play</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
