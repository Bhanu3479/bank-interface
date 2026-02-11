import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await API.get("/account/balance");
      setBalance(res.data.balance);
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="center">
        <div className="card">
          <h2>Welcome {user?.user?.name}</h2>
          <p><strong>Account No:</strong> {user?.user?.accountNumber}</p>
          <h3>Balance: ₹ {balance}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
