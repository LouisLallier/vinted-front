import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container flex w-[1280px] items-center justify-around py-5">
      <img src={logo} alt="" />

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
        <button className="w-32 rounded-md border border-[#2CB1BA] py-1.5 px-4 text-sm text-[#2CB1BA]">
          Se Connecter
        </button>
        <Link to="/signup">
          <button className="w-32 rounded-md border border-[#2CB1BA] py-1.5 px-4 text-sm text-[#2CB1BA]">
            S'inscrire
          </button>
        </Link>
      </div>

      <button className="w-32 rounded-md border border-[#2CB1BA] bg-[#2CB1BA] py-1.5  text-sm text-sm text-white">
        Vend tes articles
      </button>
    </div>
  );
};

export default Header;
