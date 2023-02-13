import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useState } from "react";
import Cookies from "js-cookie";
import AddOffer from "./pages/AddOffer";

import ProtectedRoute from "./components/Log/ProtectedRoute";
import NotFound404 from "./pages/NotFound404";

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [showModal, setShowModal] = useState("");
  const [search, setSearch] = useState("");

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 2 });
      setShowModal("");
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Header
        token={token}
        showModal={showModal}
        search={search}
        handleToken={handleToken}
        setShowModal={setShowModal}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" exact element={<Home search={search} />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route
          path="/login"
          setShowmodal={() => {
            setShowModal("");
          }}
          element={<Login handleToken={handleToken} />}
        />
        <Route path="/offer/:id" element={<Offer />} />

        <Route element={<ProtectedRoute token={token} set={setShowModal} />}>
          <Route path="/addOffer" element={<AddOffer token={token} />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
};

export default App;
