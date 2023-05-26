import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckIcon } from "@chakra-ui/icons";
import "../login-signup.css";

function SignUpForm(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidSignup, setIsinvalidSignup] = useState(false);

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
      try {
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
      } catch (error) {
        if (error.response.status === 409) {
          setIsinvalidSignup(true);
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
      <Text
        fontSize={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        className="signup-form-text"
      >
        Sign up
      </Text>
      {trueCount > 0 && <h1>Fill out the form before submitting</h1>}
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={isError}>
          <FormLabel fontSize={{ base: "1.2rem", lg: "1.5rem" }}>
            Email address
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
            <FormHelperText
              style={{ color: "white" }}
              fontSize={{ base: "0.8rem", md: "1rem" }}
              textAlign={"center"}
            >
              Enter the email you'd like to receive the newsletter on.
            </FormHelperText>
          )}

          <FormLabel fontSize={{ base: "1.2rem", lg: "1.5rem" }}>
            Username
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
            <FormHelperText
              style={{ color: "white" }}
              fontSize={{ base: "0.8rem", md: "1rem" }}
              textAlign={"center"}
            >
              Enter the username we will make fun of
            </FormHelperText>
          )}
          {isInvalidSignup && (
            <FormErrorMessage
              fontSize={{ base: "0.8rem", md: "1rem" }}
              textAlign={"center"}
            >
              Username already exisist
            </FormErrorMessage>
          )}
          <FormLabel fontSize={{ base: "1.2rem", lg: "1.5rem" }}>
            Password
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
            <div className="password-ctr">
              {!minLengthRegex.test(password) ? (
                <FormErrorMessage
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  textAlign={"center"}
                >
                  Password has to be at least 6 characters long
                </FormErrorMessage>
              ) : (
                <FormHelperText
                  style={{ color: "lightgreen" }}
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  textAlign={"center"}
                >
                  <CheckIcon /> Password has to be at least 6 characters long
                </FormHelperText>
              )}
              {!specialCharRegex.test(password) ? (
                <FormErrorMessage
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  textAlign={"center"}
                >
                  Password has to contain at least one special character
                </FormErrorMessage>
              ) : (
                <FormHelperText
                  style={{ color: "lightgreen" }}
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  textAlign={"center"}
                >
                  <CheckIcon /> Password has to contain at least one special
                  character
                </FormHelperText>
              )}
              {!uppercaseRegex.test(password) ? (
                <FormErrorMessage
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  textAlign={"center"}
                >
                  Password has to contain at least one capital letter
                </FormErrorMessage>
              ) : (
                <FormHelperText
                  style={{ color: "lightgreen" }}
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  textAlign={"center"}
                >
                  <CheckIcon /> Password has to contain at least one capital
                  letter
                </FormHelperText>
              )}
            </div>
          )}

          <FormLabel fontSize={{ base: "1.2rem", lg: "1.5rem" }}>
            Repeat Password
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
            <Flex justify={"center"}>
              {!isError.passwordRepeat ? (
                <FormHelperText
                  style={{ color: "lightgreen" }}
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  textAlign={"center"}
                >
                  <CheckIcon /> Passwords are matching
                </FormHelperText>
              ) : (
                <FormErrorMessage
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  textAlign={"center"}
                >
                  Passwords are not matching
                </FormErrorMessage>
              )}
            </Flex>
          )}
        </FormControl>
        <button className="signup-btn" type="submit">
          <Box
            padding={{ base: "5px", md: "8px" }}
            fontSize={{ base: "1rem", lg: "1.5rem" }}
          >
            Sign up
          </Box>
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
