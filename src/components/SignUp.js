import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

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
      console.log(res.data.token);
      const token = res.data.token;
      Cookies.set("token", token, { expires: 2 });
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
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
            value={newsLetter}
            onChange={(e) => setNewsLetter(e.target.checked)}
            type="checkbox"
          />
        </div>

        <button className="rounded bg-amber-100 p-2" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignUp;
