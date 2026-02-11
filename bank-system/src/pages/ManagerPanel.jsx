import { useState, useEffect } from "react";
import API from "../api/axios";

function ManagerPanel() {
  const [section, setSection] = useState("dashboard");
  const [accounts, setAccounts] = useState([]);
  const [searchAcc, setSearchAcc] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);

  // Load All Accounts
  const loadAccounts = async () => {
    const res = await API.get("/manager/accounts");
    setAccounts(res.data);
  };

  // Load Specific Account
  const loadAccountDetails = async () => {
    const res = await API.get(`/manager/account/${searchAcc}`);
    setAccountDetails(res.data);
  };

  useEffect(() => {
    if (section === "accounts") {
      loadAccounts();
    }
  }, [section]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Manager Panel</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setSection("dashboard")}>Dashboard</button>
        <button onClick={() => setSection("accounts")}>See Accounts</button>
        <button onClick={() => setSection("manage")}>Manage Account</button>
        <button onClick={() => setSection("requests")}>Requests</button>
      </div>

      {/* 1️⃣ Dashboard */}
      {section === "dashboard" && (
        <div>
          <h3>Welcome, Bank Manager 👔</h3>
        </div>
      )}

      {/* 2️⃣ See Accounts */}
      {section === "accounts" && (
        <div>
          <h3>All Accounts</h3>

          <table border="1" cellPadding="10" width="100%">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc) => (
                <tr key={acc._id}>
                  <td>{acc.accountNumber}</td>
                  <td>{acc.name}</td>
                  <td>{acc.email}</td>
                  <td>{acc.mobile || "0"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3️⃣ Manage Account */}
      {section === "manage" && (
        <div>
          <h3>Manage Account</h3>

          <input
            placeholder="Enter Account Number"
            value={searchAcc}
            onChange={(e) => setSearchAcc(e.target.value)}
          />
          <button onClick={loadAccountDetails}>Search</button>

          {accountDetails && (
            <div style={{ marginTop: "20px" }}>
              <h4>User Details</h4>
              <p>Name: {accountDetails.user.name}</p>
              <p>Email: {accountDetails.user.email}</p>
              <p>Balance: ₹ {accountDetails.user.balance}</p>

              <h4>Transactions</h4>
              <table border="1" cellPadding="8" width="100%">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {accountDetails.transactions.map((txn) => (
                    <tr key={txn._id}>
                      <td>{txn.type}</td>
                      <td>{txn.amount}</td>
                      <td>{new Date(txn.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 4️⃣ Requests */}
      {section === "requests" && (
        <div>
          <h3>Requests Section</h3>
          <p>Coming Soon...</p>
        </div>
      )}
    </div>
  );
}

export default ManagerPanel;
