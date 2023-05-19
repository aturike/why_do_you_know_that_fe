import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate()
  const {setToken} = useContext(SessionContext);

  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5005/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
    })
    if(response.status ==200){
      const tokenFromResponse = await response.json()
      setToken(tokenFromResponse)
      navigate('/token')
    }
  }

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
        <button type='submit'>Login</button>
      </form>
  </div>
  );
}

export default LoginPage;
