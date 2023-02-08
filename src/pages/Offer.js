import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <div className="">
      <div></div>
      <div></div>
    </div>
  );
};
export default Offer;
