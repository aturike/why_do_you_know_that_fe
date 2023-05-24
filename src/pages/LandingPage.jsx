import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div className="landing-page-section">
        <div className="directions">
          <p>
            There will be 3 cards placed in front of you - the task is to guess
            which order they should be in, based off of the scores, images, and
            titles. Make sense? Give it a try!
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
        <div className="team">
          <h3>Adam Turi</h3>
          <h3>Dani Bravo</h3>
          <h3>August Colonna</h3>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
