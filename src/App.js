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
import CheckOutForm from "./components/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [userId, setUserId] = useState("");
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

  console.log(userId);

  return (
    <Router>
      <Header
        token={token}
        showModal={showModal}
        search={search}
        handleToken={handleToken}
        setShowModal={setShowModal}
        setSearch={setSearch}
        setUserId={setUserId}
      />
      <Routes>
        <Route path="/" exact element={<Home search={search} />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route
          path="/login"
          setShowmodal={() => {
            setShowModal("");
          }}
          element={
            <Login
              userId={userId}
              setUserId={setUserId}
              handleToken={handleToken}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />

        <Route
          element={<ProtectedRoute token={token} setShowModal={setShowModal} />}
        >
          <Route path="/addOffer" element={<AddOffer token={token} />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <CheckOutForm />
              </Elements>
            }
          />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
};

export default App;
