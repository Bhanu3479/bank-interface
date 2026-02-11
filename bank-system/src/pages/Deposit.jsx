import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Deposit() {
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    try {
      await API.post("/account/deposit", { amount });
      alert("Deposit successful");
      setAmount("");
    } catch (error) {
      alert(error.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="operation-container">
        <div className="operation-card">
          <h2>Deposit Money</h2>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button onClick={handleDeposit}>Deposit</button>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
