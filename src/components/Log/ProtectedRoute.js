import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

const ProtectedRoute = ({ set }) => {
  const navigate = useNavigate();
  const goToHomeAndLog = () => {
    navigate("/");
    set("login");
  };

  const token = Cookies.get("token");

  return token ? <Outlet /> : goToHomeAndLog();
};
export default ProtectedRoute;
