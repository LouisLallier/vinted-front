import { useState } from "react";
import axios from "axios";
import CustomInput from "../components/CustomInput";

const AddOffer = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [picture, setPicture] = useState("");

  const inputs = [
    { title: "Titre", type: "text", state: title, setState: setTitle },
    {
      title: "Description",
      type: "text",
      state: description,
      setState: setDescription,
    },
    { title: "Marque", type: "text", state: brand, setState: setBrand },
    { title: "Taille", type: "text", state: size, setState: setSize },
    { title: "Couleur", type: "text", state: color, setState: setColor },
    { title: "État", type: "text", state: condition, setState: setCondition },
    { title: "Lieu", type: "text", state: city, setState: setCity },
    { title: "Prix", type: "text", state: price, setState: setPrice },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("city", city);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={(event) => {
              // console.log(event.target.files[0]);
              setPicture(event.target.files[0]);
            }}
            type="file"
            placeholder="Choisi Une image"
          />
        </div>

        {inputs.map((input) => {
          return (
            <CustomInput
              title={input.title}
              type={input.type}
              state={input.state}
              setState={input.setState}
            />
          );
        })}

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddOffer;
