import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpForm(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "https://why-do-i-know-that.adaptable.app/auth/signup",
      { email, username, password }
    );
    console.log(response);

    if (response.status === 201) {
      if (props.setsignupShow) {
        props.setsignupShow.toggle();
        props.setLoginShow.toggle();
        props.setisSignedup(true);
      } else {
        navigate("/login");
      }
    }
  };
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

  const isError = {
    email: false,
    username: false,
    password: passwordRegex.test(password),
    password2: passwordRepeat.length > 4 && password !== passwordRepeat,
  };

  return (
    <div className="signup-form">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={isError}>
          <FormLabel>
            Email address:{" "}
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormLabel>

          {!isError.email ? (
            <FormHelperText style={{ color: "white" }}>
              Enter the email you'd like to receive the newsletter on.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
          <FormLabel>
            Username:
            <input
              type="text"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormLabel>
          {!isError.username ? (
            <FormHelperText style={{ color: "white" }}>
              Enter the username we will make fun of
            </FormHelperText>
          ) : (
            <FormErrorMessage>Username is required.</FormErrorMessage>
          )}

          <FormLabel>
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormLabel>
          {isError.password ? (
            <FormHelperText style={{ color: "lightgreen" }}>
              Sufficient password
            </FormHelperText>
          ) : (
            <FormErrorMessage>
              Password needs to have at least 6 characters, 1 Capital and 1
              special character
            </FormErrorMessage>
          )}

          <FormLabel>
            Repeat Password:
            <input
              type="password"
              required
              value={passwordRepeat}
              onChange={(event) => setPasswordRepeat(event.target.value)}
            />
          </FormLabel>
          {!isError.password2 ? (
            <FormHelperText style={{ color: "lightgreen" }}></FormHelperText>
          ) : (
            <FormErrorMessage>Passwords are not matching</FormErrorMessage>
          )}
        </FormControl>
        <button className="signup-btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
