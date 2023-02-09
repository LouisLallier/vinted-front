import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/user/login`,
        {
          email,
          password,
        }
      );
      const token = res.data.token;
      Cookies.set("token", token, { expires: 2 });
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex justify-center pt-48">
      <div className="w-full max-w-xs">
        <form
          className="mb-4 rounded bg-red-100 px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center pb-3">Log In</div>
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
          <div className="p-2">
            <label htmlFor="pass">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="*********"
            />
          </div>

          <button className="rounded bg-amber-100 p-2" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
