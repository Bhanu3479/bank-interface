import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/bhanu-bank-logo.png";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>

      {/* Logo + Bank Name */}
      <div style={styles.logoContainer}>
        <img
          src={logo}
          alt="Bhanu Bank"
          style={styles.logoImage}
        />
        <h2 style={styles.logoText}>Bhanu Bank</h2>
      </div>

      {user && (
        <div style={styles.links}>
          <Link style={styles.link} to="/dashboard">Dashboard</Link>
          <Link style={styles.link} to="/deposit">Deposit</Link>
          <Link style={styles.link} to="/withdraw">Withdraw</Link>
          <Link style={styles.link} to="/transfer">Transfer</Link>
          <Link style={styles.link} to="/transactions">Mini Statement</Link>

          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#0f172a",
    color: "white",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logoImage: {
    width: "45px",
    height: "45px",
  },

  logoText: {
    margin: 0,
    fontWeight: "600",
    letterSpacing: "1px",
  },

  links: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },

  logoutBtn: {
    padding: "8px 14px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navbar;
