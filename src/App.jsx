import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import ProfileTest from "./pages/ProfileTest";
import Game from "./pages/Game";
import Lose from "./pages/Lose";
import Win from "./pages/Win";
import HighScore from "./pages/HighScore";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/token" element={<ProfileTest />} />
      <Route path="/game" element={<Game />} />
      <Route path="/lose" element={<Lose />} />
      <Route path="/win" element={<Win />} />
      <Route path="/highscore" element={<HighScore />} />
    </Routes>
  );
}

export default App;
