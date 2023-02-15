import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ handleTokenAndId, setShowModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          email,
          password,
        }
      );

      const userId = res.data._id;
      const token = res.data.token;

      if (token) {
        handleTokenAndId(token, userId);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="absolute top-48 left-0 z-10 flex justify-center ">
      <div className="w-full max-w-xs">
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
