import { Navigate } from "react-router-dom";

function ManagerRoute({ children }) {
  const token = localStorage.getItem("managerToken");

  if (!token) {
    return <Navigate to="/manager-login" />;
  }

  return children;
}

export default ManagerRoute;
