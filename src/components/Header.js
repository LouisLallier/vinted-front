import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const Header = ({ token, handleToken }) => {
  console.log(token);
  const [showModal, setShowModal] = useState("");

  return (
    <div className="relative">
      {showModal === "login" ? (
        <Login
          handleToken={handleToken}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : null}
      {showModal === "signup" ? (
        <SignUp
          handleToken={handleToken}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : null}
      {!token ? (
        <div className="container flex w-[1280px] items-center justify-around py-5">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>

          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-2.5 text-gray-500"
            />
            <input
              className="h-9 w-96 rounded-md bg-gray-200 pl-9"
              placeholder="Rechercher des articles"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setShowModal("login");
              }}
              className="w-32 rounded-md border border-[#2CB1BA] py-1.5 px-4 text-sm text-[#2CB1BA]"
            >
              Se Connecter
            </button>

            <button
              onClick={() => {
                setShowModal("signup");
              }}
              className="w-32 rounded-md border border-[#2CB1BA] py-1.5 px-4 text-sm text-[#2CB1BA]"
            >
              S'inscrire
            </button>
          </div>

          <button className="w-32 rounded-md border border-[#2CB1BA] bg-[#2CB1BA] py-1.5  text-sm text-sm text-white">
            Vend tes articles
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            // Cookies.remove("token-vinted");
            handleToken(null);
          }}
        >
          Se Déconnecter
        </button>
      )}
    </div>
  );
};

export default Header;
