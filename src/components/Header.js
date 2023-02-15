import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

const Header = ({
  token,
  handleTokenAndId,
  showModal,
  setShowModal,
  search,
  setSearch,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {showModal === "login" ? (
        <Login
          handleTokenAndId={handleTokenAndId}
          setShowModal={setShowModal}
        />
      ) : null}
      {showModal === "signup" ? (
        <SignUp
          handleTokenAndId={handleTokenAndId}
          setShowModal={setShowModal}
        />
      ) : null}
      <div className="container flex w-[1280px] items-center justify-around py-5">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-2.5 text-gray-500"
            />
            <input
              value={search}
              className="h-9 w-96 rounded-md bg-gray-200 pl-9"
              type="text"
              placeholder="Rechercher des articles"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>

        {!token ? (
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
        ) : (
          <button
            className="w-36 rounded-md border border-[#C3185A] bg-[#C3185A] py-1.5 px-3 text-sm text-white hover:bg-white hover:text-[#C3185A]"
            onClick={() => {
              // Cookies.remove("token-vinted");
              handleTokenAndId(null, null);
              navigate("/");
            }}
          >
            Se Déconnecter
          </button>
        )}
        <Link to="/addOffer">
          <button className="w-32 rounded-md border border-[#2CB1BA] bg-[#2CB1BA] py-1.5  text-sm text-sm text-white">
            Vend tes articles
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
