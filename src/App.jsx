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
import DeckList from "./pages/DeckList";
import DeckDetails from "./pages/DeckDetails";
import FormTest from "./pages/FormTest";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/token" element={
                                    <PrivateRoute>
                                      <ProfileTest />
                                    </PrivateRoute>
                                    }
                                    />
      <Route path="/decklist" element={<DeckList />} />
      <Route path="/deckdetails" element={<DeckDetails />} />
      <Route path="/game" element={<Game />} />
      <Route path="/lose" element={<Lose />} />
      <Route path="/win" element={<Win />} />
      <Route path="/highscore" element={<HighScore />} />
      <Route path="/createdeck" element={<FormTest />} />
    </Routes>
  );
}

export default App;
