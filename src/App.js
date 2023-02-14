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
import Payment from "./components/Payment";

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState("");
  const [search, setSearch] = useState("");

  const handleToken = (token, id) => {
    if (token) {
      setToken(token);
      setUserId(id);
      Cookies.set("token", token, { expires: 2 });
      setShowModal("");
    } else {
      setToken(null);
      setUserId("");
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
          element={<Login userId={userId} handleToken={handleToken} />}
        />
        <Route path="/offer/:id" element={<Offer />} />

        <Route
          element={<ProtectedRoute token={token} setShowModal={setShowModal} />}
        >
          <Route path="/addOffer" element={<AddOffer token={token} />} />
        </Route>
        <Route path="/payment" element={<Payment userId={userId} />} />
        {/*<Route path="/payment" element={<Payment userId={userId} />} />*/}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
};

export default App;
