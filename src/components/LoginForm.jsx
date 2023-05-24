import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";

function LoginForm(props) {
  const navigate = useNavigate();
  const { setToken } = useContext(SessionContext);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "https://why-do-i-know-that.adaptable.app/auth/login",
      { username, password }
    );

    if (response.status === 200) {
      setToken(response.data);
      if (!props.gameUserName) {
        navigate("/");
      }
    } else if (response.status === 401) {
      console.log("response.status");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
