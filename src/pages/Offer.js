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
    <span className="bg-[#EBEDEE]">Loading</span>
  ) : (
    <div className="flex h-screen justify-center gap-28 bg-[#EBEDEE] pt-16">
      <img
        className="h-[600px] w-[450px] rounded-md"
        src={offer.product_image.secure_url}
        alt="product"
      />
      <div className="h-[600px] w-[400px] rounded-md bg-white p-9">
        <p className="py-4">{offer.product_price} €</p>
        {offer.product_details.map((detail, index) => {
          const key = Object.keys(detail)[0];
          return (
            <div className="flex" key={index}>
              <div className="w-36 text-gray-400">{key} : </div>
              <div className="">{detail[key]}</div>
            </div>
          );
        })}
        <p className="py-20">{offer.product_name}</p>
        <p>{offer.product_description}</p>
        <p className="py-6">{offer.owner.account.username}</p>
        <Link
          to="/payment"
          state={{
            title: offer.product_name,
            price: offer.product_price,
            picture: offer.product_image.secure_url,
          }}
        >
          <button className="rounded-md border border-[#2cb1ba] bg-[#2cb1ba] p-4 text-white hover:bg-white hover:text-[#2cb1ba]">
            BUY IT NOW !
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Offer;
