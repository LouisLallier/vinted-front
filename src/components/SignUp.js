import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({ handleToken, showModal, setShowModal }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/user/signup`,
        {
          email,
          username,
          password,
          newsLetter,
        }
      );
      const token = res.data.token;
      if (token) {
        handleToken(token);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      if (e.response.data.message === "This email already has an account") {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez créer un compte avec un mail valide."
        );
      }
      //   Si je reçois un message d'erreur "Missing parameters"
      if (e.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs svp.");
      }
    }
  };

  return (
    <div className="absolute top-0 left-0 z-10">
      <button
        onClick={() => {
          setShowModal("");
        }}
      >
        Fermer
      </button>
      <form
        className="mb-4 rounded bg-red-100 px-8 pt-6 pb-8 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center pb-3">Créer votre compte</div>
        <div className="p-3">
          <label className="pr-2" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your Email"
          />
        </div>
        <label className="pr-2" htmlFor="username">
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />

        <div className="p-2">
          <label htmlFor="pass">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*********"
          />
        </div>
        <div className="p-2">
          <label htmlFor="pass">Newsletters</label>
          <input
            checked={newsLetter}
            onChange={(e) => setNewsLetter(!newsLetter)}
            type="checkbox"
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button className="rounded bg-amber-100 p-2" type="submit">
          S'inscrire !
        </button>
        <Link to="/login">Tu as déjà un compte, connecte-toi !</Link>
      </form>
    </div>
  );
};

export default SignUp;
