import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ token, set }) => {
  const navigate = useNavigate();

  const goToHomeAndLog = () => {
    navigate("/");
    set("login");
  };

  return token ? <Outlet /> : goToHomeAndLog();
};
export default ProtectedRoute;
