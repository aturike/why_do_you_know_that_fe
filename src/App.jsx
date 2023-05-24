import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import LandingPage from "./pages/LandingPage";
import DeckList from "./pages/DeckList";
import DeckDetails from "./pages/DeckDetails";
import FormTest from "./pages/FormTest";
import PrivateRoute from "./components/PrivateRoute";
import UpdateDeckForm from "./pages/UpdateDeckForm";
import NavBar from "./components/Navbar";

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
            <NavBar />
            <Game />
          </div>
        }
      />
      <Route
        path="/game/:userId"
        element={
          <div>
            <NavBar />
            <Game />
          </div>
        }
      />
      <Route
        path="/createdeck"
        element={
          <PrivateRoute>
            <NavBar />
            <FormTest />
          </PrivateRoute>
        }
      />
      <Route
        path="/updatedeck/:deckId"
        element={
          <PrivateRoute>
            <NavBar />
            <UpdateDeckForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
