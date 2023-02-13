import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ token, setShowModal }) => {
  const navigate = useNavigate();

  const goToHomeAndLog = () => {
    navigate("/");
    setShowModal("login");
  };

  return token ? <Outlet /> : goToHomeAndLog();
};
export default ProtectedRoute;
