import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

function LoginForm(props) {
  const navigate = useNavigate();
  const { setToken } = useContext(SessionContext);
  const [isInvalidLogin, setIsinvalidLogin] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://why-do-i-know-that.adaptable.app/auth/login",
        { username, password }
      );

      if (response.status === 200) {
        setToken(response.data);
        if (!props.gameUserName) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signup-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={true}>
          <FormLabel>
            Username
            <input
              type="text"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormLabel>
          {isInvalidLogin === "incorrect username" && (
            <FormErrorMessage>Username incorrect</FormErrorMessage>
          )}
          <FormLabel>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormLabel>
          {isInvalidLogin === "incorrect password" && (
            <FormErrorMessage>Incorrect password</FormErrorMessage>
          )}
        </FormControl>
        <button className="signup-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
