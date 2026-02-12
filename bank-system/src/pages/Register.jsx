import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
  try {
    const res = await API.post("/auth/register", formData);

    alert(
      `Account Created Successfully!\nYour Account Number: ${res.data.accountNumber}`
    );

    navigate("/");

  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};


  return (
    <>
      <Navbar />

      <div className="operation-container">
        <div className="operation-card">
          <h2>Create New Account</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />

          <button onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
