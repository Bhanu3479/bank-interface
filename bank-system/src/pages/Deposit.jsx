import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Deposit() {
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    try {
      await API.post("/account/deposit", { amount });
      const handleDeposit = async () => {
      try {
        const res = await API.post("/account/deposit", {
        amount,
      });

    alert(res.data.message);  // <- shows correct backend message
    setAmount("");

  } catch (error) {
    alert(error.response?.data?.message || "Deposit failed");
  }
};

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
