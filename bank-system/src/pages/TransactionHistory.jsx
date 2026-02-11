import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await API.get("/transactions");
        setTransactions(res.data);
      } catch (error) {
        console.log("Error fetching transactions");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="table-container">
        <h2>Mini Statement</h2>

        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Account</th>
              <th>Type</th>
              <th>CR/DR</th>
              <th>Amount</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.account}</td>
                <td>{txn.type}</td>
                <td>{txn.crdr}</td>
                <td>₹ {txn.amount}</td>
                <td>{new Date(txn.datetime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && <p>No transactions found</p>}
      </div>
    </div>
  );
}

export default TransactionHistory;
