import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import Lose from "./pages/Lose";
import Win from "./pages/Win";
import HighScore from "./pages/HighScore";
import LandingPage from "./pages/LandingPage";
import DeckList from "./pages/DeckList";
import DeckDetails from "./pages/DeckDetails";
import FormTest from "./pages/FormTest";
import PrivateRoute from "./components/PrivateRoute";
import UpdateDeckForm from "./pages/UpdateDeckForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/decklist/:userId"
        element={
          <PrivateRoute>
            <DeckList />
          </PrivateRoute>
        }
      />
      <Route
        path="/deckdetails/:deckId"
        element={
          <PrivateRoute>
            <DeckDetails />
          </PrivateRoute>
        }
      />
      <Route path="/game/:userId" element={<Game />} />
      <Route path="/lose" element={<Lose />} />
      <Route path="/win" element={<Win />} />
      <Route
        path="/highscore"
        element={
          <PrivateRoute>
            <HighScore />
          </PrivateRoute>
        }
      />
      <Route
        path="/createdeck"
        element={
          <PrivateRoute>
            <FormTest />
          </PrivateRoute>
        }
      />
      <Route
        path="/updatedeck/:deckId"
        element={
          <PrivateRoute>
            <UpdateDeckForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
