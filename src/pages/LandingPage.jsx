import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page-section">
      <div className="directions">
        <p>
          There will be 3 cards placed in front of you - the task is to guess
          which order they should be in, based off of the scores, images, and
          titles. Make sense? Give it a try!
        </p>
      </div>
      <div className="preview-container">
        <div className="card-preview two animate-flicker">
          <h1>?</h1>
        </div>
        <div className="card-preview one">
          <h1>1</h1>
        </div>
        <div className="card-preview two animate-flicker">
          <h1>?</h1>
        </div>
        <div className="card-preview three">
          <h1>3</h1>
        </div>
        <div className="card-preview two animate-flicker">
          <h1>?</h1>
        </div>
      </div>
      <div className="card-preview bottom-card animate-pulse">
        <h1>2</h1>
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
  );
}

export default LandingPage;
