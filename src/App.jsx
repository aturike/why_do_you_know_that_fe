import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import LandingPage from "./pages/LandingPage";
import DeckList from "./pages/DeckList";
import DeckDetails from "./pages/DeckDetails";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/Navbar";
import IntroPage from "./pages/IntroPage";
import DeckInput from "./pages/DeckInput";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <NavBar />
            <LandingPage />
          </div>
        }
      />
      <Route
        path="/signup"
        element={
          <div>
            <NavBar />
            <SignupPage />
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <div>
            <NavBar />
            <LoginPage />
          </div>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <NavBar />
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/decklist/:userId"
        element={
          <PrivateRoute>
            <NavBar />
            <DeckList />
          </PrivateRoute>
        }
      />
      <Route
        path="/deckdetails/:deckId"
        element={
          <PrivateRoute>
            <NavBar />
            <DeckDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/game"
        element={
          <div>
            <Game />
          </div>
        }
      />
      <Route
        path="/intro-game"
        element={
          <div>
            <NavBar />
            <IntroPage />
          </div>
        }
      />

      <Route
        path="/game/:userId"
        element={
          <div>
            <Game />
          </div>
        }
      />
      <Route
        path="/createdeck"
        element={
          <PrivateRoute>
            <NavBar />
            <DeckInput create={true} />
          </PrivateRoute>
        }
      />
      <Route
        path="/updatedeck/:deckId"
        element={
          <PrivateRoute>
            <NavBar />
            <DeckInput create={false} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
