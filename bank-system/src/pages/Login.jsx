import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/bhanu-bank-logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="center">
      <div className="card">

        <img
          src={logo}
          alt="Bhanu Bank"
          style={{ width: "80px", display: "block", margin: "0 auto 20px" }}
        />

        <h2>Bhanu Bank Login</h2>

        <input
          type="email"
          placeholder="Email Address"
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
          Secure Login
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          New Customer?{" "}
          <Link to="/register" style={{ fontWeight: "bold" }}>
            Create Account
          </Link>
        </p>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          <Link to="/manager-login" style={{ color: "red", fontWeight: "bold" }}>
            Manager Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
