import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Transfer() {
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    try {
      await API.post("/account/transfer", {
        receiverAccountNumber,
        amount,
      });

      alert("Transfer successful");
      setReceiverAccountNumber("");
      setAmount("");
    } catch (error) {
      alert(error.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="operation-container">
        <div className="operation-card">
          <h2>Transfer Money</h2>

          <input
            type="text"
            placeholder="Receiver Account Number"
            value={receiverAccountNumber}
            onChange={(e) => setReceiverAccountNumber(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button onClick={handleTransfer}>Transfer</button>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
