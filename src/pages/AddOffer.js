import { useState } from "react";
import axios from "axios";

const AddOffer = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [picture, setPicture] = useState("");

  return (
    <div>
      <form
        onSubmit={async (event) => {
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
        }}
      >
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
        <div>
          <label htmlFor="title">Titre</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="ex: Chemise Zara bleue"
          />
          <label htmlFor="description">Décris ton article</label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="ex: décris comme tu peux ton article"
          />
        </div>
        <div>
          <label htmlFor="brand">Marque</label>
          <input
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            type="text"
            placeholder="ex: Zara"
          />
          <label htmlFor="size">Taille</label>
          <input
            onChange={(e) => setSize(e.target.value)}
            value={size}
            type="text"
            placeholder="ex: L / 42 / 12"
          />
          <label htmlFor="color">Couleur</label>
          <input
            onChange={(e) => setColor(e.target.value)}
            value={color}
            type="text"
            placeholder="ex: Cyan"
          />
          <label htmlFor="condition">État</label>
          <input
            onChange={(e) => setCondition(e.target.value)}
            value={condition}
            type="text"
            placeholder="ex: Neuf / Occasion"
          />
          <label htmlFor="city">Lieu</label>
          <input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            type="text"
            placeholder="ex: Paris"
          />
        </div>
        <div>
          <label htmlFor="">Prix</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="0.00 €"
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddOffer;
