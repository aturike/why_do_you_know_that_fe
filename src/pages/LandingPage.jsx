import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <NavBar />
      <div className="landing-page-section">
        <div className="directions">
          <p>
            Would you say you know a lot of facts, that maybe you shouldnt? Or,
            would you consider youself as someone who is just really good at
            guessing? Either way, this game is for you! There will be 3 cards
            placed in front of you - the task is to guess which order they
            should be in, based off of the scores, images, and titles. Make
            sense? Give it a try!
          </p>
        </div>
        <div className="preview-container">
          <div className="card-preview one"></div>
          <div className="card-preview two"></div>
          <div className="card-preview three"></div>
        </div>
        <Link className="btn" to={"/game"}>
          Play!
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
