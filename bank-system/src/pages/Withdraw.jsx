import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Withdraw() {
  const [amount, setAmount] = useState("");

  const handleWithdraw = async () => {
    try {
      await API.post("/account/withdraw", { amount });
      alert("Withdrawal successful");
      setAmount("");
    } catch (error) {
      alert(error.response?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="operation-container">
        <div className="operation-card">
          <h2>Withdraw Money</h2>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button>Withdraw</button>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
