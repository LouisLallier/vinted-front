import { Navigate, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "../../pages/Home";
import header from "../Header";
import Header from "../Header";
import App from "../../App";

const ProtectedRoute = ({ path, children }) => {
  const token = Cookies.get("token");
  if (token) {
    return <Navigate to={path} replace />;
  }

  return children ? children : <Home />;
};
export default ProtectedRoute;
