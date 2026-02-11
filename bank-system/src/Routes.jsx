import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import TransactionHistory from "./pages/TransactionHistory";
import ManagerPanel from "./pages/ManagerPanel";
import ManagerLogin from "./pages/ManagerLogin";

import PrivateRoute from "./components/PrivateRoute";
import ManagerRoute from "./components/ManagerRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/manager-login" element={<ManagerLogin />} />

      {/* Manager Protected Route */}
      <Route
        path="/manager-dashboard"
        element={
          <ManagerRoute>
            <ManagerPanel />
          </ManagerRoute>
        }
      />

      {/* User Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/deposit"
        element={
          <PrivateRoute>
            <Deposit />
          </PrivateRoute>
        }
      />

      <Route
        path="/withdraw"
        element={
          <PrivateRoute>
            <Withdraw />
          </PrivateRoute>
        }
      />

      <Route
        path="/transfer"
        element={
          <PrivateRoute>
            <Transfer />
          </PrivateRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <TransactionHistory />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;
