import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function ManagerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/manager-auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("managerToken", res.data.token);
      localStorage.setItem("managerName", res.data.name);

      navigate("/manager-dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Manager Login</h2>

        <input
          type="email"
          placeholder="Manager Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login as Manager
        </button>
      </div>
    </div>
  );
}

export default ManagerLogin;
