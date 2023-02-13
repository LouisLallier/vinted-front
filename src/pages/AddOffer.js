import { Navigate, redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddOffer = ({ token, setShowModal }) => {
  const navigate = useNavigate();

  return token ? (
    <div>
      <div>Box image</div>
      <div>
        <input type="text" />
        <input type="text" />
      </div>
      <div>
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </div>
      <div>
        <input type="text" />
        <input type="text" />
      </div>
    </div>
  ) : (
    navigate("/")
  );
};

export default AddOffer;
