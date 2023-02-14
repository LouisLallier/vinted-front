import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Offer = () => {
  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e.response);
      }
    };
    fetchData();
  }, [id]);
  console.log(offer);

  return isLoading ? (
    <span>Loading</span>
  ) : (
    <div>
      <img src={offer.product_image.secure_url} alt="product" />
      <p>{offer.product_price} €</p>
      {/* Je parcours product_details */}
      {offer.product_details.map((detail, index) => {
        // Je récupère le nomde la clef de detail
        const key = Object.keys(detail)[0];
        // console.log(key);
        // console.log(detail[key]);
        return (
          <div key={index}>
            {/* J'affiche le nom dela clef  */}
            <span>{key} : </span>
            {/* et son contenu */}
            <span>{detail[key]}</span>
          </div>
        );
      })}
      <p>{offer.product_name}</p>
      <p>{offer.product_description}</p>
      <p>{offer.owner.account.username}</p>
      <Link
        to="/payment"
        state={{
          title: offer.product_name,
          price: offer.product_price,
          picture: offer.product_image.secure_url,
        }}
      >
        <button>BUY IT NOW !</button>
      </Link>
    </div>
  );
};
export default Offer;
