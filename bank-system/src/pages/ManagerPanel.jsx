import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function ManagerPanel() {
  const [section, setSection] = useState("dashboard");
  const [accounts, setAccounts] = useState([]);
  const [searchAcc, setSearchAcc] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("managerToken");
    localStorage.removeItem("managerName");
    navigate("/manager-login");
  };

  // ================================
  // Load All Accounts
  // ================================
  const loadAccounts = async () => {
    try {
      const res = await API.get("/manager/accounts");
      setAccounts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================================
  // Load Account Details
  // ================================
  const loadAccountDetails = async () => {
    try {
      const res = await API.get(`/manager/account/${searchAcc}`);
      setAccountDetails(res.data);
    } catch (error) {
      alert("Account not found");
    }
  };

  // ================================
  // Load Deposit Requests
  // ================================
  const loadRequests = async () => {
    try {
      const res = await API.get("/manager/requests");
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================================
  // Approve Deposit
  // ================================
  const approveRequest = async (id) => {
    await API.post(`/manager/approve/${id}`);
    loadRequests();
  };

  // ================================
  // Decline Deposit
  // ================================
  const declineRequest = async (id) => {
    await API.post(`/manager/decline/${id}`);
    loadRequests();
  };

  useEffect(() => {
    if (section === "accounts") loadAccounts();
    if (section === "requests") loadRequests();
  }, [section]);

  return (
    <>
      <Navbar />

      <div className="operation-container">
        <div className="operation-card" style={{ width: "950px" }}>

          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <h2>Manager Dashboard 👔</h2>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#ef4444",
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </div>

          {/* Navigation */}
          <div style={{ marginBottom: "25px" }}>
            <button onClick={() => setSection("dashboard")}>Dashboard</button>
            <button onClick={() => setSection("accounts")} style={{ marginLeft: "10px" }}>See Accounts</button>
            <button onClick={() => setSection("manage")} style={{ marginLeft: "10px" }}>Manage Account</button>
            <button onClick={() => setSection("requests")} style={{ marginLeft: "10px" }}>Requests</button>
          </div>

          {/* ================= Dashboard ================= */}
          {section === "dashboard" && (
            <div>
              <h3>Welcome, Manager</h3>
              <p>Approve deposits and manage accounts securely.</p>
            </div>
          )}

          {/* ================= See Accounts ================= */}
          {section === "accounts" && (
            <div>
              <h3>All Accounts</h3>

              <table className="styled-table">
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

          {/* ================= Manage Account ================= */}
          {section === "manage" && (
            <div>
              <h3>Manage Account</h3>

              <input
                placeholder="Enter Account Number"
                value={searchAcc}
                onChange={(e) => setSearchAcc(e.target.value)}
              />
              <button onClick={loadAccountDetails} style={{ marginLeft: "10px" }}>
                Search
              </button>

              {accountDetails && (
                <div style={{ marginTop: "20px" }}>
                  <h4>User Details</h4>
                  <p>Name: {accountDetails.user.name}</p>
                  <p>Email: {accountDetails.user.email}</p>
                  <p>Balance: ₹ {accountDetails.user.balance}</p>

                  <h4 style={{ marginTop: "15px" }}>Transactions</h4>

                  <table className="styled-table">
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

          {/* ================= Requests ================= */}
          {section === "requests" && (
            <div>
              <h3>Deposit Requests</h3>

              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Account No</th>
                    <th>Account Holder</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.accountNumber}</td>
                      <td>{req.name}</td>
                      <td>₹ {req.amount}</td>
                      <td>
                        <button onClick={() => approveRequest(req._id)}>
                          Issue
                        </button>
                        <button
                          style={{
                            marginLeft: "8px",
                            backgroundColor: "#ef4444",
                            color: "white"
                          }}
                          onClick={() => declineRequest(req._id)}
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {requests.length === 0 && <p>No pending requests</p>}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default ManagerPanel;
