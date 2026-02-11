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
        console.error("Error fetching transactions");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="operation-container">
        <div className="operation-card" style={{ width: "900px" }}>
          <h2>Mini Statement</h2>

          <table className="styled-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>CR/DR</th>
                <th>Amount</th>
                <th>Balance After</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id}>
                  <td>{txn.type}</td>
                  <td>
                    {txn.type === "withdraw" || txn.type === "transfer"
                      ? "DR"
                      : "CR"}
                  </td>
                  <td>₹ {txn.amount}</td>
                  <td>₹ {txn.balanceAfter || 0}</td>
                  <td>
                    {new Date(txn.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TransactionHistory;
