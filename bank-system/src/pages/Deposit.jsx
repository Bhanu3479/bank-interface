import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Deposit() {
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    try {
      if (!amount || amount <= 0) {
        return alert("Please enter a valid amount");
      }

      const res = await API.post("/account/deposit", {
        amount: Number(amount),
      });

      alert(res.data.message);
      setAmount("");

    } catch (error) {
      alert(error.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="operation-container">
        <div className="operation-card">

          <h2>Deposit Amount</h2>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button onClick={handleDeposit}>
            Request Deposit
          </button>

        </div>
      </div>
    </>
  );
}

export default Deposit;
