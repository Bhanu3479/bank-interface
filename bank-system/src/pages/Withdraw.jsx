import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Withdraw() {
  const [amount, setAmount] = useState("");

  const handleWithdraw = async () => {
    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      const res = await API.post("/account/withdraw", {
        amount: Number(amount),
      });

      alert(res.data.message);
      setAmount("");
    } catch (error) {
      alert(error.response?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <>
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

          <button onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>
    </>
  );
}

export default Withdraw;
