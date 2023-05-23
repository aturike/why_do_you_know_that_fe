import NavBar from "../components/Navbar";

function LandingPage() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="preview-container">
        <div className="hidden-card">
          <p>Here?</p>
        </div>
        <div className="card-preview one"></div>
        <div className="hidden-card">
          <p>Here?</p>
        </div>
        <div className="card-preview two"></div>
        <div className="card-preview three"></div>
        <div className="hidden-card">
          <p>Here?</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
