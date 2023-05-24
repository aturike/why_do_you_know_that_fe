import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckIcon } from "@chakra-ui/icons";

function SignUpForm(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showInstructions, setshowInstructions] = useState({
    email: false,
    username: false,
    password: false,
    passwordRepeat: false,
  });
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const navigate = useNavigate();

  let trueCount = 0;
  const handleSubmit = async (event) => {
    event.preventDefault();

    for (const key in isError) {
      if (isError[key]) {
        trueCount += 1;
      }
    }

    if (trueCount === 0) {
      const response = await axios.post(
        "https://why-do-i-know-that.adaptable.app/auth/signup",
        { email, username, password }
      );

      if (response.status === 201) {
        if (props.setsignupShow) {
          props.setsignupShow.toggle();
          props.setLoginShow.toggle();
          props.setisSignedup(true);
        } else {
          navigate("/login");
        }
      }
    }
  };

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
  const minLengthRegex = /.{6,}/;
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  const passwordRepeatRegex = new RegExp(`^${password}$`);

  const isError = {
    email: email.length === 0,
    username: username.length === 0,
    password: !passwordRegex.test(password),
    passwordRepeat: !passwordRepeatRegex.test(passwordRepeat),
  };

  const handleFocus = (event) => {
    setshowInstructions({ ...showInstructions, [event.target.name]: true });
  };

  return (
    <div className="signup-form">
      <h1>Sign up</h1>
      {trueCount > 0 && <h1>Fill out the form before submitting</h1>}
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={isError}>
          <FormLabel>
            Email address:
            <input
              type="email"
              required
              value={email}
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              onFocus={handleFocus}
            />
          </FormLabel>

          {showInstructions.email && (
            <FormHelperText style={{ color: "white" }}>
              Enter the email you'd like to receive the newsletter on.
            </FormHelperText>
          )}

          <FormLabel>
            Username:
            <input
              type="text"
              required
              value={username}
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              onFocus={handleFocus}
            />
          </FormLabel>
          {showInstructions.username && (
            <FormHelperText style={{ color: "white" }}>
              Enter the username we will make fun of
            </FormHelperText>
          )}
          <FormLabel>
            Password:
            <input
              type="password"
              required
              value={password}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              onFocus={handleFocus}
            />
          </FormLabel>
          {showInstructions.password && (
            <div>
              {!minLengthRegex.test(password) ? (
                <FormErrorMessage>
                  Password has to be at least 6 characters long
                </FormErrorMessage>
              ) : (
                <FormHelperText style={{ color: "lightgreen" }}>
                  <CheckIcon /> Password has to be at least 6 characters long
                </FormHelperText>
              )}
              {!specialCharRegex.test(password) ? (
                <FormErrorMessage>
                  Password has to contain at least one special character
                </FormErrorMessage>
              ) : (
                <FormHelperText style={{ color: "lightgreen" }}>
                  <CheckIcon /> Password has to contain at least one special
                  character
                </FormHelperText>
              )}
              {!uppercaseRegex.test(password) ? (
                <FormErrorMessage>
                  Password has to contain at least one capital letter
                </FormErrorMessage>
              ) : (
                <FormHelperText style={{ color: "lightgreen" }}>
                  <CheckIcon /> Password has to contain at least one capital
                  letter
                </FormHelperText>
              )}
            </div>
          )}

          <FormLabel>
            Repeat Password:
            <input
              type="password"
              required
              value={passwordRepeat}
              name="passwordRepeat"
              onChange={(event) => setPasswordRepeat(event.target.value)}
              onFocus={handleFocus}
            />
          </FormLabel>
          {showInstructions.passwordRepeat && (
            <div>
              {!isError.passwordRepeat ? (
                <FormHelperText style={{ color: "lightgreen" }}>
                  <CheckIcon /> Passwords are matching
                </FormHelperText>
              ) : (
                <FormErrorMessage>Passwords are not matching</FormErrorMessage>
              )}
            </div>
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
